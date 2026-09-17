import { PageHeader } from '../components/ui'
import { useAccess } from '../context/AppProviders'

export default function About() {
  const { t } = useAccess()
  return (
    <div className="page about-page">
      <PageHeader eyebrow={t.appName} title={t.aboutTitle} lead={t.aboutSubtitle} />

      <div className="about-grid">
        <section className="card">
          <h2>{t.problemTitle}</h2>
          <p className="muted">{t.problemBody}</p>
        </section>
        <section className="card">
          <h2>{t.solutionTitle}</h2>
          <p className="muted">{t.solutionBody}</p>
        </section>
      </div>

      <blockquote className="about-quote" style={{ marginTop: '1rem' }}>
        <h2>{t.innovationTitle}</h2>
        <p>{t.innovationBody}</p>
      </blockquote>

      <ol className="flow-steps" style={{ marginTop: '1.2rem' }}>
        <li>
          <span className="step-index">1</span>
          {t.stepScan}
        </li>
        <li>
          <span className="step-index">2</span>
          {t.stepUnderstand}
        </li>
        <li>
          <span className="step-index">3</span>
          {t.stepAccess}
        </li>
      </ol>
    </div>
  )
}
