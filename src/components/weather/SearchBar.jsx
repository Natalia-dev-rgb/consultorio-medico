import { useState } from 'react'
import './SearchBar.css'

const SearchBar = ({ onSearch, loading, lastCities = [], onCitySelect }) => {
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const city = inputValue.trim()
    if (city) {
      onSearch(city)
      setInputValue('')
      setShowSuggestions(false)
    }
  }

  const handleCitySelect = (city) => {
    onCitySelect(city)
    setInputValue('')
    setShowSuggestions(false)
  }

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSubmit}>
        <input
          type="text"
          name="city"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value)
            setShowSuggestions(e.target.value.length > 0 && lastCities.length > 0)
          }}
          onFocus={() => {
            if (lastCities.length > 0) setShowSuggestions(true)
          }}
          onBlur={() => {
            // Delay para permitir click en sugerencias
            setTimeout(() => setShowSuggestions(false), 200)
          }}
          placeholder="Buscar ciudad..."
          className="search-input"
          disabled={loading}
          aria-label="Buscar ciudad"
        />
        <button
          type="submit"
          className="search-button"
          disabled={loading || !inputValue.trim()}
          aria-label="Buscar"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>
      </form>

      {showSuggestions && lastCities.length > 0 && (
        <div className="suggestions-list">
          {lastCities.map((city, index) => (
            <button
              key={index}
              className="suggestion-item"
              onClick={() => handleCitySelect(city)}
              type="button"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
