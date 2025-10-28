import React from 'react';
import './DeleteConfirmation.css';

const DeleteConfirmation = ({ book, onConfirm, onCancel }) => {
  if (!book) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal-header">
          <h2>Confirm Delete</h2>
        </div>

        <div className="delete-modal-body">
          <p>Are you sure you want to delete this book?</p>
          <div className="book-details">
            <strong>Title:</strong> {book.title}<br />
            <strong>Author:</strong> {book.author}<br />
            <strong>Genre:</strong> {book.genre}<br />
            <strong>Price:</strong> ${book.price?.toFixed(2)}
          </div>
          <p className="warning-text">This action cannot be undone.</p>
        </div>

        <div className="delete-modal-actions">
          <button onClick={onCancel} className="cancel-btn">
            Cancel
          </button>
          <button onClick={onConfirm} className="confirm-delete-btn">
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;