# 🎬 Movie Recommendation App

A full-stack web application that helps users discover movies, search by genre, year, popularity, and also save their favorites movies. This app integrates with the TMDb (The Movie Database) API to provide up-to-date movie data.

The project is structured with separate backend and frontend folders:

backend/ — REST API built with Node.js, Express, and Prisma for database management.

frontend/ — React.js user interface for seamless interaction and visualization.

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
- **Backend:** Node.js, Express, postgreSQL, JWT
- **External API:** TMDb (The Movie Database) API for movie data (https://www.themoviedb.org/documentation/api)

---

## The Process

- Node.js and npm installed
- TMDb API key ([Get one here](https://www.themoviedb.org/documentation/api))

---

### Installation

#### Backend Setup

Navigate to the backend folder:
cd movie-app-backend

◾◾ Create a .env file and fill your credentials: 
	PORT=http://localhost:5000 {Default port}
	DATABASE URL="your postgres URL"
	JWT_SECRET=your_jwt_secret

### Frontend Setup 
cd movie-app-frontend 

◾◾ Create a .env file:
	REACT_APP_API_URL=http://localhost:5000
	REACT_APP_TMDB_API_KEY=your_tmdb_api_key
 ### Notes
✅ Keep your TMDb API key secure; never expose it publicly. Add your .env file to .gitignore

✅ Make use of JWT authentication to protects user data and routes

◾◾ Install dependencies and Run Prisma migrations (I used mongoose initialy):
    npx prisma migrate dev --name init
◾◾ Start the server:
    node server.js
◾◾ Use Postman or any API client to test endpoints at http://localhost:PORT/api/... (replace PORT with your server port, usually 3000, 5000 or as configured). 

### Testing with Postman
◾ Use the Register endpoint to create a user:
POST http://localhost:5000/api/auth/register
Body example in the Postman (JSON):

{
  "username": "yourusername",
  "email": "youremail@address.com",
  "password": "yourpassword"
}

◾ Use the Login endpoint to authenticate:

"POST" http://localhost:5000/api/auth/login
Body example (JSON):

{
  "email": "youremail@address.com",
  "password": "yourpassword"
}

◾ Use the returned JWT token in your requests to protect routes; Set the header (❗Still in Postman)
Authorization: Bearer YOUR_JWT_TOKEN 
I.e., Key is - Authorization and Value is - Bearer - j56*************

## Screenshots

### Dashboard View

![Dashboard Screenshot](<movie-app-backend/images/Screenshot 1.png>) alt="Dashboard Screenshot"

![Dashboard Screenshot2](<movie-app-backend/images/Screenshot 2.png>) alt="Dashboard second page "

![Dashboard Screenshot](<movie-app-backend/images/Screenshot 3.png>) alt="Dashboard third page"

### Login Page

![Login Screenshot](<movie-app-backend/images/Screenshot login page.png>)

## App Features ##
◾ Register a new user or login with existing credentials
◾ Browse popular movies on the dashboard
◾ Access your profile to update user information
◾ Add movies to favorites, delet from favorites, like a movie, leave a review
◾ Log out securely

## License
This project is intended as a learning/demo project; for production, add further security and error handling.
