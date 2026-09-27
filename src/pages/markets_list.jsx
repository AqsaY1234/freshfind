import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import marketsData from '../data/m_data.json'
import MarketCard from '../components/m_card'
import { distanceKm, daysUntilNextOpen } from '../utils'

function MarketsList() {
  const location = useLocation()
  const [markets, setMarkets] = useState(marketsData)
  const [search, setSearch] = useState('')
  const [area, setArea] = useState('')
  const [day, setDay] = useState('')
  const [produce, setProduce] = useState('')
  const [sort, setSort] = useState('az')
  const [coords, setCoords] = useState(null)
  const [geoNote, setGeoNote] = useState('')

  useEffect(() => {
    const p = new URLSearchParams(location.search)
    if (p.get('area')) setArea(p.get('area'))
    if (p.get('day')) setDay(p.get('day'))
    if (p.get('produce')) setProduce(p.get('produce'))
  }, [location])

  useEffect(() => {
    if (sort !== 'nearby' || coords) return
    if (!navigator.geolocation) {
      setGeoNote('Geolocation is not available. Sorting alphabetically instead.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setGeoNote('Location permission denied. Allow location to sort by proximity.')
    )
  }, [sort, coords])

  useEffect(() => {
    let result = [...marketsData]
    if (search) result = result.filter(m => m.name.toLowerCase().includes(search.toLowerCase()))
    if (area) result = result.filter(m => m.area === area)
    if (day) result = result.filter(m => m.operatingDays.includes(day))
    if (produce) result = result.filter(m => m.produceTypes.includes(produce))
    if (sort === 'az') result.sort((a, b) => a.name.localeCompare(b.name))
    if (sort === 'area') result.sort((a, b) => a.area.localeCompare(b.area))
    if (sort === 'next') result.sort((a, b) => daysUntilNextOpen(a) - daysUntilNextOpen(b))
    if (sort === 'nearby' && coords) {
      result.sort((a, b) =>
        distanceKm(coords.lat, coords.lng, a.lat, a.lng) - distanceKm(coords.lat, coords.lng, b.lat, b.lng)
      )
    }
    setMarkets(result)
  }, [search, area, day, produce, sort, coords])

  const allAreas = [...new Set(marketsData.map(m => m.area))]
  const allProduce = [...new Set(marketsData.flatMap(m => m.produceTypes))]

  function reset() {
    setSearch(''); setArea(''); setDay(''); setProduce(''); setSort('az'); setGeoNote('')
  }

  return (
    <div className="container" style={{ paddingTop: '25px', paddingBottom: '40px' }}>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Markets</li>
        </ol>
      </nav>

      <h2 style={{ marginBottom: '25px' }}>Market Directory</h2>

      <div className="row">
        <div className="col-lg-3" style={{ marginBottom: '20px' }}>
          <div className="info-panel">
            <h5 style={{ marginBottom: '15px' }}>Filter</h5>

            <div className="filter-field">
              <label className="filter-label" htmlFor="market-search">Search</label>
              <input id="market-search" type="text" className="form-control form-control-sm"
                placeholder="Market name..." value={search}
                onChange={e => setSearch(e.target.value)} />
            </div>

            <div className="filter-field">
              <label className="filter-label" htmlFor="market-area">Area</label>
              <select id="market-area" className="form-select form-select-sm" value={area} onChange={e => setArea(e.target.value)}>
                <option value="">All</option>
                {allAreas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="filter-field">
              <label className="filter-label" htmlFor="market-day">Day</label>
              <select id="market-day" className="form-select form-select-sm" value={day} onChange={e => setDay(e.target.value)}>
                <option value="">Any</option>
                <option>Monday</option><option>Tuesday</option><option>Wednesday</option>
                <option>Thursday</option><option>Friday</option><option>Saturday</option><option>Sunday</option>
              </select>
            </div>

            <div className="filter-field">
              <label className="filter-label" htmlFor="market-produce">Produce</label>
              <select id="market-produce" className="form-select form-select-sm" value={produce} onChange={e => setProduce(e.target.value)}>
                <option value="">Any</option>
                {allProduce.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div style={{ marginBottom: '15px' }}>
              <label className="filter-label" htmlFor="market-sort">Sort</label>
              <select id="market-sort" className="form-select form-select-sm" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="az">A to Z</option>
                <option value="area">By Area</option>
                <option value="next">Next open day</option>
                <option value="nearby">Nearest (uses location)</option>
              </select>
            </div>
            {geoNote && <p className="small text-muted">{geoNote}</p>}

            <button className="btn btn-sm btn-outline-secondary w-100" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="col-lg-9">
          <p style={{ color: '#888', fontSize: '14px', marginBottom: '15px' }}>
            {markets.length} market{markets.length !== 1 ? 's' : ''} found
            {sort === 'nearby' && coords ? ' · sorted by distance' : ''}
          </p>

          {markets.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#aaa' }}>
              <p style={{ fontSize: '2rem' }}>🔍</p>
              <h4>No markets found</h4>
              <p>Try changing your filters.</p>
            </div>
          ) : (
            <div className="row g-4">
              {markets.map(m => (
                <div className="col-md-6 col-xl-4" key={m.id} data-aos="fade-up">
                  <MarketCard market={m} />
                  {sort === 'nearby' && coords && (
                    <p className="small text-muted mt-1 mb-0">
                      {distanceKm(coords.lat, coords.lng, m.lat, m.lng).toFixed(1)} km away
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarketsList
