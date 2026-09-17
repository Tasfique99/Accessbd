import { useRef } from 'react'
import { Button } from './ui'
import { useAccess } from '../context/AppProviders'
import { IconCamera, IconUpload, IconScan } from './icons'

export function UploadBox({
  previewUrl,
  onFile,
  onTakePhoto,
  cameraActive,
  videoRef,
  onCapture,
  onCancelCamera,
}) {
  const { t } = useAccess()
  const inputRef = useRef(null)

  return (
    <section className="upload-box" aria-label={t.scanPageTitle}>
      {cameraActive ? (
        <div className="camera-stage">
          <video ref={videoRef} autoPlay playsInline muted className="camera-video" />
          <div className="button-row">
            <Button icon={<IconCamera />} onClick={onCapture}>
              {t.takePhoto}
            </Button>
            <Button variant="secondary" onClick={onCancelCamera}>
              {t.changeImage}
            </Button>
          </div>
        </div>
      ) : previewUrl ? (
        <figure className="preview-stage">
          <img src={previewUrl} alt={t.previewAlt} />
        </figure>
      ) : (
        <div className="drop-stage">
          <div className="drop-icon">
            <IconScan />
          </div>
          <p>{t.scanSubtitle}</p>
        </div>
      )}

      {!cameraActive && (
        <div className="button-row">
          <Button icon={<IconCamera />} onClick={onTakePhoto}>
            {t.takePhoto}
          </Button>
          <Button variant="secondary" icon={<IconUpload />} onClick={() => inputRef.current?.click()}>
            {t.uploadImageBtn}
          </Button>
        </div>
      )}

      <input
        ref={inputRef}
        className="sr-only"
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) onFile(file)
          e.target.value = ''
        }}
      />
    </section>
  )
}

export function DocumentViewer({ title, text, banner, meta }) {
  return (
    <article className="document-viewer">
      {banner}
      {meta}
      <h2>{title}</h2>
      <pre className="document-text">{text}</pre>
    </article>
  )
}

export function FormAssistant({ fields, language, onClose, t }) {
  return (
    <div className="form-help">
      <p className="form-note">{t.formHelpNote}</p>
      <ul className="field-list">
        {fields.map((field) => (
          <li key={field.id}>
            <strong>{language === 'bn' ? field.labelBn : field.label}</strong>
            <p>{language === 'bn' ? field.meaningBn : field.meaning}</p>
          </li>
        ))}
      </ul>
      <Button variant="secondary" onClick={onClose}>
        {t.close}
      </Button>
    </div>
  )
}
