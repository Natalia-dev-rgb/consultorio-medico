import { useState, useEffect } from 'react'
import './Header.css'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <span className="logo-text">Portfolio</span>
        </div>
        <nav className={`nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about') }}>Sobre mí</a>
          <a href="#skills" onClick={(e) => { e.preventDefault(); scrollToSection('skills') }}>Habilidades</a>
          <a href="#projects" onClick={(e) => { e.preventDefault(); scrollToSection('projects') }}>Proyectos</a>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact') }}>Contacto</a>
        </nav>
        <button 
          className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}

export default Header

