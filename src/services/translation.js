import { getDemoDocument } from '../data/demoDocuments'
import { detectLanguage } from '../utils/document'

/**
 * Translation service abstraction.
 * 1) Demo documents use curated translations (labelled demo).
 * 2) Optional /api/translate if a backend key is configured.
 * 3) Optional public MyMemory request (no secret key).
 * 4) Otherwise return a clear failure for the UI to handle.
 */

const MEMORY = new Map()

function memoryKey(text, target) {
  return `${target}::${text}`
}

export async function translateText(text, targetLang, { demoId } = {}) {
  const target = targetLang === 'bn' ? 'bn' : 'en'
  const sourceLang = detectLanguage(text)

  if (demoId) {
    const sample = getDemoDocument(demoId)
    if (sample) {
      if (target === 'bn') {
        return { ok: true, text: sample.translationBn, source: 'demo-sample' }
      }
      return { ok: true, text: sample.extractedText, source: 'demo-sample' }
    }
  }

  if (sourceLang === target) {
    return { ok: true, text, source: 'passthrough' }
  }

  const cached = MEMORY.get(memoryKey(text, target))
  if (cached) return cached

  try {
    const backend = await fetch('/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, target }),
      signal: AbortSignal.timeout(2500),
    })
    if (backend.ok) {
      const data = await backend.json()
      if (data?.text) {
        const result = { ok: true, text: data.text, source: 'api' }
        MEMORY.set(memoryKey(text, target), result)
        return result
      }
    }
  } catch {
    /* backend optional */
  }

  try {
    const langpair = sourceLang === 'bn' ? 'bn|en' : 'en|bn'
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.slice(0, 450))}&langpair=${langpair}`
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) })
    if (response.ok) {
      const data = await response.json()
      const translated = data?.responseData?.translatedText
      if (translated && !/invalid/i.test(translated)) {
        const result = { ok: true, text: translated, source: 'mymemory' }
        MEMORY.set(memoryKey(text, target), result)
        return result
      }
    }
  } catch {
    /* network optional */
  }

  return { ok: false, error: 'translation-unavailable' }
}
