import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button, ErrorMessage, LoadingState, PageHeader } from '../components/ui'
import { UploadBox } from '../components/document'
import { useAccess, useDocument } from '../context/AppProviders'
import { DEMO_DOCUMENTS } from '../data/demoDocuments'
import { saveHistoryItem } from '../services/history'
import { buildDemoDocumentRecord, extractTextFromImage } from '../services/ocr'
import { isAllowedImage } from '../utils/document'
import { IconScan } from '../components/icons'

const STEPS = (t) => [
  { id: 'received', label: t.progressReceived },
  { id: 'reading', label: t.progressReading },
  { id: 'understanding', label: t.progressUnderstanding },
  { id: 'preparing', label: t.progressPreparing },
]

export default function Scan() {
  const { t } = useAccess()
  const { setDocument } = useDocument()
  const navigate = useNavigate()
  const location = useLocation()
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  const [file, setFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [cameraActive, setCameraActive] = useState(false)
  const [error, setError] = useState('')
  const [progress, setProgress] = useState(null)

  useEffect(() => {
    const mode = new URLSearchParams(location.search).get('mode')
    if (mode === 'camera') startCamera()
    return stopCamera
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function stopCamera() {
    streamRef.current?.getTracks().forEach((track) => track.stop())
    streamRef.current = null
    setCameraActive(false)
  }

  async function startCamera() {
    setError('')
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(t.cameraDenied)
      return
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      })
      streamRef.current = stream
      setCameraActive(true)
      requestAnimationFrame(() => {
        if (videoRef.current) videoRef.current.srcObject = stream
      })
    } catch {
      setError(t.cameraDenied)
    }
  }

  function handleFile(nextFile) {
    if (!isAllowedImage(nextFile)) {
      setError(t.invalidImage)
      return
    }
    setError('')
    setFile(nextFile)
    setPreviewUrl(URL.createObjectURL(nextFile))
    stopCamera()
  }

  function captureFrame() {
    const video = videoRef.current
    if (!video) return
    const canvas = document.createElement('canvas')
    canvas.width = video.videoWidth || 1280
    canvas.height = video.videoHeight || 720
    canvas.getContext('2d').drawImage(video, 0, 0)
    canvas.toBlob(
      (blob) => {
        if (!blob) return
        const captured = new File([blob], 'camera-capture.jpg', { type: 'image/jpeg' })
        handleFile(captured)
      },
      'image/jpeg',
      0.92,
    )
  }

  async function runScan() {
    if (!file) {
      setError(t.noImage)
      return
    }
    setError('')
    setProgress('received')
    const result = await extractTextFromImage(file, { onProgress: setProgress })
    setProgress(null)
    if (!result.ok) {
      setError(t.ocrFail)
      return
    }
    finish(result.record)
  }

  function finish(record) {
    setDocument(record)
    saveHistoryItem(record)
    navigate('/document')
  }

  function loadSample(id) {
    const record = buildDemoDocumentRecord(id)
    finish(record)
  }

  return (
    <div className="page scan-page">
      <PageHeader title={t.scanPageTitle} lead={t.scanSubtitle} />
      <ErrorMessage>{error}</ErrorMessage>

      {progress ? (
        <LoadingState steps={STEPS(t)} current={progress} />
      ) : (
        <div className="scan-layout">
          <div>
            <UploadBox
              previewUrl={previewUrl}
              onFile={handleFile}
              onTakePhoto={startCamera}
              cameraActive={cameraActive}
              videoRef={videoRef}
              onCapture={captureFrame}
              onCancelCamera={stopCamera}
            />

            {previewUrl && !cameraActive ? (
              <div className="button-row sticky-actions">
                <Button icon={<IconScan />} onClick={runScan}>
                  {t.scanNow}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setFile(null)
                    setPreviewUrl('')
                  }}
                >
                  {t.changeImage}
                </Button>
              </div>
            ) : null}
          </div>

          <section className="demo-panel" aria-labelledby="demo-title">
            <h2 id="demo-title">{t.trySample}</h2>
            <p className="muted">{t.demoSampleHelp}</p>
            <Button className="btn-xl" onClick={() => loadSample('school-notice')}>
              {t.schoolSample}
            </Button>
            <div className="sample-list">
              {DEMO_DOCUMENTS.filter((d) => d.id !== 'school-notice').map((doc) => (
                <button key={doc.id} type="button" className="sample-chip" onClick={() => loadSample(doc.id)}>
                  {doc.name}
                </button>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}
