import React from 'react'
import { Link } from 'react-router-dom'

function Bottom() {
  return (
    <footer style={{background:'#1a1a1a', color:'#f0f0f0', padding:'40px 0 15px'}}>
      <div className="container">
        <div className="row">

          <div className="col-md-5 mb-4">
            <h5 style={{color:'white'}}>FreshFind</h5>
            <p className="footer-text">
              A directory of Karachi's farmers markets &mdash; real hours, what's in season this
              week, and a shortlist you can save without an account.
            </p>
            <p className="footer-text" style={{color:'#F9A825', fontSize:'13px', marginTop:'10px'}}>
              🍓 In season right now: strawberries, basil &amp; honey
            </p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="footer-heading">Find Something</h5>
            <ul className="footer-list">
              <li><Link to="/markets" className="footer-link">Market Directory</Link></li>
              <li><Link to="/produce" className="footer-link">Produce Guide</Link></li>
              <li><Link to="/bookmarks" className="footer-link">Your Bookmarks</Link></li>
              <li><Link to="/about" className="footer-link">About This Project</Link></li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="footer-heading">Reach Us</h5>
            <p className="footer-text" style={{marginBottom:'5px'}}>support@freshfind.pk</p>
            <p className="footer-text" style={{marginBottom:'5px'}}>+92 300 1234567</p>
            <p className="footer-text" style={{marginBottom:'10px'}}>Mon&ndash;Fri, 9am&ndash;5pm</p>
            <Link to="/contact" className="footer-link">Send us a message &rarr;</Link>
          </div>

        </div>

        <hr style={{borderColor:'#444'}} />
        <p style={{textAlign:'center', color:'#888', fontSize:'13px', margin:0}}>
          &copy; {new Date().getFullYear()} FreshFind &middot; Fresh All Along
        </p>
      </div>
    </footer>
  )
}

export default Bottom
