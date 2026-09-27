import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import marketsData from '../data/m_data.json'
import { toggleBookmark, isBookmarked } from '../utils'

function ProduceCard({ produce }) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked('produceBookmarks', produce.id))
  }, [produce.id])

  function handleSave() {
    let isSaved = toggleBookmark('produceBookmarks', { id: produce.id, name: produce.name })
    setSaved(isSaved)
  }

  let markets = produce.marketsAvailable
    ? produce.marketsAvailable.map(id => marketsData.find(m => m.id === id)).filter(Boolean)
    : []

  return (
    <div className="card h-100 card-custom">
      <div className="card-img-wrap" style={{ position: 'relative' }}>
        <img src={produce.image} alt={produce.name} className="produce-card-img" />
        <button
          onClick={handleSave}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark this item'}
          className="bookmark-btn-card"
        >
          {saved ? '★' : '☆'}
        </button>
        <span className="season-badge">{produce.season}</span>
      </div>

      <div className="card-body p-3">
        <h6 style={{ marginBottom: '3px' }}>{produce.name}</h6>
        <span className="produce-category-label">{produce.category}</span>
        <p style={{ fontSize: '13px', color: '#666', margin: '0 0 10px' }}>{produce.description}</p>

        {markets.length > 0 && (
          <div style={{ fontSize: '11px', color: '#555' }}>
            <strong>Available at: </strong>
            {markets.map((m, index) => (
              <span key={m.id}>
                <Link to={`/market/${m.id}`} style={{ color: 'var(--primary-color)', textDecoration: 'underline' }}>
                  {m.name}
                </Link>
                {index < markets.length - 1 ? ', ' : ''}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProduceCard
