import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'

const Login = () => {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  function checkForm() {
    let errs = {}
    let emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

    if (!email) errs.email = 'Email is required'
    else if (!emailOk) errs.email = 'Invalid email format'

    if (!pass) errs.pass = 'Password is required'

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function doLogin(e) {
    e.preventDefault()
    if (checkForm()) {
      navigate('/')
    }
  }

  return (
    <div>
      <PageBanner
        title="Welcome Back"
        subtitle="Log in to FreshFind — a design preview only, your bookmarks already work without an account."
        image="https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600&q=80"
      />
      <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card card-custom p-4 shadow-sm border-0">
            <h2 className="text-center mb-2">Welcome back to FreshFind</h2>
            <p className="text-center text-muted small mb-4">This is a design preview &mdash; your bookmarks already work without an account, saved right in this browser.</p>
            <form onSubmit={doLogin} noValidate>

              <div className="mb-3">
                <label htmlFor="login-email" className="form-label">Email address</label>
                <input
                  id="login-email"
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.pk"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-4">
                <label htmlFor="login-pass" className="form-label">Password</label>
                <input
                  id="login-pass"
                  type="password"
                  className={`form-control ${errors.pass ? 'is-invalid' : ''}`}
                  value={pass}
                  onChange={e => setPass(e.target.value)}
                  placeholder="Enter your password"
                />
                {errors.pass && <div className="invalid-feedback">{errors.pass}</div>}
              </div>

              <button type="submit" className="btn btn-custom w-100 mb-3">Login</button>

              <div className="text-center mt-3">
                <p className="text-muted mb-0">
                  Don't have an account? <Link to="/signup" className="text-primary-custom fw-bold">Sign up</Link>
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

export default Login
