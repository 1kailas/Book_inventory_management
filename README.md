# Book Inventory Management System

A full-stack, production-ready application for managing a book inventory. Built with React (Vite) for the frontend and Node.js/Express with MongoDB for the backend.

---

## Features
- 📚 Add, edit, delete, and search books
- 🔎 Filter and sort by title, author, genre, price, and date
- 📊 Dashboard with statistics (total books, out of stock, total value)
- 🌗 Light/Dark mode toggle
- ⚡ Responsive, modern UI
- 🛡️ Production-ready code and structure

---

## Tech Stack
- **Frontend:** React, Vite, Axios, CSS Modules
- **Backend:** Node.js, Express, MongoDB, Mongoose

---

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### 1. Clone the repository
```sh
git clone <your-repo-url>
cd kailasnath
```

### 2. Setup Backend
```sh
cd kailas-backend
cp .env.example .env # Create your .env file and set MONGODB_URI
npm install
npm run dev # or npm start for production
```

### 3. Setup Frontend
```sh
cd ../kailas-frontend
npm install
npm run dev # For development
npm run build # For production build
```

### 4. Open the App
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

---

## Environment Variables
Create a `.env` file in `kailas-backend`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

---

## Deployment
- Build frontend: `npm run build` in `kailas-frontend` (output in `dist/`)
- Use a process manager (e.g., PM2) for backend in production
- Set environment variables securely

---

## License
MIT

---

## Author
- Kailasnath (Student)
