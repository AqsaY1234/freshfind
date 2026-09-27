import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isMarketOpen, distanceKm } from '../utils'
import marketsData from '../data/m_data.json'
import produceData from '../data/p_data.json'
import MarketCard from '../components/MarketCard'
import ProduceCard from '../components/ProduceCard'

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

function MainPage() {
  const navigate = useNavigate()
  const [time, setTime] = useState(new Date())
  const [area, setArea] = useState('')
  const [day, setDay] = useState('')
  const [produce, setProduce] = useState('')
  const [featured, setFeatured] = useState([])
  const [nearest, setNearest] = useState(null)
  const [rotate, setRotate] = useState(0)

  const displayPicks = [0, 1, 2, 3].map(i => produceData[(rotate + i) % produceData.length])
  const areas = [...new Set(marketsData.map(m => m.area))]

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    const spin = setInterval(() => setRotate(n => n + 1), 6000)

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const { latitude, longitude } = pos.coords
        const ranked = [...marketsData].sort(
          (a, b) => distanceKm(latitude, longitude, a.lat, a.lng) - distanceKm(latitude, longitude, b.lat, b.lng)
        )
        setNearest({
          market: ranked[0],
          km: distanceKm(latitude, longitude, ranked[0].lat, ranked[0].lng)
        })
      })
    }

    return () => {
      clearInterval(timer)
      clearInterval(spin)
    }
  }, [])

  useEffect(() => {
    const openFirst = [...marketsData].sort((a, b) => {
      const ao = isMarketOpen(a) ? 0 : 1
      const bo = isMarketOpen(b) ? 0 : 1
      return ao - bo
    })
    const start = rotate % openFirst.length
    const trio = [0, 1, 2].map(i => openFirst[(start + i) % openFirst.length])
    setFeatured(trio)
  }, [rotate])

  function handleSearch(e) {
    e.preventDefault()
    let params = new URLSearchParams()
    if (area) params.set('area', area)
    if (day) params.set('day', day)
    if (produce) params.set('produce', produce)
    navigate('/markets?' + params.toString())
  }

  return (
    <div>
      <div className="hero-section text-center" style={{
        background: 'linear-gradient(135deg, #123e18 0%, #1B5E20 45%, #388E3C 100%)',
        padding: '108px 0 128px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'url("https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80")',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18
        }} />
        <div className="hero-blob hero-blob-1" />
        <div className="hero-blob hero-blob-2" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <p className="hero-badge" style={{ color: '#1B5E20', background: '#F9A825', fontWeight: 700, fontSize: '13px', letterSpacing: '2.4px', textTransform: 'uppercase', marginBottom: '18px' }}>
            Fresh From The Farm
          </p>
          <h1 className="fw-bold mb-3 hero-float" style={{ color: '#ffffff', fontSize: 'clamp(2.4rem, 6vw, 3.8rem)', lineHeight: 1.15 }}>
            Fresh Markets,<br />Seasonal Produce
          </h1>
          <p className="lead mx-auto mb-5" style={{ maxWidth: '620px', color: 'rgba(255,255,255,0.88)' }}>
            FreshFind helps you discover nearby farmers markets in seconds — check real opening hours,
            see exactly what produce is in season this week, and bookmark your favorite stalls so you
            never have to guess where to go or what to buy again.
          </p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/markets" className="btn px-4 py-2 fw-bold btn-shine" style={{ background: '#F9A825', color: '#1B5E20', borderRadius: '12px' }}>Find Markets</Link>
            <Link to="/produce" className="btn px-4 py-2 fw-bold" style={{ background: 'rgba(255,255,255,0.08)', color: '#ffffff', border: '2px solid rgba(255,255,255,0.7)', borderRadius: '12px' }}>Explore Produce</Link>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: '-48px', position: 'relative', zIndex: 1 }}>
        <div className="card search-panel border-0 p-4 mb-5" data-aos="fade-up">
          <h4 className="text-center mb-4">Search Market Near You</h4>
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Area</label>
                <select className="form-select" value={area} onChange={e => setArea(e.target.value)}>
                  <option value="">All Areas</option>
                  {areas.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Day</label>
                <select className="form-select" value={day} onChange={e => setDay(e.target.value)}>
                  <option value="">Any Day</option>
                  {DAYS.map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="col-md-4">
                <label className="form-label">Produce</label>
                <select className="form-select" value={produce} onChange={e => setProduce(e.target.value)}>
                  <option value="">Any Produce</option>
                  <option>Vegetables</option><option>Fruits</option><option>Dairy</option>
                  <option>Herbs</option><option>Baked Goods</option><option>Meat</option>
                </select>
              </div>
            </div>
            <div className="text-center mt-4">
              <button type="submit" className="btn btn-custom px-5 btn-shine">Search</button>
            </div>
          </form>
        </div>

        <div className="row g-3 mb-5">
          <div className="col-md-4" data-aos="fade-up">
            <div className="feature-chip text-center">
              <div className="feature-icon">📍</div>
              <h6 className="mb-1">Nearby Markets</h6>
              <p className="text-muted small mb-0">Browse stalls by area, day, and produce type.</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="80">
            <div className="feature-chip text-center">
              <div className="feature-icon">🥬</div>
              <h6 className="mb-1">Seasonal Picks</h6>
              <p className="text-muted small mb-0">See what is fresh this week before you go.</p>
            </div>
          </div>
          <div className="col-md-4" data-aos="fade-up" data-aos-delay="160">
            <div className="feature-chip text-center">
              <div className="feature-icon">⭐</div>
              <h6 className="mb-1">Bookmark Favorites</h6>
              <p className="text-muted small mb-0">Bookmark markets and produce for later.</p>
            </div>
          </div>
        </div>

        <div className="p-4 mb-5 highlights-wrap">
          <h2 className="text-center mb-5" style={{ color: 'var(--primary-color)' }}>Highlights</h2>

          <div className="mb-5">
            <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
              <h3>Featured &amp; Open Markets</h3>
              <Link to="/markets" style={{ color: 'var(--primary-color)', fontWeight: 'bold' }}>View all &rarr;</Link>
            </div>
            {nearest && (
              <p className="mb-3">
                Nearest to you: <Link to={`/market/${nearest.market.id}`}>{nearest.market.name}</Link>
                {' '}({nearest.km.toFixed(1)} km) {isMarketOpen(nearest.market) ? '· Open now' : '· Closed now'}
              </p>
            )}
            <div className="row g-4">
              {featured.map((m, i) => (
                <div className="col-md-4" key={`${m.id}-${i}`}>
                  <MarketCard market={m} />
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded" style={{ background: 'var(--accent-color)' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3>This Week's Seasonal Picks</h3>
              <Link to="/produce" style={{ color: 'var(--text-primary)', fontWeight: 'bold' }}>Full Guide &rarr;</Link>
            </div>
            <div className="row g-4">
              {displayPicks.map((p, i) => (
                <div className="col-md-3" key={`${p.id}-${i}`}>
                  <ProduceCard produce={p} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center p-3 mb-5 rounded stat-bar flex-wrap gap-2">
          <span>Current Time: <strong>{time.toLocaleTimeString()}</strong></span>
        </div>
      </div>
    </div>
  )
}

export default MainPage
