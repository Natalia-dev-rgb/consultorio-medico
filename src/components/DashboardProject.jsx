import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './DashboardProject.css'

const TECH_TAGS = ['React', 'TypeScript', 'Chart.js', 'API']
const GITHUB_URL = 'https://github.com/Natalia-dev-rgb'

function DashboardProject() {
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
      {/* Header: logo "Portfolio" (azul/morado) + menú hamburguesa a la derecha */}
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

      {/* Sección proyecto: degradado, estrellas, icono, título, descripción, tags, botones */}
      <section className="dash-hero">
        <div className="dash-hero-bg" aria-hidden="true" />
        <div className="dash-hero-stars" aria-hidden="true" />
        <div className="dash-hero-content">
          <div className="dash-hero-icon" aria-hidden="true">
            <svg viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="35" width="14" height="25" rx="3" fill="#22c55e" />
              <rect x="33" y="15" width="14" height="45" rx="3" fill="#ef4444" />
              <rect x="56" y="25" width="14" height="35" rx="3" fill="#3b82f6" />
            </svg>
          </div>
          <h1 className="dash-hero-title">Dashboard Analytics</h1>
          <p className="dash-hero-desc">
            Dashboard interactivo con visualizaciones de datos en tiempo real usando gráficos y métricas avanzadas.
          </p>
          <div className="dash-hero-tags">
            {TECH_TAGS.map((tag) => (
              <span key={tag} className="dash-tag">{tag}</span>
            ))}
          </div>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="dash-btn-primary"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Botón flotante: circular violeta, flecha arriba */}
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

export default DashboardProject
