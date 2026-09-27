import React from 'react'
import { sharePageUrl } from '../utils'

function ShareLinks({ title, path }) {
  const url = encodeURIComponent(sharePageUrl(path || window.location.pathname))
  const text = encodeURIComponent(title)

  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      <span className="small text-muted">Share:</span>
      <a
        className="btn btn-sm btn-outline-secondary"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Facebook
      </a>
      <a
        className="btn btn-sm btn-outline-secondary"
        href={`https://twitter.com/intent/tweet?text=${text}&url=${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        X
      </a>
      <a
        className="btn btn-sm btn-outline-secondary"
        href={`https://wa.me/?text=${text}%20${url}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        WhatsApp
      </a>
    </div>
  )
}

export default ShareLinks
