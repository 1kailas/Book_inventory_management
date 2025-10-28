import React from 'react'
import Button from './Button'
import './BookList.css'

const BookList = ({ books, loading, onEdit, onDelete, darkMode }) => {
  if (loading) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="loading">
            <div className="loading-spinner"></div>
            <p>Loading books...</p>
          </div>
        </div>
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="card">
        <div className="card-body">
          <div className="no-books">
            <h2>Book List</h2>
            <p>No books found. Add some books to get started!</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2>Book List ({books.length} books)</h2>
      </div>
      <div className="card-body">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Published</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id} className={book.stock === 0 ? 'out-of-stock' : ''}>
                  <td className="title-cell">
                    <div className="title">{book.title}</div>
                  </td>
                  <td>{book.author}</td>
                  <td>
                    <span className="genre-tag">{book.genre}</span>
                  </td>
                  <td className="price-cell">${book.price?.toFixed(2)}</td>
                  <td className="stock-cell">
                    <span className={`stock ${book.stock === 0 ? 'zero' : ''}`}>
                      {book.stock}
                    </span>
                    {book.stock === 0 && (
                      <span className="out-of-stock-badge">Out of Stock</span>
                    )}
                  </td>
                  <td>{book.publishedYear || '-'}</td>
                  <td className="actions-cell">
                    <div className="action-buttons">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onEdit(book)}
                        title="Edit book"
                      >
                        <span className="action-icon">✏️</span> Edit
                      </Button>
                      <Button
                        variant="error"
                        size="sm"
                        onClick={() => onDelete(book)}
                        title="Delete book"
                      >
                        <span className="action-icon">🗑️</span> Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BookList