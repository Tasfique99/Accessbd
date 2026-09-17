const SETTINGS_KEY = 'accessbd_settings'

export const DEFAULT_SETTINGS = {
  textSize: 'medium',
  highContrast: false,
  reduceMotion: false,
  ttsEnabled: true,
  language: 'en',
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    if (!raw) return { ...DEFAULT_SETTINGS }
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function saveSettings(settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
}

export function applySettingsToDocument(settings) {
  const root = document.documentElement
  root.dataset.textSize = settings.textSize
  root.dataset.contrast = settings.highContrast ? 'high' : 'normal'
  root.dataset.reduceMotion = settings.reduceMotion ? 'on' : 'off'
  root.lang = settings.language === 'bn' ? 'bn' : 'en'
}
