import React, { useState, useEffect } from 'react'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import EditBookModal from './components/EditBookModal'
import DeleteConfirmation from './components/DeleteConfirmation'
import { bookAPI } from './services/api'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingBook, setEditingBook] = useState(null)
  const [deletingBook, setDeletingBook] = useState(null)

  // Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const response = await bookAPI.getAllBooks()
      setBooks(response.data)
      setError('')
    } catch (err) {
      setError('Failed to fetch books: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [])

  // Add new book
  const handleAddBook = async (bookData) => {
    try {
      await bookAPI.addBook(bookData)
      await fetchBooks() // Refresh the list
      return true
    } catch (err) {
      setError('Failed to add book: ' + err.message)
      return false
    }
  }

  // Update book
  const handleUpdateBook = async (bookData) => {
    try {
      await bookAPI.updateBook(editingBook._id, bookData)
      setEditingBook(null)
      await fetchBooks() // Refresh the list
      return true
    } catch (err) {
      setError('Failed to update book: ' + err.message)
      return false
    }
  }

  // Delete book
  const handleDeleteBook = async () => {
    try {
      await bookAPI.deleteBook(deletingBook._id)
      setDeletingBook(null)
      await fetchBooks() // Refresh the list
    } catch (err) {
      setError('Failed to delete book: ' + err.message)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>📚 Book Inventory Management</h1>
        <p>Manage your book collection efficiently</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError('')} className="close-btn">×</button>
          </div>
        )}

        <AddBookForm onAddBook={handleAddBook} />

        <BookList
          books={books}
          loading={loading}
          onEdit={setEditingBook}
          onDelete={setDeletingBook}
        />

        {editingBook && (
          <EditBookModal
            book={editingBook}
            onUpdate={handleUpdateBook}
            onClose={() => setEditingBook(null)}
          />
        )}

        {deletingBook && (
          <DeleteConfirmation
            book={deletingBook}
            onConfirm={handleDeleteBook}
            onCancel={() => setDeletingBook(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App