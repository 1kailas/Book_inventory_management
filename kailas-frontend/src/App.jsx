import React, { useState, useEffect } from 'react'
import AddBookForm from './components/AddBookForm'
import BookList from './components/BookList'
import EditBookModal from './components/EditBookModal'
import DeleteConfirmation from './components/DeleteConfirmation'
import SearchFilter from './components/SearchFilter'
import StatsDashboard from './components/StatsDashboard'
import Toast from './components/Toast'
import ThemeToggle from './components/ThemeToggle'
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
  const [stats, setStats] = useState({ 
    totalBooks: 0, 
    outOfStockBooks: 0, 
    totalValue: 0 
  })

  // Theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem('bookInventory-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const initialTheme = savedTheme ? savedTheme === 'dark' : prefersDark
    
    setDarkMode(initialTheme)
    document.documentElement.setAttribute('data-theme', initialTheme ? 'dark' : 'light')
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light')
    localStorage.setItem('bookInventory-theme', newDarkMode ? 'dark' : 'light')
  }

  const showToast = (message, type = 'info') => {
    setToast({ message, type })
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

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <div className="header-title">
            <h1><span className="book-icon" role="img" aria-label="Book">📚</span> Book Inventory Manager</h1>
            <p>Professional Book Management System</p>
          </div>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      <main className="app-main">
        <StatsDashboard stats={stats} darkMode={darkMode} />
        
        <SearchFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedGenre={selectedGenre}
          setSelectedGenre={setSelectedGenre}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          darkMode={darkMode}
        />

        <AddBookForm onAddBook={handleAddBook} darkMode={darkMode} />

        <BookList
          books={books}
          loading={loading}
          onEdit={setEditingBook}
          onDelete={setDeletingBook}
          darkMode={darkMode}
        />

        {editingBook && (
          <EditBookModal
            book={editingBook}
            onUpdate={handleUpdateBook}
            onClose={() => setEditingBook(null)}
            darkMode={darkMode}
          />
        )}

        {deletingBook && (
          <DeleteConfirmation
            book={deletingBook}
            onConfirm={handleDeleteBook}
            onCancel={() => setDeletingBook(null)}
            darkMode={darkMode}
          />
        )}

        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
            darkMode={darkMode}
          />
        )}
      </main>
    </div>
  )
}

export default App