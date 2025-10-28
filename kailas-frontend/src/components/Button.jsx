import React from 'react'
import './Button.css'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
  ...props 
}) => {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClass = `btn-${size}`
  const stateClass = disabled ? 'btn-disabled' : ''
  const loadingClass = loading ? 'btn-loading' : ''
  
  const combinedClass = [
    baseClass,
    variantClass,
    sizeClass,
    stateClass,
    loadingClass,
    className
  ].filter(Boolean).join(' ')
  
  return (
    <button
      type={type}
      className={combinedClass}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className="btn-spinner"></span>}
      {children}
    </button>
  )
}

export default Button