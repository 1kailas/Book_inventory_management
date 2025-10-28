import React from 'react';
import './BookList.css';

const BookList = ({ books, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div className="loading">Loading books...</div>;
  }

  if (books.length === 0) {
    return (
      <div className="no-books">
        <h2>Book List</h2>
        <p>No books found. Add some books to get started!</p>
      </div>
    );
  }

  return (
    <div className="book-list">
      <h2>Book List ({books.length} books)</h2>
      <div className="table-container">
        <table>
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
                <td className="title">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td className="price">${book.price.toFixed(2)}</td>
                <td className={`stock ${book.stock === 0 ? 'zero' : ''}`}>
                  {book.stock}
                  {book.stock === 0 && <span className="out-of-stock-badge">Out of Stock</span>}
                </td>
                <td>{book.publishedYear || '-'}</td>
                <td className="actions">
                  <button
                    onClick={() => onEdit(book)}
                    className="edit-btn"
                    title="Edit book"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDelete(book)}
                    className="delete-btn"
                    title="Delete book"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;