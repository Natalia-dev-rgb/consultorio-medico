import { useScrollAnimation } from '../hooks/useScrollAnimation'
import './About.css'
import profileImage from '../assets/yo.jpg'

function About() {
  const [titleRef, titleVisible] = useScrollAnimation({ once: true })
  const [textRef, textVisible] = useScrollAnimation({ once: true, threshold: 0.2 })
  const [imageRef, imageVisible] = useScrollAnimation({ once: true, threshold: 0.2 })

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 
          ref={titleRef}
          className={`section-title ${titleVisible ? 'fade-in-up' : ''}`}
        >
          Sobre mí
        </h2>
        <div className="about-content">
          <div 
            ref={textRef}
            className={`about-text ${textVisible ? 'slide-in-left' : ''}`}
          >
            <p className="about-intro">
              Soy una <strong>desarrolladora web especializada en React</strong> con pasión por crear 
              aplicaciones modernas, eficientes y centradas en el usuario.
            </p>
            <p>
              Con experiencia en el desarrollo de aplicaciones web escalables, me enfoco en escribir 
              código limpio, mantenible y siguiendo las mejores prácticas. Mi objetivo es crear 
              experiencias digitales que no solo funcionen perfectamente, sino que también inspiren 
              y deleiten a los usuarios.
            </p>
            <p>
              Cuando no estoy codificando, disfruto aprendiendo nuevas tecnologías, contribuyendo 
              a proyectos de código abierto y compartiendo conocimientos con la comunidad de 
              desarrolladores.
            </p>
            <div className="about-stats">
              <div className="stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Proyectos Completados</div>
              </div>
              <div className="stat">
                <div className="stat-number">5+</div>
                <div className="stat-label">Años de Experiencia</div>
              </div>
              <div className="stat">
                <div className="stat-number">100%</div>
                <div className="stat-label">Dedicación</div>
              </div>
            </div>
          </div>
          <div 
            ref={imageRef}
            className={`about-image ${imageVisible ? 'slide-in-right' : ''}`}
          >
            <img
              className="about-photo"
              src={profileImage}
              alt="Foto de Natalia Miere"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About



