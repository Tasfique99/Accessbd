import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, EmptyState } from '../components/ui'
import { useAccess, useDocument } from '../context/AppProviders'
import { deleteHistoryItem, loadDocumentById, loadHistory } from '../services/history'
import { buildDemoDocumentRecord } from '../services/ocr'
import { IconOpen, IconScan, IconTrash } from '../components/icons'

export default function History() {
  const { t } = useAccess()
  const { setDocument } = useDocument()
  const navigate = useNavigate()
  const [items, setItems] = useState(() => loadHistory())

  function openItem(item) {
    const stored = loadDocumentById(item.id)
    if (stored) {
      setDocument(stored)
      navigate('/document')
      return
    }
    if (item.demoId) {
      const record = buildDemoDocumentRecord(item.demoId, { id: item.id, createdAt: item.createdAt })
      setDocument(record)
      navigate('/document')
    }
  }

  function remove(id) {
    deleteHistoryItem(id)
    setItems(loadHistory())
  }

  if (!items.length) {
    return (
      <div className="page">
        <h1>{t.historyTitle}</h1>
        <EmptyState
          title={t.noHistory}
          action={
            <Link to="/scan" className="btn btn-primary">
              <IconScan />
              <span>{t.scanFirst}</span>
            </Link>
          }
        >
          <p className="muted">{t.emptyHistoryBody}</p>
        </EmptyState>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>{t.historyTitle}</h1>
      <ul className="history-list">
        {items.map((item) => (
          <li key={item.id} className="history-item">
            <div>
              <h2>{item.name}</h2>
              <div className="meta-row">
                <span className="badge">{new Date(item.createdAt).toLocaleString()}</span>
                <span className="badge">{item.language === 'bn' ? 'বাংলা' : 'English'}</span>
                <span className={item.source === 'demo-sample' ? 'badge badge-demo' : 'badge badge-live'}>
                  {item.source === 'demo-sample' ? t.sampleBadge : t.liveBadge}
                </span>
              </div>
              <p className="muted">{item.preview}</p>
              {item.source === 'demo-sample' ? <p className="notice demo">{t.demoSampleBanner}</p> : null}
            </div>
            <div className="button-row">
              <Button icon={<IconOpen />} onClick={() => openItem(item)}>
                {t.open}
              </Button>
              <Button variant="danger" icon={<IconTrash />} onClick={() => remove(item.id)}>
                {t.delete}
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
