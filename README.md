# 🎬 Movie Recommendation App

A full-stack movie recommendation application built with React, Node.js, Express, MongoDB, and JWT authentication. This app fetches popular movies from The Movie Database (TMDb) API and allows users to register, login, and access Popular Movies based on Ratings.

---

## Features

- User authentication with JWT and protected routes
- Fetch and display popular movies from TMDb API
- Responsive design for desktop and mobile
- User profile page to manage account info
- Clean UI with React Router navigation
- Backend API built with Node.js, Express, and MongoDB

---

## Technologies Used

- **Frontend:** React, React Router, Axios, CSS
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT
- **External API:** TMDb (The Movie Database) API for movie data (https://www.themoviedb.org/documentation/api)

---

## The Process

- Node.js and npm installed
- MongoDB 
- TMDb API key ([Get one here](https://www.themoviedb.org/documentation/api))

---

### Installation

#### Backend Setup

1. Navigate to the backend folder:

{I did all my backend inside the main folder}}
cd movie-app-backend

Create a .env file and fill your credentials

PORT=http://localhost:5000 {Default port}
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

### Frontend Setup 
cd movie-app-frontend {My front end wa screated in a separate folder}

Create a .env file 

REACT_APP_API_URL=http://localhost:5000
REACT_APP_TMDB_API_KEY=your_tmdb_api_key

Install dependencies and start React development server: 
npm install
npm start

** Usage **
◾ Register a new user or login with existing credentials

◾ Browse popular movies on the dashboard

◾ Access your profile to update user information

◾ Log out securely

### Notes
◾ Keep your TMDb API key secure; never expose it publicly. Add your .env file to .gitignore. 

◾ JWT authentication protects user data and routes.

## Screenshots

### Dashboard View

![Dashboard Screenshot](<movie-app-frontend/images/Screenshot 1.png>) alt="Dashboard Screenshot"(<movie-app-frontend\images\Screenshot 2.png>)

### Login Page

![Login Screenshot](<movie-app-frontend/images/Screenshot login page.png>)

## License
This project is intended as a learning/demo project; for production, add further security and error handling.