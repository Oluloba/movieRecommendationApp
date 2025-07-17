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

![Dashboard Screenshot](<movie-app-backend/images/Screenshot 1.png>) alt="Dashboard Screenshot"(<movie-app-backend\images\Screenshot 1.png>)

![Dashboard Screenshot2](<movie-app-backend/images/Screenshot 2.png>) alt="Dashboard second page "(<movie-app-frontend\images\Screenshot 2.png>)

![Dashboard Screenshot](<movie-app-backend/images/Screenshot 3.png>) alt="Dashboard third page"(<movie-app-frontend\images\Screenshot 3.png>)

### Login Page

![Login Screenshot](<movie-app-backend/images/Screenshot login page.png>)

## Deployment

This app is currently **not deployed** to a public domain.

To test and use the app, please follow the instructions below to run it locally on your machine.



1. Clone the repository:  
   git clone https://github.com/Oluoba/movieRecommendationApp.git
2. Install dependencies:
    npm install
3. Create a .env file in the root directory with the following variables: 
    DATABASE_URL="your_database_connection_string"
    TMDB_API_KEY="your_tmdb_api_key"
    JWT_SECRET="your_jwt_secret"
4. Run Prisma migrations (I used mongoose initialy):
    npx prisma migrate dev --name init

5. Start the server:
    node server.js
6. Use Postman or any API client to test endpoints at http://localhost:PORT/api/... (replace PORT with your server port, usually 3000, 5000 or as configured). 

### Testing with Postman
◾ Use the Register endpoint to create a user:
POST http://localhost:5000/api/auth/register
Body example (JSON):

{
  "username": "yourusername",
  "email": "youremail@address.com",
  "password": "yourpassword"
}

◾ Use the Login endpoint to authenticate:
POST http://localhost:5000/api/auth/login
Body example (JSON):

{
  "email": "youremail@address.com",
  "password": "yourpassword"
}
◾ Use the returned JWT token in your requests to protected routes by setting the header:
Authorization: Bearer YOUR_JWT_TOKEN 
I.e., Key is - Authorization and Value is - Bearer - j56*************

## License
This project is intended as a learning/demo project; for production, add further security and error handling.