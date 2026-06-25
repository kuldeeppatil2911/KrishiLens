# 🌿 KrishiLens - AI Crop Disease Detection System

> An AI-powered crop disease detection web application built with the MERN stack. Upload a leaf image and get instant disease diagnosis with treatment recommendations powered by a CNN model.

---

## 👥 Team Members

| Name | Role |
|------|------|
| Kuldeep Patil | Full Stack Developer |
| Chirag Bhayal | Full Stack Developer |

---

## 🌐 Live Demo

| Service | URL |
|---------|-----|
| Frontend | https://krishilens.vercel.app |
| Backend API | https://krishilens-1.onrender.com |
| AI Model API | https://plant-ai-api-1.onrender.com |

---

## 📁 Project Structure

```
krishilens-mern/
│
├── 📂 server/                          ← Node.js + Express Backend
│   ├── 📂 models/
│   │   ├── User.js                     ← MongoDB User Schema
│   │   └── Scan.js                     ← MongoDB Scan Schema
│   ├── 📂 routes/
│   │   ├── auth.js                     ← Authentication Routes (login/register)
│   │   ├── scan.js                     ← Crop Scan & AI Analysis Routes
│   │   ├── history.js                  ← Scan History Routes
│   │   └── user.js                     ← User Profile Routes
│   ├── 📂 middleware/
│   │   └── auth.js                     ← JWT Authentication Middleware
│   ├── server.js                       ← Express App Entry Point
│   ├── package.json                    ← Server Dependencies
│   └── .env                            ← Environment Variables
│
├── 📂 client/                          ← React.js Frontend
│   ├── 📂 public/
│   │   └── index.html                  ← HTML Entry Point
│   ├── 📂 src/
│   │   ├── 📂 pages/
│   │   │   ├── Home.js                 ← Dashboard / Landing Page
│   │   │   ├── Login.js                ← Login Page
│   │   │   ├── Register.js             ← Registration Page
│   │   │   ├── Scan.js                 ← Image Upload & Analysis Page
│   │   │   ├── Result.js               ← Disease Result Display Page
│   │   │   ├── History.js              ← Scan History Page
│   │   │   └── Profile.js              ← User Profile Page
│   │   ├── 📂 context/
│   │   │   └── AuthContext.js          ← Global Auth State (React Context)
│   │   ├── 📂 components/
│   │   │   └── Navbar.js               ← Navigation Bar Component
│   │   ├── 📂 services/
│   │   │   └── api.js                  ← Axios API Service (HTTP calls)
│   │   ├── App.js                      ← Root Component with Routes
│   │   ├── index.js                    ← React DOM Entry Point
│   │   └── index.css                   ← Global Styles
│   ├── package.json                    ← Client Dependencies
│   └── .env                            ← Frontend Environment Variables
│
├── render.yaml                         ← Render Deployment Config
├── .gitignore                          ← Git Ignore Rules
├── package.json                        ← Root Package (scripts)
└── README.md                           ← Project Documentation
```

---

