import { Link } from 'react-router-dom'
import './EcommerceProject.css'

// Reusable: section title
function SectionTitle({ children }) {
  return (
    <h2 className="ecom-section-title">
      {children}
    </h2>
  )
}

// Reusable: feature card with icon
function FeatureCard({ icon, title, description }) {
  return (
    <article className="ecom-feature-card">
      <div className="ecom-feature-icon">{icon}</div>
      <h3 className="ecom-feature-title">{title}</h3>
      <p className="ecom-feature-desc">{description}</p>
    </article>
  )
}

// Reusable: technology badge
function TechBadge({ name }) {
  return (
    <span className="ecom-tech-badge">{name}</span>
  )
}

// Reusable: primary/secondary buttons
function ActionButton({ primary, href, children }) {
  const className = primary ? 'ecom-btn ecom-btn-primary' : 'ecom-btn ecom-btn-secondary'
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
  )
}

function EcommerceProject() {
  const features = [
    {
      icon: '📦',
      title: 'Product catalog',
      description: 'Browse and filter products with categories and search.',
    },
    {
      icon: '🛒',
      title: 'Shopping cart',
      description: 'Add items, update quantities, and see totals in real time.',
    },
    {
      icon: '💳',
      title: 'Secure checkout with Stripe',
      description: 'Safe payments powered by Stripe integration.',
    },
    {
      icon: '📊',
      title: 'Admin dashboard',
      description: 'Manage products, orders, and users from one panel.',
    },
    {
      icon: '📋',
      title: 'Order management',
      description: 'Track and fulfill orders with status updates.',
    },
    {
      icon: '📱',
      title: 'Responsive design',
      description: 'Works on desktop, tablet, and mobile devices.',
    },
  ]

  const technologies = ['React', 'Node.js', 'MongoDB', 'Stripe']

  // Placeholder URLs – replace with your real links
  const liveDemoUrl = '#'
  const githubUrl = 'https://github.com/Natalia-dev-rgb'

  return (
    <div className="ecom-project">
      <nav className="ecom-back-nav">
        <Link to="/" className="ecom-back-link">
          ← Back to portfolio
        </Link>
      </nav>
      {/* 1. HERO SECTION */}
      <section className="ecom-hero">
        <div className="ecom-hero-bg" aria-hidden="true" />
        <div className="ecom-hero-content">
          <div className="ecom-hero-text">
            <h1 className="ecom-hero-title">E-commerce Platform</h1>
            <p className="ecom-hero-subtitle">
              Full-featured e-commerce platform with cart, payment gateway, and admin dashboard.
            </p>
          </div>
          <div className="ecom-hero-image">
            <div className="ecom-hero-illustration" aria-hidden="true">
              <span className="ecom-hero-emoji">🛒</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DESCRIPTION */}
      <section className="ecom-section ecom-description">
        <div className="ecom-container">
          <SectionTitle>About the project</SectionTitle>
          <p className="ecom-description-text">
            This is a complete e-commerce platform where users can browse a product catalog,
            add items to the cart, and complete purchases through a secure checkout. The project
            includes an admin dashboard to manage products, orders, and inventory. It is built
            with modern tools and follows best practices for performance and security.
          </p>
        </div>
      </section>

      {/* 3. FEATURES */}
      <section className="ecom-section ecom-features">
        <div className="ecom-container">
          <SectionTitle>Features</SectionTitle>
          <div className="ecom-features-grid">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGIES */}
      <section className="ecom-section ecom-tech">
        <div className="ecom-container">
          <SectionTitle>Technologies used</SectionTitle>
          <div className="ecom-tech-list">
            {technologies.map((tech) => (
              <TechBadge key={tech} name={tech} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. GALLERY / SCREENSHOTS */}
      <section className="ecom-section ecom-gallery">
        <div className="ecom-container">
          <SectionTitle>Screenshots</SectionTitle>
          <div className="ecom-gallery-grid">
            <div className="ecom-gallery-placeholder">
              <span>Add screenshot 1</span>
            </div>
            <div className="ecom-gallery-placeholder">
              <span>Add screenshot 2</span>
            </div>
            <div className="ecom-gallery-placeholder">
              <span>Add screenshot 3</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ACTION BUTTONS */}
      <section className="ecom-section ecom-actions">
        <div className="ecom-container">
          <div className="ecom-actions-buttons">
            <ActionButton primary href={liveDemoUrl}>
              Live demo
            </ActionButton>
            <ActionButton href={githubUrl}>
              View code on GitHub
            </ActionButton>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EcommerceProject
