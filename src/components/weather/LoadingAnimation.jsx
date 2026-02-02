import './LoadingAnimation.css'

const LoadingAnimation = () => {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-spinner">
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
          <div className="spinner-ring"></div>
        </div>
        <p className="loading-text">Cargando información del clima...</p>
        <div className="loading-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  )
}

export default LoadingAnimation