## 🏗️ Architecture & Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        USER BROWSER                             │
│                    React.js Frontend                            │
│              (Vercel - https://krishilens.vercel.app)           │
└─────────────────────┬───────────────────────────────────────────┘
                      │  HTTP Requests (Axios)
                      │  JWT Token in Headers
                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                    EXPRESS.JS BACKEND                           │
│              (Render - krishilens-1.onrender.com)               │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────┐   │
│  │  /auth   │  │  /scan   │  │ /history │  │   /user      │   │
│  │ register │  │ analyze  │  │  GET     │  │  profile     │   │
│  │ login    │  │          │  │  DELETE  │  │  update      │   │
│  └──────────┘  └────┬─────┘  └──────────┘  └──────────────┘   │
│                     │                                           │
│  ┌──────────────────┼──────────────────────────────────────┐   │
│  │           JWT Middleware (auth.js)                       │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────┬───────────┼─────────────────────────────────────────-┘
          │           │
          ▼           ▼
┌─────────────┐  ┌────────────────────────────────────────────────┐
│  MongoDB    │  │         FastAPI AI Service                     │
│   Atlas     │  │   (plant-ai-api-1.onrender.com)                │
│             │  │                                                │
│  Users      │  │   CNN Model (TensorFlow/Keras)                 │
│  Scans      │  │   - Accepts leaf image                         │
│             │  │   - Returns disease prediction                 │
│             │  │   - Returns confidence score                   │
└─────────────┘  └────────────────────────────────────────────────┘
```

---

## 🔄 Request Flow

```
User uploads leaf image
        │
        ▼
React Frontend (Scan.js)
        │  POST /api/scan/analyze (multipart/form-data)
        ▼
Express Backend (scan.js route)
        │  JWT verified by middleware
        │
        ├──► Forwards image to FastAPI CNN Model
        │         │
        │         ▼
        │    CNN predicts disease
        │    Returns: { disease, confidence }
        │
        ├──► Processes result (severity, recommendation, treatment)
        │
        ├──► Saves scan to MongoDB Atlas
        │
        └──► Returns result to React frontend
                  │
                  ▼
        Result.js displays:
        - Disease name
        - Confidence %
        - Severity badge
        - Recommendation
        - Treatment
        - What to do next
```

---

## 🛠️ Technologies Used

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React.js | 18.3.1 | UI Framework |
| React Router DOM | 6.23.1 | Client-side Routing |
| Axios | 1.7.2 | HTTP API Requests |
| React Scripts | 5.0.1 | Build Tool (CRA) |
| React Context API | Built-in | Global State Management |
| CSS3 | - | Styling & Animations |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22.x | JavaScript Runtime |
| Express.js | 4.18.2 | Web Framework |
| Mongoose | 8.3.0 | MongoDB ODM |
| bcryptjs | 2.4.3 | Password Hashing |
| jsonwebtoken | 9.0.2 | JWT Authentication |
| multer | 1.4.5 | Image File Upload |
| node-fetch | 2.7.0 | HTTP requests to FastAPI |
| form-data | 4.0.0 | Multipart form forwarding |
| cors | 2.8.5 | Cross-Origin Resource Sharing |
| dotenv | 16.4.5 | Environment Variables |
| nodemon | 3.1.0 | Dev Auto-restart |

### Database & Cloud
| Service | Purpose |
|---------|---------|
| MongoDB Atlas | Cloud Database (Free Tier M0) |
| Render | Backend Hosting (Free Tier) |
| Vercel | Frontend Hosting (Free Tier) |

### AI / ML
| Technology | Purpose |
|------------|---------|
| FastAPI | Python AI Model Server |
| TensorFlow / Keras | CNN Model Training |
| CNN (Convolutional Neural Network) | Crop Disease Classification |
| PlantVillage Dataset | Training Data (~54,000 images, 38 classes) |

---

## 🔌 API Endpoints

### Auth Routes `/api/auth`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | Login user, get JWT token | ❌ |

### Scan Routes `/api/scan`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/scan/analyze` | Upload leaf image & get disease prediction | ✅ |

### History Routes `/api/history`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/history` | Get all scans for logged-in user | ✅ |
| DELETE | `/api/history/:id` | Delete a specific scan | ✅ |

### User Routes `/api/user`
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/profile` | Get user profile + scan stats | ✅ |
| PUT | `/api/user/profile` | Update user profile | ✅ |

---

## 🗄️ Database Schema

### User Model
```js
{
  firstName:  String (required),
  lastName:   String (required),
  email:      String (required, unique),
  password:   String (hashed with bcrypt),
  language:   String (default: 'en'),
  createdAt:  Date
}
```

### Scan Model
```js
{
  userId:   ObjectId (ref: User),
  imageUrl: String,
  result: {
    disease:        String,
    confidence:     Number,
    severity:       String,
    recommendation: String,
    treatment:      String,
    isHealthy:      Boolean
  },
  cropName:  String,
  language:  String,
  createdAt: Date
}
```

---

## ⚙️ Environment Variables

### Server (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/krishilens
JWT_SECRET=your_jwt_secret_key
FASTAPI_URL=https://plant-ai-api-1.onrender.com
CLIENT_URL=https://krishilens.vercel.app
```

### Client (`client/.env`)
```env
REACT_APP_API_URL=https://krishilens-1.onrender.com
```

---

## 🚀 Local Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas account
- npm

### 1. Clone the Repository
```bash
git clone https://github.com/kuldeeppatil2911/KrishiLens.git
cd KrishiLens
```

### 2. Setup Backend
```bash
cd server
npm install
# Create .env file with your values
npm run dev
```

### 3. Setup Frontend
```bash
cd client
npm install
npm start
```

### 4. Open App
```
http://localhost:3000
```

---

## ✨ Features

- 🔐 User Authentication (Register / Login / JWT)
- 📷 Crop Leaf Image Upload (drag & drop or file picker)
- 🤖 AI Disease Detection via CNN Model
- 📊 Confidence Score with visual progress bar
- 🏷️ Severity Badge (High / Moderate / Low / None)
- 💊 Treatment & Recommendation details
- 📜 Scan History stored in MongoDB
- 👤 User Profile with scan statistics
- 🗑️ Delete scan history
- 📱 Responsive green-themed UI

---

## 🌱 Supported Diseases

| Crop | Diseases Detected |
|------|------------------|
| Tomato | Early Blight, Late Blight, Leaf Mold, Septoria Leaf Spot, Spider Mites, Target Spot, Bacterial Spot, Mosaic Virus, Yellow Leaf Curl Virus, Healthy |
| Potato | Early Blight, Late Blight, Healthy |
| Corn | Common Rust, Gray Leaf Spot, Northern Leaf Blight, Healthy |
| Apple | Apple Scab, Black Rot, Cedar Apple Rust, Healthy |
| + More | 38 total classes from PlantVillage dataset |

---

## 📦 Deployment

| Component | Platform | URL |
|-----------|----------|-----|
| Frontend | Vercel | Auto-deploy from GitHub |
| Backend | Render | Auto-deploy from GitHub |
| Database | MongoDB Atlas | Cloud M0 Free Tier |
| AI Model | Render (FastAPI) | Pre-deployed |

---

## 🔒 Security

- Passwords hashed with **bcryptjs** (salt rounds: 10)
- Authentication via **JWT tokens** (7 day expiry)
- Protected routes with middleware
- CORS configured for specific origins only
- Environment variables for all secrets

---

## 📄 License

MIT License © 2024 Kuldeep Patil & Chirag Bhayal
