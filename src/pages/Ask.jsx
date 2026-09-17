import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, ErrorMessage } from '../components/ui'
import { TextToSpeechButton } from '../components/chrome'
import { useAccess, useDocument } from '../context/AppProviders'
import { askDocument } from '../services/ai'
import { IconArrowLeft, IconAsk } from '../components/icons'

export default function Ask() {
  const { t, settings } = useAccess()
  const { documentRecord } = useDocument()
  const navigate = useNavigate()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  if (!documentRecord) {
    return (
      <div className="page">
        <div className="empty-card empty-state">
          <p>{t.noImage}</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate('/scan')}>
            {t.scanDocument}
          </button>
        </div>
      </div>
    )
  }

  const suggestions = [t.qDeadline, t.qWho, t.qDocs, t.qBangla, t.qSummary]

  async function submit(nextQuestion = question) {
    const q = nextQuestion.trim()
    if (!q) return
    setBusy(true)
    setError('')
    const result = await askDocument(documentRecord.extractedText, q, {
      demoId: documentRecord.demoId,
      language: settings.language,
    })
    setBusy(false)
    if (!result.ok) {
      setError(t.aiFail)
      return
    }
    setQuestion(q)
    setAnswer(result.answer)
  }

  const answerLang = /[\u0980-\u09FF]/.test(answer) ? 'bn' : 'en'

  return (
    <div className="page ask-page">
      <Link to="/document" className="back-link">
        <IconArrowLeft /> {t.back}
      </Link>
      <h1>{t.askPageTitle}</h1>
      <ErrorMessage>{error}</ErrorMessage>

      <div className="ask-layout">
        <div>
          <label className="field">
            <span>{t.askPrompt}</span>
            <textarea rows={3} value={question} onChange={(e) => setQuestion(e.target.value)} />
          </label>
          <Button icon={<IconAsk />} disabled={busy} onClick={() => submit()}>
            {t.askButton}
          </Button>

          {answer ? (
            <section className="answer-card" aria-live="polite" style={{ marginTop: '1rem' }}>
              <h2>{t.answer}</h2>
              <p className="answer-text">{answer}</p>
              <p className="muted">{t.source}</p>
              <TextToSpeechButton text={answer} language={answerLang} />
            </section>
          ) : null}
        </div>

        <section>
          <h2>{t.suggested}</h2>
          <div className="chip-row">
            {suggestions.map((item) => (
              <button key={item} type="button" className="sample-chip" onClick={() => submit(item)}>
                {item}
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
