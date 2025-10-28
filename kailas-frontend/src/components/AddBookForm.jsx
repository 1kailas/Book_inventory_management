import React, { useState } from 'react'
import Button from './Button'
import './AddBookForm.css'

const AddBookForm = ({ onAddBook, darkMode }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    price: '',
    stock: '',
    publishedYear: ''
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const bookData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined
      }

      const success = await onAddBook(bookData)
      if (success) {
        setFormData({
          title: '',
          author: '',
          genre: '',
          price: '',
          stock: '',
          publishedYear: ''
        })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Add New Book</h2>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label" htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Enter book title"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="author">Author *</label>
              <input
                type="text"
                id="author"
                name="author"
                className="form-input"
                value={formData.author}
                onChange={handleChange}
                required
                placeholder="Enter author name"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="genre">Genre *</label>
              <input
                type="text"
                id="genre"
                name="genre"
                className="form-input"
                value={formData.genre}
                onChange={handleChange}
                required
                placeholder="Enter genre"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="price">Price ($) *</label>
              <input
                type="number"
                id="price"
                name="price"
                className="form-input"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="stock">Stock</label>
              <input
                type="number"
                id="stock"
                name="stock"
                className="form-input"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="publishedYear">Published Year</label>
              <input
                type="number"
                id="publishedYear"
                name="publishedYear"
                className="form-input"
                value={formData.publishedYear}
                onChange={handleChange}
                min="1000"
                max={new Date().getFullYear()}
                placeholder="YYYY"
              />
            </div>
          </div>
          
          <Button 
            type="submit" 
            loading={loading} 
            size="lg"
            className="submit-btn"
          >
            Add Book
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AddBookForm