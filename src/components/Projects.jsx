import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Projects.css'

function Projects() {
  const [filter, setFilter] = useState('all')

  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Plataforma de comercio electrónico completa con carrito de compras, pasarela de pago y panel de administración.',
      image: '🛒',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      category: 'fullstack',
      link: '/project/ecommerce',
      github: 'https://github.com/Natalia-dev-rgb'
    },
    {
      id: 2,
      title: 'Dashboard Analytics',
      description: 'Dashboard interactivo con visualizaciones de datos en tiempo real usando gráficos y métricas avanzadas.',
      image: '📊',
      tags: ['React', 'TypeScript', 'Chart.js', 'API'],
      category: 'frontend',
      link: '/project/dashboard',
      github: 'https://github.com/Natalia-dev-rgb'
    },
    {
      id: 3,
      title: 'Social Media App',
      description: 'Aplicación de redes sociales con autenticación, feed en tiempo real y sistema de mensajería.',
      image: '💬',
      tags: ['React', 'Firebase', 'Material-UI', 'Real-time'],
      category: 'fullstack',
      link: '#',
      github: '#'
    },
    {
      id: 4,
      title: 'Task Management',
      description: 'Aplicación de gestión de tareas con drag & drop, filtros avanzados y colaboración en equipo.',
      image: '✅',
      tags: ['React', 'Redux', 'LocalStorage', 'CSS3'],
      category: 'frontend',
      link: '#',
      github: '#'
    },
    {
      id: 5,
      title: 'Weather App',
      description: 'Aplicación del clima con pronóstico extendido, mapas interactivos y notificaciones push.',
      image: '🌤️',
      tags: ['React', 'API', 'Geolocation', 'PWA'],
      category: 'frontend',
      link: '#',
      github: '#'
    },
    {
      id: 6,
      title: 'Blog Platform',
      description: 'Plataforma de blog moderna con CMS, sistema de comentarios y optimización SEO.',
      image: '📝',
      tags: ['Next.js', 'MDX', 'SEO', 'SSR'],
      category: 'fullstack',
      link: '#',
      github: '#'
    }
  ]

  const categories = [
    { id: 'all', name: 'Todos' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'fullstack', name: 'Full Stack' }
  ]

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter)

  return (
    <section id="projects" className="projects">
      <div className="container">
        <h2 className="section-title">Proyectos</h2>
        <p className="section-subtitle">
          Algunos de mis trabajos más destacados que demuestran mis habilidades y experiencia
        </p>
        
        <div className="filter-buttons">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${filter === category.id ? 'active' : ''}`}
              onClick={() => setFilter(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                <div className="project-emoji">{project.image}</div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  {project.link.startsWith('/') ? (
                    <Link to={project.link} className="project-link">
                      Ver Demo
                    </Link>
                  ) : (
                    <a
                      href={project.link}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Ver Demo
                    </a>
                  )}
                  <a 
                    href={project.github} 
                    className="project-link secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects



