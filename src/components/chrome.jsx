import { NavLink } from 'react-router-dom'
import { useAccess } from '../context/AppProviders'
import { useSpeech } from '../hooks/useSpeech'
import { IconHome, IconScan, IconHistory, IconSettings, IconInfo, IconStop, IconVolume } from './icons'

export function Navbar() {
  const { t, settings, updateSettings } = useAccess()
  const links = [
    { to: '/', label: t.navHome, icon: IconHome },
    { to: '/scan', label: t.navScan, icon: IconScan },
    { to: '/history', label: t.navHistory, icon: IconHistory },
    { to: '/settings', label: t.navAccessibility, icon: IconSettings },
    { to: '/about', label: t.navAbout, icon: IconInfo },
  ]

  return (
    <header className="site-header">
      <div className="brand-block">
        <NavLink to="/" className="brand" aria-label={`${t.appName}. ${t.tagline}`}>
          <span className="brand-mark" aria-hidden="true">A</span>
          <span>
            <span className="brand-name">{t.appName}</span>
            <span className="tagline">{t.tagline}</span>
          </span>
        </NavLink>
      </div>

      <nav className="site-nav" aria-label="Primary">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'}>
            <link.icon />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="header-tools">
        <NavLink to="/about" className="header-about">
          <IconInfo />
          <span>{t.navAbout}</span>
        </NavLink>
        <div className="header-lang">
          <LanguageToggle
            value={settings.language}
            onChange={(language) => updateSettings({ language })}
            labelEn="EN"
            labelBn="বাং"
          />
        </div>
      </div>
    </header>
  )
}

export function MobileDock() {
  const { t } = useAccess()
  const links = [
    { to: '/', label: t.navHome, icon: IconHome },
    { to: '/scan', label: t.navScan, icon: IconScan },
    { to: '/history', label: t.navHistory, icon: IconHistory },
    { to: '/settings', label: t.navAccessibility, icon: IconSettings },
  ]

  return (
    <nav className="dock" aria-label="Primary">
      {links.map((link) => (
        <NavLink key={link.to} to={link.to} end={link.to === '/'}>
          <link.icon />
          <span>{link.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

export function Layout({ children }) {
  const { t } = useAccess()
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <footer className="site-footer">{t.footer}</footer>
      <MobileDock />
    </div>
  )
}

export function LanguageToggle({ value, onChange, labelEn, labelBn }) {
  return (
    <div className="segmented" role="group" aria-label="Language">
      <button
        type="button"
        aria-pressed={value === 'bn'}
        className={value === 'bn' ? 'is-active' : ''}
        onClick={() => onChange('bn')}
      >
        {labelBn || 'বাংলা'}
      </button>
      <button
        type="button"
        aria-pressed={value === 'en'}
        className={value === 'en' ? 'is-active' : ''}
        onClick={() => onChange('en')}
      >
        {labelEn || 'English'}
      </button>
    </div>
  )
}

export function TextToSpeechButton({ text, language = 'en' }) {
  const { t } = useAccess()
  const speech = useSpeech()

  if (!speech.available) {
    return (
      <p className="muted" role="status">
        {t.speechUnavailable}
      </p>
    )
  }

  if (!speech.enabled) return null

  if (speech.speaking) {
    return (
      <div className="tts-row" role="status">
        <span>{t.readingAloud}</span>
        <button type="button" className="btn btn-secondary" onClick={speech.stop}>
          <IconStop />
          <span>{t.stop}</span>
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => speech.speak(text, language)}
    >
      <IconVolume />
      <span>{t.readAloud}</span>
    </button>
  )
}

export function PageLoader() {
  return (
    <div className="page page-loader" role="status" aria-live="polite">
      <span className="sr-only">Loading AccessBD…</span>
      <div className="skeleton lg" />
      <div className="skeleton md" />
      <div className="skeleton sm" />
      <div className="skeleton md" />
    </div>
  )
}
