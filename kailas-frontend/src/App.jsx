import React, { useState, useEffect } from 'react'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import EditBookModal from './components/EditBookModal'
import DeleteConfirmation from './components/DeleteConfirmation'
import SearchFilter from './components/SearchFilter'
import StatsDashboard from './components/StatsDashboard'
import Toast from './components/Toast'
import { bookAPI } from './services/api'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingBook, setEditingBook] = useState(null)
  const [deletingBook, setDeletingBook] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')
  const [darkMode, setDarkMode] = useState(false)
  const [toast, setToast] = useState(null)
  const [stats, setStats] = useState({ totalBooks: 0, outOfStockBooks: 0 })

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // Fetch all books with filters
  const fetchBooks = async () => {
    try {
      setLoading(true)
      const params = {}
      if (searchTerm) params.search = searchTerm
      if (selectedGenre) params.genre = selectedGenre
      params.sortBy = sortBy
      params.sortOrder = sortOrder

      const response = await bookAPI.getAllBooks(params)
      setBooks(response.data)
      setStats({
        totalBooks: response.totalBooks,
        outOfStockBooks: response.outOfStockBooks
      })
    } catch (err) {
      showToast('Failed to fetch books: ' + err.message, 'error')
    } finally {
      setLoading(false)
    }
  }

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await bookAPI.getStats()
      setStats(response.data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [searchTerm, selectedGenre, sortBy, sortOrder])

  useEffect(() => {
    fetchStats()
  }, [])

  // Add new book
  const handleAddBook = async (bookData) => {
    try {
      await bookAPI.addBook(bookData)
      showToast('Book added successfully!', 'success')
      await fetchBooks()
      await fetchStats()
      return true
    } catch (err) {
      showToast('Failed to add book: ' + err.message, 'error')
      return false
    }
  }

  // Update book
  const handleUpdateBook = async (bookData) => {
    try {
      await bookAPI.updateBook(editingBook._id, bookData)
      setEditingBook(null)
      showToast('Book updated successfully!', 'success')
      await fetchBooks()
      await fetchStats()
      return true
    } catch (err) {
      showToast('Failed to update book: ' + err.message, 'error')
      return false
    }
  }

  // Delete book
  const handleDeleteBook = async () => {
    try {
      await bookAPI.deleteBook(deletingBook._id)
      setDeletingBook(null)
      showToast('Book deleted successfully!', 'success')
      await fetchBooks()
      await fetchStats()
    } catch (err) {
      showToast('Failed to delete book: ' + err.message, 'error')
    }
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode', !darkMode)
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1>📚 Book Inventory Manager</h1>
            <p>Professional Book Management System</p>
          </div>
          <button 
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="app-main">
        <StatsDashboard stats={stats} />
        
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

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

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </main>
    </div>
  )
}

export default App