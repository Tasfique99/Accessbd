import { useAccess } from '../context/AppProviders'

export function Button({
  children,
  icon,
  variant = 'primary',
  type = 'button',
  className = '',
  ...props
}) {
  return (
    <button type={type} className={`btn btn-${variant} ${className}`.trim()} {...props}>
      {icon ? <span aria-hidden="true">{icon}</span> : null}
      <span>{children}</span>
    </button>
  )
}

export function Card({ as: Tag = 'article', title, icon, children, className = '', ...props }) {
  return (
    <Tag className={`card ${className}`.trim()} {...props}>
      {icon ? (
        <div className="card-icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      {title ? <h3 className="card-title">{title}</h3> : null}
      {children}
    </Tag>
  )
}

export function PageHeader({ eyebrow, title, lead, children }) {
  return (
    <header className="page-header">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h1>{title}</h1>
      {lead ? <p className="lead">{lead}</p> : null}
      {children}
    </header>
  )
}

export function ErrorMessage({ children }) {
  if (!children) return null
  return (
    <p className="error-banner" role="alert">
      {children}
    </p>
  )
}

export function EmptyState({ title, children, action }) {
  return (
    <div className="empty-state empty-card">
      <h2>{title}</h2>
      {children}
      {action}
    </div>
  )
}

export function LoadingState({ steps, current }) {
  const index = steps.findIndex((step) => step.id === current)
  return (
    <ol className="progress-list progress-card card" aria-live="polite">
      {steps.map((step, i) => {
        const state = i < index ? 'done' : i === index ? 'current' : 'todo'
        return (
          <li key={step.id} data-state={state}>
            <span className="progress-mark" aria-hidden="true">
              {state === 'done' ? '✓' : state === 'current' ? '●' : ''}
            </span>
            <span>
              {step.label}
              {state === 'current' ? ' (in progress)' : ''}
            </span>
          </li>
        )
      })}
    </ol>
  )
}

export function Modal({ open, title, onClose, children }) {
  const { t } = useAccess()
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-head">
          <h2 id="modal-title">{title}</h2>
          <button type="button" className="btn btn-ghost" onClick={onClose}>
            {t.close}
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
