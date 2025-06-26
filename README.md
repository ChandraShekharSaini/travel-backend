# Travel Blog Backend

This is the backend part of the Travel Blog application, built with Node.js, Express, and MongoDB.

## Features

- RESTful API for travel destinations
- User authentication (register/login)
- Chat message storage and retrieval
- MongoDB database integration

## Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS for cross-origin requests

## Project Structure

```
backend/
├── models/
│   ├── User.js
│   ├── Destination.js
│   └── Message.js
├── server.js
└── package.json
```

## API Endpoints

- `GET /`: Root endpoint, returns a welcome message
- `GET /destination`: Returns a list of travel destinations
- `POST /api/register`: Register a new user
- `POST /api/login`: Authenticate a user
- `GET /api/messages`: Get all chat messages
- `POST /api/messages`: Add a new chat message
- `DELETE /api/messages/:id`: Delete a specific message

## Setup Instructions

1. Install dependencies:
```
npm install
```

2. Start the server:
```
npm start
```

3. For development with auto-restart:
```
npm run dev
```

## MongoDB Setup

The application requires MongoDB to be running. It will connect to a local MongoDB instance by default.

Default connection string: `mongodb://localhost:27017/`
Database name: `travel_blog`

## Note

The backend server should be running on port 3000 for the frontend to connect properly.
