import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STRINGS } from '../i18n'
import { applySettingsToDocument, loadSettings, saveSettings } from '../services/settings'
import { loadCurrentDocument, saveCurrentDocument } from '../services/history'

const AccessibilityContext = createContext(null)
const DocumentContext = createContext(null)

export function AppProviders({ children }) {
  const [settings, setSettings] = useState(() => loadSettings())
  const [documentRecord, setDocumentRecord] = useState(() => loadCurrentDocument())

  useEffect(() => {
    applySettingsToDocument(settings)
    saveSettings(settings)
  }, [settings])

  const t = useMemo(() => STRINGS[settings.language] || STRINGS.en, [settings.language])

  const accessibilityValue = useMemo(
    () => ({
      settings,
      t,
      updateSettings: (patch) => setSettings((prev) => ({ ...prev, ...patch })),
    }),
    [settings, t],
  )

  const documentValue = useMemo(
    () => ({
      documentRecord,
      setDocument: (record) => {
        setDocumentRecord(record)
        if (record) saveCurrentDocument(record)
      },
      updateDocument: (patch) => {
        setDocumentRecord((prev) => {
          if (!prev) return prev
          const next = { ...prev, ...patch }
          saveCurrentDocument(next)
          return next
        })
      },
    }),
    [documentRecord],
  )

  return (
    <AccessibilityContext.Provider value={accessibilityValue}>
      <DocumentContext.Provider value={documentValue}>{children}</DocumentContext.Provider>
    </AccessibilityContext.Provider>
  )
}

export function useAccess() {
  const ctx = useContext(AccessibilityContext)
  if (!ctx) throw new Error('useAccess must be used within AppProviders')
  return ctx
}

export function useDocument() {
  const ctx = useContext(DocumentContext)
  if (!ctx) throw new Error('useDocument must be used within AppProviders')
  return ctx
}
