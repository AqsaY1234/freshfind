import React from 'react'

function PageBanner({ title, subtitle, image }) {
  return (
    <div className="page-banner" style={{ backgroundImage: `url("${image}")` }}>
      <div className="page-banner-overlay">
        <div className="container">
          <h1 className="page-banner-title">{title}</h1>
          {subtitle && <p className="page-banner-subtitle">{subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

export default PageBanner
