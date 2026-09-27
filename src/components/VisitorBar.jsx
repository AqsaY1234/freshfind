import React, { useEffect, useState } from 'react'

function VisitorBar() {
  const [visitors, setVisitors] = useState(0)

  useEffect(() => {
    const count = parseInt(localStorage.getItem('ff_visitor_count') || '0', 10) + 1
    localStorage.setItem('ff_visitor_count', count)
    setVisitors(count)
  }, [])

  return (
    <div className="visitor-bar">
      <span>👀 Site Visitors: <strong>{visitors}</strong></span>
    </div>
  )
}

export default VisitorBar
