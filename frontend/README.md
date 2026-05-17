# Task Manager App

A full-stack task management application built with React, Node.js, Express, and MongoDB.

## Tech Stack

- **Frontend:** React, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT

## How to Run

### Backend Setup

```bash
cd backend
npm install
```

Create `.env` file in backend folder:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

```bash
node server.js
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

Open http://localhost:3000

## Features

- User Registration and Login
- Create, Read, Delete Tasks
- Set Priority (Low/Medium/High) and Status
- JWT Authentication
- Responsive UI
