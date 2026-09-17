import { LanguageToggle } from '../components/chrome'
import { PageHeader } from '../components/ui'
import { useAccess } from '../context/AppProviders'

export default function Settings() {
  const { t, settings, updateSettings } = useAccess()
  const sizes = [
    ['small', t.small],
    ['medium', t.medium],
    ['large', t.large],
    ['xl', t.extraLarge],
  ]

  return (
    <div className="page settings-page">
      <PageHeader title={t.settingsTitle} lead={t.privacyNote} />

      <fieldset className="setting-block">
        <legend>{t.textSize}</legend>
        <div className="segmented wrap">
          {sizes.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={settings.textSize === id ? 'is-active' : ''}
              aria-pressed={settings.textSize === id}
              onClick={() => updateSettings({ textSize: id })}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <ToggleRow
        label={t.highContrast}
        on={settings.highContrast}
        onLabel={t.on}
        offLabel={t.off}
        onChange={(highContrast) => updateSettings({ highContrast })}
      />
      <ToggleRow
        label={t.reduceMotion}
        on={settings.reduceMotion}
        onLabel={t.on}
        offLabel={t.off}
        onChange={(reduceMotion) => updateSettings({ reduceMotion })}
      />
      <ToggleRow
        label={t.tts}
        on={settings.ttsEnabled}
        onLabel={t.on}
        offLabel={t.off}
        onChange={(ttsEnabled) => updateSettings({ ttsEnabled })}
      />

      <fieldset className="setting-block">
        <legend>{t.uiLanguage}</legend>
        <LanguageToggle
          value={settings.language}
          onChange={(language) => updateSettings({ language })}
          labelEn={t.english}
          labelBn={t.banglaLang}
        />
      </fieldset>
    </div>
  )
}

function ToggleRow({ label, on, onLabel, offLabel, onChange }) {
  return (
    <fieldset className="setting-block">
      <legend>{label}</legend>
      <div className="segmented">
        <button type="button" className={on ? 'is-active' : ''} aria-pressed={on} onClick={() => onChange(true)}>
          {onLabel}
        </button>
        <button
          type="button"
          className={!on ? 'is-active' : ''}
          aria-pressed={!on}
          onClick={() => onChange(false)}
        >
          {offLabel}
        </button>
      </div>
    </fieldset>
  )
}
