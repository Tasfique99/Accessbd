import { useEffect, useState } from 'react'
import { isSpeechAvailable, onSpeakingChange, speakText, stopSpeaking } from '../services/speech'
import { useAccess } from '../context/AppProviders'

export function useSpeech() {
  const { settings } = useAccess()
  const [speaking, setSpeaking] = useState(false)
  const available = isSpeechAvailable()

  useEffect(() => onSpeakingChange(setSpeaking), [])
  useEffect(() => () => stopSpeaking(), [])

  function speak(text, language) {
    if (!settings.ttsEnabled) return { ok: false, reason: 'disabled' }
    return speakText(text, language)
  }

  return {
    speaking,
    available,
    enabled: settings.ttsEnabled && available,
    speak,
    stop: stopSpeaking,
  }
}

export function useOnline() {
  const [online, setOnline] = useState(typeof navigator === 'undefined' ? true : navigator.onLine)
  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])
  return online
}
