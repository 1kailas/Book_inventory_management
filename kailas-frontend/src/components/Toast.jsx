import React, { useEffect } from 'react'
import './Toast.css'

const Toast = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  )
}

export default Toast