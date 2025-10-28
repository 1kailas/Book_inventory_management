import React, { useState, useEffect } from 'react'
import { bookAPI } from '../services/api'
import './SearchFilter.css'

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  selectedGenre,
  setSelectedGenre,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder
}) => {
  const [genres, setGenres] = useState([])

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await bookAPI.getGenres()
        setGenres(response.data)
      } catch (err) {
        console.error('Failed to fetch genres:', err)
      }
    }
    fetchGenres()
  }, [])

  return (
    <div className="search-filter">
      <div className="filter-group">
        <input
          type="text"
          placeholder="Search books by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="title">Sort by Title</option>
          <option value="author">Sort by Author</option>
          <option value="price">Sort by Price</option>
          <option value="createdAt">Sort by Date Added</option>
        </select>
      </div>

      <div className="filter-group">
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="filter-select"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {(searchTerm || selectedGenre) && (
        <button
          onClick={() => {
            setSearchTerm('')
            setSelectedGenre('')
          }}
          className="clear-filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  )
}

export default SearchFilter