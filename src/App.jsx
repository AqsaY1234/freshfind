import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import VisitorBar from './components/VisitorBar'
import Topbar from './components/Topbar'
import Bottom from './components/Bottom'
import MainPage from './pages/MainPage'
import MarketsList from './pages/MarketsList'
import Details from './pages/Details'
import Items from './pages/Items'
import Bookmarks from './pages/Bookmarks'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Bot from './components/Bot'

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    const timer = setTimeout(() => {
      if (window.AOS) window.AOS.refreshHard()
    }, 80)
    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <div key={location.pathname} className="page-enter">
      <Routes location={location}>
        <Route path="/" element={<MainPage />} />
        <Route path="/markets" element={<MarketsList />} />
        <Route path="/market/:id" element={<Details />} />
        <Route path="/produce" element={<Items />} />
        <Route path="/bookmarks" element={<Bookmarks />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  )
}

function App() {
  useEffect(() => {
    if (window.AOS) {
      window.AOS.init({ duration: 700, once: true, easing: 'ease-out-cubic', offset: 40 })
    }
  }, [])
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <VisitorBar />
      <Topbar />
      <main id="main-content">
        <AnimatedRoutes />
      </main>
      <Bottom />
      <Bot />
    </BrowserRouter>
  )
}

export default App
