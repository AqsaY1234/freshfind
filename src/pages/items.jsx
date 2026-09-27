import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import produceData from '../data/p_data.json'
import ProduceCard from '../components/ProduceCard'
import PageBanner from '../components/PageBanner'

function Items() {

  const [list, setList] = useState(produceData)
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('')

  const categories = [...new Set(produceData.map(p => p.category))]

  useEffect(() => {
    let result = [...produceData]
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
    if (cat) result = result.filter(p => p.category === cat)
    setList(result)
  }, [search, cat])

  return (
    <div>
      <PageBanner
        title="Produce Guide"
        subtitle="Browse what's fresh and in season at local markets right now."
        image="https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=1600&q=80"
      />
      <div className="container" style={{paddingTop:'25px', paddingBottom:'40px'}}>

      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Produce Guide</li>
        </ol>
      </nav>

      <div className="info-panel" style={{marginBottom:'25px'}}>
        <div className="row g-3">
          <div className="col-md-6">
            <input type="text" className="form-control"
              placeholder="Search produce..." value={search}
              onChange={e => setSearch(e.target.value)} />
          </div>
          <div className="col-md-6">
            <select className="form-select" value={cat} onChange={e => setCat(e.target.value)}>
              <option value="">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <p style={{color:'#888', fontSize:'14px', marginBottom:'15px'}}>
        {list.length} item{list.length !== 1 ? 's' : ''} found
      </p>

      {list.length === 0 ? (
        <div style={{textAlign:'center', padding:'60px', color:'#aaa'}}>
          <p style={{fontSize:'2rem'}}>🔍</p>
          <h4>Nothing found</h4>
          <p>Try a different search or category.</p>
        </div>
      ) : (
        <div className="row g-4">
          {list.map(p => (
            <div className="col-md-4 col-lg-3" key={p.id} data-aos="fade-up">
              <ProduceCard produce={p} />
            </div>
          ))}
        </div>
      )}

    </div>
    </div>
  )
}

export default Items
