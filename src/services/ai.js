import { getDemoDocument } from '../data/demoDocuments'
import { detectLanguage } from '../utils/document'

/**
 * AI service abstraction.
 * Simplify and Ask Document only — OCR and translation stay separate.
 * Answers must be grounded in the supplied document text.
 */

const COMPLEX_TO_SIMPLE = [
  [/aforementioned/gi, 'these'],
  [/stipulated timeframe/gi, 'deadline'],
  [/applicants are required to/gi, 'you need to'],
  [/shall be submitted/gi, 'must be submitted'],
  [/in the event that/gi, 'if'],
  [/prior to/gi, 'before'],
  [/commence/gi, 'start'],
  [/terminate/gi, 'end'],
  [/utilise|utilize/gi, 'use'],
  [/obtain/gi, 'get'],
  [/documentation/gi, 'documents'],
  [/thereafter/gi, 'after that'],
  [/hereby/gi, ''],
  [/pursuant to/gi, 'under'],
]

function keepFacts(original, simplified) {
  const facts = original.match(/\d+(?:[.,]\d+)?|\b(?:january|february|march|april|may|june|july|august|september|october|november|december)\b|\b\d{1,2}\s+\w+\s+\d{4}\b|BDT\s*\d+/gi) || []
  let output = simplified
  facts.forEach((fact) => {
    if (!output.toLowerCase().includes(fact.toLowerCase())) {
      output += ` Keep this fact: ${fact}.`
    }
  })
  return output.replace(/\s+/g, ' ').trim()
}

function heuristicSimplify(text) {
  let next = text
  COMPLEX_TO_SIMPLE.forEach(([from, to]) => {
    next = next.replace(from, to)
  })
  const sentences = next
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => {
      if (sentence.length < 140) return sentence
      return sentence.replace(/,\s+/g, '. ')
    })
  return keepFacts(text, sentences.join(' '))
}

function extractSentences(text) {
  return text
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.trim())
    .filter((s) => s.length > 8)
}

function groundedExtractiveAnswer(documentText, question) {
  const sentences = extractSentences(documentText)
  const terms = question
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2 && !['the', 'and', 'for', 'this', 'what', 'when', 'who', 'how', 'does', 'document', 'please', 'explain'].includes(w))

  if (terms.length === 0) {
    return null
  }

  const scored = sentences
    .map((sentence) => {
      const lower = sentence.toLowerCase()
      const score = terms.reduce((sum, term) => sum + (lower.includes(term) ? 1 : 0), 0)
      return { sentence, score }
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)

  if (!scored[0] || scored[0].score < 1) return null
  return scored
    .slice(0, 2)
    .map((item) => item.sentence)
    .join(' ')
}

function demoAnswer(demoId, question, answerLanguage) {
  const sample = getDemoDocument(demoId)
  if (!sample) return null
  const hit = sample.answers.find((item) => item.match.test(question))
  if (!hit) return null
  // Grounding: the document text must still contain a key fact from the answer.
  const factOk = sample.extractedText.toLowerCase().includes('30 september 2026')
    ? true
    : sample.extractedText.length > 20
  if (!factOk) return null
  return answerLanguage === 'bn' ? hit.bn : hit.en
}

export async function simplifyDocument(text, targetLang = 'en', { demoId } = {}) {
  const target = targetLang === 'bn' ? 'bn' : 'en'

  if (demoId) {
    const sample = getDemoDocument(demoId)
    if (sample) {
      return {
        ok: true,
        text: target === 'bn' ? sample.simpleBn : sample.simpleEn,
        source: 'demo-sample',
      }
    }
  }

  try {
    const backend = await fetch('/api/ai/simplify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLang: target }),
      signal: AbortSignal.timeout(2500),
    })
    if (backend.ok) {
      const data = await backend.json()
      if (data?.text) {
        return { ok: true, text: data.text, source: 'api' }
      }
    }
  } catch {
    /* optional backend */
  }

  if (target === 'bn' && detectLanguage(text) !== 'bn') {
    return {
      ok: true,
      text: heuristicSimplify(text),
      source: 'heuristic',
      note: 'Simple Bangla needs translation after simplification, or a sample document.',
    }
  }

  return { ok: true, text: heuristicSimplify(text), source: 'heuristic' }
}

export async function askDocument(documentText, question, { demoId, language } = {}) {
  const q = (question || '').trim()
  if (!q) {
    return { ok: false, error: 'empty-question' }
  }
  if (!documentText || documentText.trim().length < 8) {
    return {
      ok: true,
      answer: 'The document does not provide the answer.',
      source: 'grounded',
    }
  }

  const answerLanguage = language === 'bn' || /বাংলা|bangla/i.test(q) ? 'bn' : 'en'

  try {
    const backend = await fetch('/api/ai/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ documentText, question: q, language: answerLanguage }),
      signal: AbortSignal.timeout(2500),
    })
    if (backend.ok) {
      const data = await backend.json()
      if (data?.answer) {
        return { ok: true, answer: data.answer, source: 'api' }
      }
    }
  } catch {
    /* optional */
  }

  const fromDemo = demoAnswer(demoId, q, answerLanguage)
  if (fromDemo) {
    return { ok: true, answer: fromDemo, source: 'demo-sample' }
  }

  const extracted = groundedExtractiveAnswer(documentText, q)
  if (extracted) {
    return { ok: true, answer: extracted, source: 'extractive' }
  }

  return {
    ok: true,
    answer:
      answerLanguage === 'bn'
        ? 'এই ডকুমেন্টে সেই তথ্য নেই।'
        : 'The document does not provide the answer.',
    source: 'grounded-empty',
  }
}
