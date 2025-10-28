const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Book = require('../models/Book');

// GET /api/books - Get all books with search and filter
router.get('/', async (req, res) => {
  try {
    const { search, genre, author, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build filter object
    let filter = {};
    
    // Search across title, author, and genre
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
        { genre: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Filter by genre
    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' };
    }
    
    // Filter by author
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const books = await Book.find(filter).sort(sort);
    
    // Get statistics
    const totalBooks = await Book.countDocuments();
    const outOfStockBooks = await Book.countDocuments({ stock: 0 });
    
    res.json({
      success: true,
      count: books.length,
      totalBooks,
      outOfStockBooks,
      data: books
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching books',
      error: error.message
    });
  }
});

// GET /api/books/stats - Get book statistics
router.get('/stats', async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const outOfStockBooks = await Book.countDocuments({ stock: 0 });
    const totalValue = await Book.aggregate([
      { $project: { value: { $multiply: ['$price', '$stock'] } } },
      { $group: { _id: null, total: { $sum: '$value' } } }
    ]);
    
    const genreStats = await Book.aggregate([
      { $group: { _id: '$genre', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        totalBooks,
        outOfStockBooks,
        totalValue: totalValue[0]?.total || 0,
        genreStats
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics',
      error: error.message
    });
  }
});

// POST /api/books - Add a new book
router.post('/', async (req, res) => {
  try {
    const { title, author, genre, price, stock, publishedYear } = req.body;

    // Validate required fields
    if (!title || !author || !genre || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Title, author, genre, and price are required fields'
      });
    }

    const book = new Book({
      title,
      author,
      genre,
      price,
      stock: stock || 0,
      publishedYear
    });

    const savedBook = await book.save();
    
    res.status(201).json({
      success: true,
      message: 'Book added successfully',
      data: savedBook
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while creating book',
      error: error.message
    });
  }
});

// PUT /api/books/:id - Update a book's details
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    if (!updatedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book updated successfully',
      data: updatedBook
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: errors
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Server error while updating book',
      error: error.message
    });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid book ID'
      });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({
        success: false,
        message: 'Book not found'
      });
    }

    res.json({
      success: true,
      message: 'Book deleted successfully',
      data: deletedBook
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting book',
      error: error.message
    });
  }
});

// GET /api/books/genres - Get all unique genres
router.get('/genres', async (req, res) => {
  try {
    const genres = await Book.distinct('genre');
    res.json({
      success: true,
      data: genres
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching genres',
      error: error.message
    });
  }
});

module.exports = router;