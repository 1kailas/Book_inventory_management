import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const message = error.response?.data?.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export const bookAPI = {
  // Get all books
  getAllBooks: () => api.get('/books'),
  
  // Add a new book
  addBook: (bookData) => api.post('/books', bookData),
  
  // Update a book
  updateBook: (id, bookData) => api.put(`/books/${id}`, bookData),
  
  // Delete a book
  deleteBook: (id) => api.delete(`/books/${id}`),
};

export default api;