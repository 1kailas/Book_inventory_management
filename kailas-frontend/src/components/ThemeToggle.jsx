import React from 'react'
import './ThemeToggle.css'

const ThemeToggle = ({ darkMode, toggleDarkMode }) => {
  return (
    <button
      className="theme-toggle"
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <span className="theme-icon sun">☀️</span>
      <span className="theme-icon moon">🌙</span>
    </button>
  )
}

export default ThemeToggle