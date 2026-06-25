# KrishiLens - MERN Stack

AI-powered crop disease detection web app built with MongoDB, Express, React, and Node.js.

## Project Structure

```
krishilens-mern/
├── server/                 ← Express + Node.js backend
│   ├── models/
│   │   ├── User.js         ← MongoDB User schema
│   │   └── Scan.js         ← MongoDB Scan schema
│   ├── routes/
│   │   ├── auth.js         ← /api/auth (login, register)
│   │   ├── scan.js         ← /api/scan/analyze
│   │   ├── history.js      ← /api/history
│   │   └── user.js         ← /api/user/profile
│   ├── middleware/
│   │   └── auth.js         ← JWT middleware
│   ├── server.js
│   ├── .env
│   └── package.json
└── client/                 ← React web frontend
    ├── src/
    │   ├── pages/
    │   │   ├── Home.js
    │   │   ├── Login.js
    │   │   ├── Register.js
    │   │   ├── Scan.js
    │   │   ├── Result.js
    │   │   ├── History.js
    │   │   └── Profile.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── components/
    │   │   └── Navbar.js
    │   ├── services/
    │   │   └── api.js
    │   ├── App.js
    │   ├── index.js
    │   └── index.css
    └── package.json
```

## Prerequisites

- Node.js v18+
- MongoDB (local or Atlas)
- npm

## Setup & Run

### 1. Install MongoDB
Download and install from https://www.mongodb.com/try/download/community
Or use MongoDB Atlas (free cloud): https://www.mongodb.com/atlas

### 2. Install Server Dependencies
```bash
cd server
npm install
```

### 3. Configure Server Environment
Edit `server/.env`:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/krishilens
JWT_SECRET=your_secret_key_here
FASTAPI_URL=https://plant-ai-api-1.onrender.com
```

### 4. Start the Server
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

### 5. Install Client Dependencies
```bash
cd client
npm install
```

### 6. Start the React App
```bash
cd client
npm start
```
App opens at http://localhost:3000

## API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | /api/auth/register | Register new user | No |
| POST | /api/auth/login | Login user | No |
| POST | /api/scan/analyze | Analyze crop image | Yes |
| GET | /api/history | Get scan history | Yes |
| DELETE | /api/history/:id | Delete a scan | Yes |
| GET | /api/user/profile | Get user profile | Yes |
| PUT | /api/user/profile | Update profile | Yes |

## Features
- User authentication (JWT)
- Crop image upload & AI disease analysis (via FastAPI)
- Disease detection results with confidence, severity, recommendations
- Scan history stored in MongoDB
- User profile with scan statistics
- Responsive green-themed UI
