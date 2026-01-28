import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './DashboardProject.css'

const TECH_TAGS = ['React', 'Firebase', 'Material-UI', 'Real-time']
const DEMO_URL = '/'
const GITHUB_URL = 'https://github.com/Natalia-dev-rgb'

function SocialMediaProject() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showFloatingBtn, setShowFloatingBtn] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowFloatingBtn(window.scrollY > 300)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="dash-page">
      <header className="dash-header">
        <div className="dash-header-inner">
          <Link to="/" className="dash-logo">
            Portfolio
          </Link>
          <button
            type="button"
            className={`dash-menu-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <nav className={`dash-nav ${menuOpen ? 'open' : ''}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Inicio</Link>
          <Link to="/#about" onClick={() => setMenuOpen(false)}>Sobre mí</Link>
          <Link to="/#projects" onClick={() => setMenuOpen(false)}>Proyectos</Link>
          <Link to="/#contact" onClick={() => setMenuOpen(false)}>Contacto</Link>
        </nav>
      </header>

      <section className="dash-hero">
        <div className="dash-hero-bg" aria-hidden="true" />
        <div className="dash-hero-stars" aria-hidden="true" />
        <div className="dash-hero-content">
          <div className="dash-hero-icon dash-hero-icon-chat" aria-hidden="true">
            <svg viewBox="0 0 64 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8 4h48a4 4 0 0 1 4 4v28a4 4 0 0 1-4 4H20l-8 8V8a4 4 0 0 1 4-4z"
                fill="#fff"
                stroke="#1f2937"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="22" cy="24" r="2.5" fill="#1f2937" />
              <circle cx="32" cy="24" r="2.5" fill="#1f2937" />
              <circle cx="42" cy="24" r="2.5" fill="#1f2937" />
            </svg>
          </div>
          <h1 className="dash-hero-title">Social Media App</h1>
          <p className="dash-hero-desc">
            Aplicación de redes sociales con autenticación, feed en tiempo real y sistema de mensajería.
          </p>
          <div className="dash-hero-tags">
            {TECH_TAGS.map((tag) => (
              <span key={tag} className="dash-tag">{tag}</span>
            ))}
          </div>
          <div className="dash-hero-buttons">
            <Link to={DEMO_URL} className="dash-btn-primary">
              Ver Demo
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="dash-btn-secondary"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      <button
        type="button"
        className={`dash-floating-btn ${showFloatingBtn ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  )
}

export default SocialMediaProject
