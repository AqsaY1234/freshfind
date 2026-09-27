import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getBookmarks, saveBookmarks, getSessionNote, setSessionNote } from '../utils'
import marketsData from '../data/m_data.json'
import produceData from '../data/p_data.json'
import ShareLinks from '../components/share_links'

const Bookmarks = () => {
  const [savedMarkets, setSavedMarkets] = useState([])
  const [savedProduce, setSavedProduce] = useState([])
  const [notes, setNotes] = useState({})

  useEffect(() => {
    setSavedMarkets(getBookmarks('marketBookmarks'))
    setSavedProduce(getBookmarks('produceBookmarks'))
    const next = {}
    getBookmarks('marketBookmarks').forEach(b => { next[`market:${b.id}`] = getSessionNote('market', b.id) })
    getBookmarks('produceBookmarks').forEach(b => { next[`produce:${b.id}`] = getSessionNote('produce', b.id) })
    setNotes(next)
  }, [])

  function removeMarket(id) {
    let updated = savedMarkets.filter(b => b.id !== id)
    saveBookmarks('marketBookmarks', updated)
    setSavedMarkets(updated)
  }

  function removeProduce(id) {
    let updated = savedProduce.filter(b => b.id !== id)
    saveBookmarks('produceBookmarks', updated)
    setSavedProduce(updated)
  }

  function changeNote(kind, id, note) {
    setSessionNote(kind, id, note)
    setNotes(prev => ({ ...prev, [`${kind}:${id}`]: note }))
  }

  function formattedList() {
    const lines = ['FreshFind Bookmarks', `Generated: ${new Date().toLocaleString()}`, '']
    lines.push('=== MARKETS ===')
    if (!savedMarkets.length) lines.push('None saved.')
    savedMarkets.forEach((item, i) => {
      const extra = marketsData.find(m => m.id === item.id)
      lines.push(`${i + 1}. ${item.name}`)
      if (extra) lines.push(`   ${extra.area} · ${extra.operatingDays.join(', ')} ${extra.openingHours}-${extra.closingHours}`)
      const note = notes[`market:${item.id}`]
      if (note) lines.push(`   Note: ${note}`)
    })
    lines.push('', '=== PRODUCE ===')
    if (!savedProduce.length) lines.push('None saved.')
    savedProduce.forEach((item, i) => {
      const extra = produceData.find(p => p.id === item.id)
      lines.push(`${i + 1}. ${item.name}`)
      if (extra) lines.push(`   ${extra.category} · ${extra.season}`)
      const note = notes[`produce:${item.id}`]
      if (note) lines.push(`   Note: ${note}`)
    })
    return lines.join('\n')
  }

  function exportData() {
    const blob = new Blob([formattedList()], { type: 'text/plain;charset=utf-8' })
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'freshfind_bookmarks.txt'
    document.body.appendChild(a)
    a.click()
    a.remove()
  }

  const shareText = `My FreshFind picks: ${[...savedMarkets, ...savedProduce].map(x => x.name).join(', ') || 'none yet'}`

  return (
    <div className="container py-4">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Bookmarks</li>
        </ol>
      </nav>

      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
        <h1 className="mb-0">Your Bookmarks</h1>
        <button
          className="btn btn-outline-secondary"
          onClick={exportData}
          disabled={savedMarkets.length === 0 && savedProduce.length === 0}
        >
          Export list
        </button>
      </div>

      <p className="text-muted mb-2">Bookmarks stay on this device. Personal notes last for this browser session only.</p>
      <div className="mb-4">
        <ShareLinks title={shareText} path="/bookmarks" />
      </div>

      <div className="row">
        <div className="col-lg-6 mb-5">
          <h3 className="mb-4 border-bottom pb-2">Saved Markets ({savedMarkets.length})</h3>
          {savedMarkets.length === 0 ? (
            <div className="text-muted p-4 text-center bg-light rounded">No saved markets.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {savedMarkets.map(item => (
                <div key={item.id} className="card card-custom p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0">
                      <Link to={`/market/${item.id}`}>{item.name}</Link>
                    </h5>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Remove ${item.name} from bookmarks`}
                      onClick={() => removeMarket(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <ShareLinks title={`Visit ${item.name} on FreshFind`} path={`/market/${item.id}`} />
                  <div className="mt-2">
                    <label className="form-label small text-muted">Personal note (this session)</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Add a note (e.g., Buy honey here)"
                      value={notes[`market:${item.id}`] || ''}
                      onChange={e => changeNote('market', item.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="col-lg-6 mb-5">
          <h3 className="mb-4 border-bottom pb-2">Saved Produce ({savedProduce.length})</h3>
          {savedProduce.length === 0 ? (
            <div className="text-muted p-4 text-center bg-light rounded">No saved produce.</div>
          ) : (
            <div className="d-flex flex-column gap-3">
              {savedProduce.map(item => (
                <div key={item.id} className="card card-custom p-3">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="mb-0"><Link to="/produce">{item.name}</Link></h5>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      aria-label={`Remove ${item.name} from bookmarks`}
                      onClick={() => removeProduce(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                  <ShareLinks title={`FreshFind produce: ${item.name}`} path="/produce" />
                  <div className="mt-2">
                    <label className="form-label small text-muted">Personal note (this session)</label>
                    <textarea
                      className="form-control form-control-sm"
                      rows="2"
                      placeholder="Add a note (e.g., Good for salads)"
                      value={notes[`produce:${item.id}`] || ''}
                      onChange={e => changeNote('produce', item.id, e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Bookmarks
