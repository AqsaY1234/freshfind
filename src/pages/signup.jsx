import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [pass2, setPass2] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function checkForm() {
    let errs = {}

    if (!name) errs.name = 'Full Name is required'
    else if (!/^[a-zA-Z\s]+$/.test(name)) errs.name = 'Name can only contain letters and spaces'

    if (!email) errs.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Invalid email format'

    if (!pass) errs.pass = 'Password is required'
    else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(pass)) errs.pass = 'At least 8 characters, one letter and one number'

    if (!pass2) errs.pass2 = 'Please confirm your password'
    else if (pass !== pass2) errs.pass2 = 'Passwords do not match'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function doSignup(e) {
    e.preventDefault()
    if (checkForm()) {
      navigate('/login')
    }
  }

  return (
    <div>
      <PageBanner
        title="Join FreshFind"
        subtitle="A design preview only — bookmarking and notes already work without signing up."
        image="https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=1600&q=80"
      />
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card card-custom p-4 shadow-sm border-0">
            <h2 className="text-center mb-2">Join FreshFind</h2>
            <p className="text-center text-muted small mb-4">Design preview only &mdash; nothing here is sent to a server. Bookmarking and notes already work without signing up.</p>
            <form onSubmit={doSignup} noValidate>

              <div className="mb-3">
                <label htmlFor="signup-name" className="form-label">Full Name</label>
                <input
                  id="signup-name"
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Ali Khan"
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="signup-email" className="form-label">Email address</label>
                <input
                  id="signup-email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.pk"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="signup-pass" className="form-label">Password</label>
                <input
                  id="signup-pass"
                  type="password"
                  className={`form-control ${errors.pass ? 'is-invalid' : ''}`}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="Min 8 chars, 1 letter, 1 number"
                />
                {errors.pass && <div className="invalid-feedback">{errors.pass}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="signup-confirm" className="form-label">Confirm Password</label>
                <input
                  id="signup-confirm"
                  type="password"
                  className={`form-control ${errors.pass2 ? 'is-invalid' : ''}`}
                  value={pass2}
                  onChange={e => setPass2(e.target.value)}
                  placeholder="Re-type your password"
                />
                {errors.pass2 && <div className="invalid-feedback">{errors.pass2}</div>}
              </div>

              <button type="submit" className="btn btn-custom w-100 mb-3">Sign Up</button>

              <div className="text-center mt-3">
                <p className="text-muted mb-0">
                  Already have an account? <Link to="/login" className="text-primary-custom fw-bold">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Signup
