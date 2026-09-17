import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, ErrorMessage, Modal } from '../components/ui'
import { DocumentViewer, FormAssistant } from '../components/document'
import { LanguageToggle, TextToSpeechButton } from '../components/chrome'
import { useAccess, useDocument } from '../context/AppProviders'
import { useSpeech } from '../hooks/useSpeech'
import { simplifyDocument } from '../services/ai'
import { translateText } from '../services/translation'
import { IconArrowLeft, IconAsk, IconSimplify, IconStop, IconTranslate, IconVolume } from '../components/icons'

export default function DocumentPage() {
  const { t, settings } = useAccess()
  const { documentRecord, updateDocument } = useDocument()
  const navigate = useNavigate()
  const [tab, setTab] = useState('original')
  const [simpleLang, setSimpleLang] = useState('en')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [formOpen, setFormOpen] = useState(false)
  const speech = useSpeech()

  const display = useMemo(() => {
    if (!documentRecord) return ''
    if (tab === 'bangla') return documentRecord.translationBn || documentRecord.extractedText
    if (tab === 'simple') {
      return simpleLang === 'bn'
        ? documentRecord.simpleBn || documentRecord.simpleEn || documentRecord.extractedText
        : documentRecord.simpleEn || documentRecord.extractedText
    }
    return documentRecord.extractedText
  }, [documentRecord, tab, simpleLang])

  if (!documentRecord) {
    return (
      <div className="page">
        <div className="empty-card empty-state">
          <p>{t.noImage}</p>
          <Link to="/scan" className="btn btn-primary">
            {t.scanDocument}
          </Link>
        </div>
      </div>
    )
  }

  const speechLang = tab === 'bangla' || (tab === 'simple' && simpleLang === 'bn') ? 'bn' : 'en'
  const confidence =
    documentRecord.confidence != null ? `${Math.round(documentRecord.confidence * 100)}%` : '—'
  const languageLabel = documentRecord.language === 'bn' ? 'বাংলা' : 'English'

  async function runTranslate() {
    setBusy(true)
    setError('')
    const result = await translateText(documentRecord.extractedText, 'bn', {
      demoId: documentRecord.demoId,
    })
    setBusy(false)
    if (!result.ok) {
      setError(t.translationFail)
      return
    }
    updateDocument({ translationBn: result.text, translationSource: result.source })
    setTab('bangla')
  }

  async function runSimplify() {
    setBusy(true)
    setError('')
    const result = await simplifyDocument(documentRecord.extractedText, simpleLang, {
      demoId: documentRecord.demoId,
    })
    setBusy(false)
    if (!result.ok) {
      setError(t.aiFail)
      return
    }
    updateDocument(simpleLang === 'bn' ? { simpleBn: result.text } : { simpleEn: result.text })
    setTab('simple')
  }

  const banner =
    documentRecord.source === 'demo-sample' ? (
      <p className="notice demo">{t.demoSampleBanner}</p>
    ) : (
      <p className="notice live">{t.liveOcrBanner}</p>
    )

  return (
    <div className="page document-page">
      <Link to="/scan" className="back-link">
        <IconArrowLeft /> {t.back}
      </Link>
      <h1>{t.documentTitle}</h1>
      <ErrorMessage>{error}</ErrorMessage>

      <section className="meta-card" aria-label={t.documentDetected}>
        <p className="eyebrow">{t.documentDetected}</p>
        <p>
          {t.language}: {languageLabel}
        </p>
        <p>
          {t.confidence}: {confidence}
        </p>
      </section>

      <div className="doc-layout">
        <div>
          <div className="tabs" role="tablist" aria-label="Document views">
            {[
              ['original', t.original],
              ['bangla', t.bangla],
              ['simple', t.simple],
            ].map(([id, label]) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={tab === id}
                className={tab === id ? 'is-active' : ''}
                onClick={() => setTab(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {tab === 'simple' ? (
            <LanguageToggle
              value={simpleLang}
              onChange={setSimpleLang}
              labelEn={t.simpleEnglish}
              labelBn={t.simpleBangla}
            />
          ) : null}

          <DocumentViewer title={t.extractedText} text={display} banner={banner} />
          <TextToSpeechButton text={display} language={speechLang} />
        </div>

        <div>
          {documentRecord.isForm ? (
            <section className="form-card" aria-label={t.formDetected}>
              <h2>{t.formDetected}</h2>
              <p>{t.requiredInfo}</p>
              <ul className="check-list">
                {(documentRecord.formFields || []).map((field) => (
                  <li key={field.id}>✓ {settings.language === 'bn' ? field.labelBn : field.label}</li>
                ))}
              </ul>
              <p>{t.formHelpQ}</p>
              <Button onClick={() => setFormOpen(true)}>{t.yes}</Button>
              <p className="muted">{t.formHelpNote}</p>
            </section>
          ) : null}

          <section aria-labelledby="next">
            <h2 id="next">{t.whatNext}</h2>
            <div className="action-grid">
              <Button icon={<IconSimplify />} disabled={busy} onClick={runSimplify}>
                {t.simplify}
              </Button>
              <Button icon={<IconTranslate />} disabled={busy} onClick={runTranslate}>
                {t.translate}
              </Button>
              <Button
                icon={speech.speaking ? <IconStop /> : <IconVolume />}
                variant="secondary"
                onClick={() => (speech.speaking ? speech.stop() : speech.speak(display, speechLang))}
              >
                {speech.speaking ? t.stop : t.readAloud}
              </Button>
              <Button icon={<IconAsk />} variant="secondary" onClick={() => navigate('/ask')}>
                {t.askDocument}
              </Button>
            </div>
          </section>
        </div>
      </div>

      <Modal open={formOpen} title={t.formDetected} onClose={() => setFormOpen(false)}>
        <FormAssistant
          fields={documentRecord.formFields || []}
          language={settings.language}
          onClose={() => setFormOpen(false)}
          t={t}
        />
      </Modal>
    </div>
  )
}
