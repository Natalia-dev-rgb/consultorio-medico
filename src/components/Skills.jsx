import './Skills.css'

function Skills() {
  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Next.js', level: 80 }
      ]
    },
    {
      title: 'Herramientas',
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Webpack', level: 85 },
        { name: 'Vite', level: 90 },
        { name: 'Jest', level: 80 },
        { name: 'Figma', level: 75 },
        { name: 'VS Code', level: 95 }
      ]
    },
    {
      title: 'Backend & Más',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'REST APIs', level: 85 },
        { name: 'GraphQL', level: 75 },
        { name: 'MongoDB', level: 70 },
        { name: 'Firebase', level: 80 },
        { name: 'AWS', level: 70 }
      ]
    }
  ]

  return (
    <section id="skills" className="skills">
      <div className="container">
        <h2 className="section-title">Habilidades</h2>
        <p className="section-subtitle">
          Tecnologías y herramientas que domino para crear soluciones web excepcionales
        </p>
        <div className="skills-grid">
          {skillCategories.map((category, index) => (
            <div key={index} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-progress" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="tech-icons">
          <div className="tech-icon">⚛️ React</div>
          <div className="tech-icon">📦 Node.js</div>
          <div className="tech-icon">🎨 CSS3</div>
          <div className="tech-icon">⚡ Vite</div>
          <div className="tech-icon">🔷 TypeScript</div>
          <div className="tech-icon">🚀 Next.js</div>
        </div>
      </div>
    </section>
  )
}

export default Skills



