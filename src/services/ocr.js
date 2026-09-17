import { DEMO_DOCUMENTS, getDemoDocument } from '../data/demoDocuments'
import {
  createId,
  defaultFormFields,
  detectLanguage,
  fileToDataUrl,
  looksLikeForm,
} from '../utils/document'

/**
 * OCR service abstraction.
 * Live path: Tesseract.js in the browser (no API key).
 * Demo path: labelled sample documents — never presented as live OCR.
 */

let workerPromise = null

async function getWorker() {
  if (!workerPromise) {
    workerPromise = (async () => {
      const { createWorker } = await import('tesseract.js')
      const worker = await createWorker('eng')
      return worker
    })()
  }
  return workerPromise
}

export function buildDemoDocumentRecord(demoId, extra = {}) {
  const sample = getDemoDocument(demoId)
  if (!sample) return null
  return {
    id: extra.id || createId('demo'),
    name: sample.name,
    createdAt: extra.createdAt || new Date().toISOString(),
    imageDataUrl: extra.imageDataUrl || `/demo-documents/${sample.id}.svg`,
    extractedText: sample.extractedText,
    language: sample.language,
    confidence: sample.confidence,
    source: 'demo-sample',
    demoId: sample.id,
    isForm: sample.isForm,
    formFields: sample.formFields || null,
    preview: sample.preview,
  }
}

export async function extractTextFromImage(file, { onProgress } = {}) {
  onProgress?.('received')
  const imageDataUrl = await fileToDataUrl(file)
  onProgress?.('reading')

  try {
    const worker = await getWorker()
    const result = await worker.recognize(imageDataUrl)
    const text = (result.data.text || '').replace(/\u000c/g, '').trim()
    const confidence = typeof result.data.confidence === 'number' ? result.data.confidence / 100 : null

    onProgress?.('understanding')

    if (!text || text.length < 18) {
      onProgress?.('preparing')
      return {
        ok: false,
        error: 'ocr-empty',
        imageDataUrl,
      }
    }

    onProgress?.('preparing')
    const language = detectLanguage(text)
    const isForm = looksLikeForm(text)

    return {
      ok: true,
      record: {
        id: createId('ocr'),
        name: file.name || 'Scanned document',
        createdAt: new Date().toISOString(),
        imageDataUrl,
        extractedText: text,
        language,
        confidence,
        source: 'tesseract',
        demoId: null,
        isForm,
        formFields: isForm ? defaultFormFields() : null,
        preview: text.slice(0, 140),
      },
    }
  } catch {
    return {
      ok: false,
      error: 'ocr-failed',
      imageDataUrl,
    }
  }
}

export function listDemoDocuments() {
  return DEMO_DOCUMENTS.map((doc) => ({
    id: doc.id,
    name: doc.name,
    nameBn: doc.nameBn,
    type: doc.type,
  }))
}
