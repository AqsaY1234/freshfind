import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const ContactUs = () => {
  const [sent, setSent] = useState(false)
  const [coords, setCoords] = useState(null)
  const [noLocation, setNoLocation] = useState(false)

  useEffect(() => {
    if (!navigator.geolocation) {
      setNoLocation(true)
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      () => setNoLocation(true)
    )
  }, [])

  function submitForm(e) {
    e.preventDefault()
    setSent(true)
    setTimeout(() => {
      setSent(false)
      e.target.reset()
    }, 4000)
  }

  return (
    <div>
      <PageBanner
        title="Contact Us"
        subtitle="Have questions or want to feature your market? We'd love to hear from you."
        image="https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=1600&q=80"
      />
      <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Contact Us</li>
        </ol>
      </nav>

      <div className="row g-5">
        <div className="col-lg-5" data-aos="fade-up">
          <div className="card card-custom p-4 h-100 bg-light border-0">
            <h3 className="mb-4">Get in Touch</h3>

            <div className="mb-4">
              <h5>Office Location</h5>
              <p className="text-muted mb-0">Block 4, Clifton<br/>Karachi, Pakistan 75600</p>
            </div>

            <div className="mb-4">
              <h5>Email Us</h5>
              <p className="text-muted mb-0">support@freshfind.pk<br/>partnerships@freshfind.pk</p>
            </div>

            <div className="mb-4">
              <h5>Call Us</h5>
              <p className="text-muted mb-0">+92 300 1234567<br/>Mon-Fri, 9am - 5pm</p>
            </div>

            <hr className="my-4"/>
            <h5 className="mb-3">Your Live Location</h5>
            {coords ? (
              <div style={{borderRadius:'6px', overflow:'hidden', height:'200px'}}>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&output=embed`}>
                </iframe>
              </div>
            ) : noLocation ? (
              <p className="text-muted small">Location unavailable. You can still reach us using the details above.</p>
            ) : (
              <p className="text-muted small">Requesting location...</p>
            )}
          </div>
        </div>

        <div className="col-lg-7" data-aos="fade-up">
          <div className="card card-custom p-4 p-md-5 h-100 border-0 shadow-sm">
            <h3 className="mb-4">Send a Message</h3>

            {sent ? (
              <div className="alert alert-success" role="alert">
                <strong>Thanks!</strong> Your message has been recorded for this demo.
              </div>
            ) : (
              <form onSubmit={submitForm}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" placeholder="e.g. Ali Khan" required />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input type="email" className="form-control" id="email" placeholder="e.g. ali@example.pk" required />
                  </div>
                  <div className="col-12">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <select className="form-select" id="subject" required>
                      <option value="">Choose a subject...</option>
                      <option value="general">General Inquiry</option>
                      <option value="market">Add My Market</option>
                      <option value="support">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control contact-textarea" id="message" rows="5" placeholder="Write your message here..." required></textarea>
                  </div>
                  <div className="col-12 mt-4">
                    <button type="submit" className="btn btn-custom px-4 py-2">
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default ContactUs
