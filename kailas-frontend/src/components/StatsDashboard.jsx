import React from 'react'
import './StatsDashboard.css'

const StatsDashboard = ({ stats }) => {
  return (
    <div className="stats-dashboard">
      <div className="stat-card">
        <div className="stat-icon">📚</div>
        <div className="stat-info">
          <h3>Total Books</h3>
          <span className="stat-value">{stats.totalBooks}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">⚠️</div>
        <div className="stat-info">
          <h3>Out of Stock</h3>
          <span className="stat-value warning">{stats.outOfStockBooks}</span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">💰</div>
        <div className="stat-info">
          <h3>Total Value</h3>
          <span className="stat-value">
            ${stats.totalValue?.toFixed(2) || '0.00'}
          </span>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📊</div>
        <div className="stat-info">
          <h3>In Stock</h3>
          <span className="stat-value success">
            {stats.totalBooks - stats.outOfStockBooks}
          </span>
        </div>
      </div>
    </div>
  )
}

export default StatsDashboard