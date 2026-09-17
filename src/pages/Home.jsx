import { Link } from 'react-router-dom'
import { Card } from '../components/ui'
import { useAccess } from '../context/AppProviders'
import { useOnline } from '../hooks/useSpeech'
import { IconAsk, IconEye, IconScan, IconSimplify, IconTranslate, IconVolume } from '../components/icons'

export default function Home() {
  const { t } = useAccess()
  const online = useOnline()

  const features = [
    { icon: <IconEye />, title: t.readTitle, body: t.readBody },
    { icon: <IconTranslate />, title: t.translateTitle, body: t.translateBody },
    { icon: <IconSimplify />, title: t.simplifyTitle, body: t.simplifyBody },
    { icon: <IconAsk />, title: t.askTitle, body: t.askBody },
    { icon: <IconVolume />, title: t.listenTitle, body: t.listenBody },
  ]

  return (
    <div className="page home-page">
      {!online ? (
        <p className="error-banner" role="status">
          {t.offline}
        </p>
      ) : null}

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{t.appName}</p>
          <h1>{t.tagline}</h1>
          <p className="lead">{t.heroLead}</p>
          <p className="muted" style={{ marginTop: '-0.4rem', marginBottom: '1.1rem', maxWidth: '38rem' }}>
            {t.heroSupport}
          </p>
          <Link to="/scan" className="btn btn-primary btn-xl scan-cta">
            <IconScan />
            <span>{t.scanDocument}</span>
          </Link>
          <div className="hero-secondary">
            <Link to="/scan?mode=upload" className="text-link">
              {t.uploadImage}
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/scan?mode=camera" className="text-link">
              {t.useCamera}
            </Link>
          </div>
          <p className="muted" style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            {t.privacyNote}
          </p>
        </div>

        <aside className="product-frame" aria-label={t.productPreview}>
          <div className="product-chrome">
            <div className="product-dots" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
            <span className="product-label">{t.productPreview}</span>
          </div>
          <div className="product-tabs" aria-hidden="true">
            <span className="is-on">{t.original}</span>
            <span>{t.bangla}</span>
            <span>{t.simple}</span>
          </div>
          <div className="product-body">
            <strong>Greenfield Model School</strong>
            <p style={{ margin: '0.4rem 0 0' }}>
              Applications must be submitted before 30 September 2026. AccessBD can translate, simplify, and read this
              notice aloud.
            </p>
          </div>
        </aside>
      </section>

      <section aria-labelledby="can-do">
        <h2 id="can-do">{t.whatCanIDo}</h2>
        <div className="feature-grid">
          {features.map((item) => (
            <Card key={item.title} icon={item.icon} title={item.title}>
              <p className="muted">{item.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section className="how" aria-labelledby="how">
        <h2 id="how">{t.howItWorks}</h2>
        <ol className="flow-steps">
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
      </section>
    </div>
  )
}
