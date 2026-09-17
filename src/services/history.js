const HISTORY_KEY = 'accessbd_history'
const CURRENT_KEY = 'accessbd_current_document'
const MAX_ITEMS = 20

export function loadHistory() {
  try {
    const raw = localStorage.getItem(HISTORY_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function saveHistoryItem(documentRecord) {
  const history = loadHistory().filter((item) => item.id !== documentRecord.id)
  const compact = {
    id: documentRecord.id,
    name: documentRecord.name,
    createdAt: documentRecord.createdAt,
    language: documentRecord.language,
    preview: documentRecord.preview || documentRecord.extractedText.slice(0, 140),
    source: documentRecord.source,
    demoId: documentRecord.demoId || null,
  }
  history.unshift(compact)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_ITEMS)))
}

export function deleteHistoryItem(id) {
  const history = loadHistory().filter((item) => item.id !== id)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history))
  const current = loadCurrentDocument()
  if (current?.id === id) {
    sessionStorage.removeItem(CURRENT_KEY)
  }
}

export function saveCurrentDocument(doc) {
  sessionStorage.setItem(CURRENT_KEY, JSON.stringify(doc))
  try {
    localStorage.setItem(`${CURRENT_KEY}_${doc.id}`, JSON.stringify(doc))
  } catch {
    // Image data URLs can be large; history still keeps a compact preview.
  }
}

export function loadCurrentDocument() {
  try {
    const raw = sessionStorage.getItem(CURRENT_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function loadDocumentById(id) {
  try {
    const raw = localStorage.getItem(`${CURRENT_KEY}_${id}`)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  const current = loadCurrentDocument()
  if (current?.id === id) return current
  return null
}
