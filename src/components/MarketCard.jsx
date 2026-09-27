import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toggleBookmark, isBookmarked, isMarketOpen } from '../utils'

function MarketCard({ market }) {
  const [saved, setSaved] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked('marketBookmarks', market.id))
    setOpen(isMarketOpen(market))


    const timer = setInterval(() => setOpen(isMarketOpen(market)), 60000)
    return () => clearInterval(timer)
  }, [market])

  function handleSave(e) {
    e.preventDefault()
    let isSaved = toggleBookmark('marketBookmarks', { id: market.id, name: market.name })
    setSaved(isSaved)
  }

  return (
    <div className="card h-100 card-custom">
      <div className="card-img-wrap" style={{ position: 'relative' }}>
        <img src={market.image} alt={market.name} className="card-img-custom" />
        <button
          onClick={handleSave}
          aria-label={saved ? 'Remove bookmark' : 'Bookmark this market'}
          className="bookmark-btn-card"
        >
          {saved ? '★' : '☆'}
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{market.name}</h5>
        <p className="text-muted" style={{ fontSize: '13px' }}>📍 {market.area}</p>

        <div className="mb-2">
          <span className={open ? 'status-open status-badge' : 'status-closed status-badge'}>
            {open ? 'Open Now' : 'Closed'}
          </span>
          <span style={{ fontSize: '12px', color: '#888', marginLeft: '8px' }}>
            {market.operatingDays.join(', ')} · {market.openingHours}–{market.closingHours}
          </span>
        </div>

        <p className="card-text" style={{ fontSize: '13px' }}>
          {market.description.substring(0, 100)}...
        </p>

        {market.produceTypes && market.produceTypes.length > 0 && (
          <div className="mb-2" style={{ flexGrow: 1 }}>
            <span style={{ fontSize: '11px', color: '#888', display: 'block', marginBottom: '4px' }}>
              Produce available:
            </span>
            <div className="d-flex flex-wrap gap-1">
              {market.produceTypes.map(pt => (
                <span key={pt} className="produce-category-label" style={{ marginBottom: 0 }}>{pt}</span>
              ))}
            </div>
          </div>
        )}

        <Link to={`/market/${market.id}`} className="btn btn-outline-custom w-100 mt-2">
          View Details
        </Link>
      </div>
    </div>
  )
}

export default MarketCard
