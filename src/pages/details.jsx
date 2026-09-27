import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import marketsData from '../data/m_data.json'
import produceData from '../data/p_data.json'
import { toggleBookmark, isBookmarked, isMarketOpen } from '../utils'
import ShareLinks from '../components/ShareLinks'


function Details() {
  const { id } = useParams()
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
  const [market, setMarket] = useState(null)
  const [produce, setProduce] = useState([])
  const [saved, setSaved] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const found = marketsData.find(m => m.id === parseInt(id))
    if (found) {
      setMarket(found)
      setProduce(produceData.filter(p => p.marketsAvailable.includes(found.id)))
      setSaved(isBookmarked('marketBookmarks', found.id))
      setOpen(isMarketOpen(found))
    }
  }, [id])

  function handleSave() {
    let isSaved = toggleBookmark('marketBookmarks', { id: market.id, name: market.name })
    setSaved(isSaved)
  }

  function handleShare() {
    if (navigator.share) {
      navigator.share({ title: market.name, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link copied!')
    }
  }

  if (!market) {
    return (
      <div className="container text-center" style={{ padding: '60px 20px' }}>
        <h3>Market not found</h3>
        <Link to="/markets" className="btn btn-custom mt-3">Back to Markets</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '25px', paddingBottom: '40px' }}>

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to="/markets">Markets</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{market.name}</li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-8" style={{ marginBottom: '25px' }}>
          <img
            src={market.image}
            alt={market.name}
            style={{ width: '100%', height: '380px', objectFit: 'cover', borderRadius: '6px' }}
          />

          <div style={{ marginTop: '20px' }}>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-2">
              <h2 style={{ margin: 0 }}>{market.name}</h2>
              <div className="d-flex gap-2">
                <button
                  onClick={handleShare}
                  className="btn btn-outline-secondary btn-sm"
                >
                  Copy link
                </button>
                <button
                  onClick={handleSave}
                  className={saved ? 'btn btn-custom' : 'btn btn-outline-custom'}
                >
                  {saved ? '★ Bookmarked' : '☆ Bookmark'}
                </button>
              </div>
            </div>
            <div className="mb-3">
              <ShareLinks title={`Visit ${market.name} on FreshFind`} path={`/market/${market.id}`} />
            </div>

            <div style={{ marginBottom: '15px' }}>
              <span className={open ? 'status-open status-badge' : 'status-closed status-badge'} style={{ marginRight: '10px' }}>
                {open ? 'Open Now' : 'Closed'}
              </span>
              <span style={{ color: '#888', fontSize: '13px' }}>📍 {market.area}</span>
            </div>

            <h5>About this Market</h5>
            <p>{market.description}</p>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="info-panel" style={{ marginBottom: '15px' }}>
            <h5 style={{ marginBottom: '15px' }}>Details</h5>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}><strong>Address:</strong><br />{market.address}</p>
            <hr />
            <h6 style={{ marginBottom: '10px' }}>Weekly Schedule</h6>
            <table className="table table-sm" style={{ fontSize: '14px' }}>
              <tbody>
                {days.map(d => (
                  <tr key={d}>
                    <td>{d}</td>
                    <td style={{ textAlign: 'right' }}>
                      {market.operatingDays.includes(d)
                        ? `${market.openingHours} - ${market.closingHours}`
                        : <span style={{ color: '#999' }}>Closed</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ border: '1px solid #ddd', borderRadius: '6px', overflow: 'hidden', height: '250px' }}>
            <iframe
              title={`Map for ${market.name}`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${market.lat},${market.lng}&output=embed`}
            />
          </div>
        </div>
      </div>

      {produce.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h4 style={{ marginBottom: '20px' }}>Available Produce</h4>
          <div className="row g-3">
            {produce.map(p => (
              <div className="col-md-3 col-sm-6" key={p.id}>
                <div style={{ background: 'white', border: '1px solid #ddd', borderRadius: '6px', padding: '15px', textAlign: 'center' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100px', objectFit: 'cover', borderRadius: '4px', marginBottom: '8px' }} />
                  <h6 style={{ margin: 0 }}><Link to="/produce">{p.name}</Link></h6>
                  <small style={{ color: '#888', display: 'block', marginBottom: '6px' }}>{p.category} · {p.season}</small>
                  <p style={{ fontSize: '12px', color: '#666', margin: 0 }}>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

export default Details
