import React from 'react'
import { Link, NavLink } from 'react-router-dom'

function Topbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top ff-navbar">
      <div className="container">

        <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/assets/images/logo-ezremove.png" alt="FreshFind Logo" style={{ height: '70px', transform: 'scale(1.2)', transformOrigin: 'left center' }} />
        </Link>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#myNav"
          aria-controls="myNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="myNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink to="/" className="nav-link">Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/markets" className="nav-link">Market Directory</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/produce" className="nav-link">Produce Guide</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/bookmarks" className="nav-link">Bookmarks</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">About</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/contact" className="nav-link">Contact</NavLink>
            </li>
          </ul>

          <div style={{ display: 'flex', gap: '8px' }}>
            <Link to="/login" className="btn" style={{ color: 'rgba(255,255,255,0.95)', border: '1px solid rgba(255,255,255,0.55)', borderRadius: '10px' }}>Login</Link>
            <Link to="/signup" className="btn fw-bold btn-shine" style={{ backgroundColor: '#F9A825', color: '#1B5E20', borderRadius: '10px', border: 'none' }}>Sign Up</Link>
          </div>
        </div>

      </div>
    </nav>
  )
}

export default Topbar
