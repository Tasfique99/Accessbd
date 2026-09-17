let utterance = null
let speakingListeners = new Set()

function notify(isSpeaking) {
  speakingListeners.forEach((fn) => fn(isSpeaking))
}

export function onSpeakingChange(fn) {
  speakingListeners.add(fn)
  return () => speakingListeners.delete(fn)
}

export function isSpeechAvailable() {
  return typeof window !== 'undefined' && 'speechSynthesis' in window
}

function pickVoice(language) {
  const voices = window.speechSynthesis.getVoices()
  const want = language === 'bn' ? 'bn' : 'en'
  return (
    voices.find((v) => v.lang.toLowerCase().startsWith(want)) ||
    voices.find((v) => v.lang.toLowerCase().includes(want === 'bn' ? 'bn' : 'en')) ||
    null
  )
}

export function speakText(text, language = 'en') {
  if (!isSpeechAvailable()) {
    return { ok: false, reason: 'unavailable' }
  }
  const content = (text || '').trim()
  if (!content) {
    return { ok: false, reason: 'empty' }
  }

  stopSpeaking()
  utterance = new SpeechSynthesisUtterance(content)
  utterance.lang = language === 'bn' ? 'bn-BD' : 'en-GB'
  const voice = pickVoice(language)
  if (voice) utterance.voice = voice
  utterance.rate = 0.95
  utterance.onstart = () => notify(true)
  utterance.onend = () => {
    notify(false)
    utterance = null
  }
  utterance.onerror = () => {
    notify(false)
    utterance = null
  }

  // Some browsers populate voices asynchronously.
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => {
      const lateVoice = pickVoice(language)
      if (lateVoice && utterance) utterance.voice = lateVoice
    }
  }

  window.speechSynthesis.cancel()
  window.speechSynthesis.speak(utterance)
  notify(true)
  return { ok: true }
}

export function stopSpeaking() {
  if (!isSpeechAvailable()) return
  window.speechSynthesis.cancel()
  utterance = null
  notify(false)
}
