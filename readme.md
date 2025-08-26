Here’s a clean **README.md** draft for your Express.js + PostgreSQL project with BetterAuth (Google login + JWT auth). You can adjust the project name, description, and setup steps based on your exact implementation:

---

# 🚀 Express.js Authentication Server

This project is an **Express.js Authentication Server** with **PostgreSQL** database integration.
It supports **JWT-based authentication**, **Google social login (BetterAuth)**, and a protected **dashboard API**.

---

## 📌 Features

- 🔑 **User Signup & Login** (Email/Password with JWT tokens)
- 🌐 **Google Social Login** using [BetterAuth](https://betterauth.dev)
- 🗄 **PostgreSQL** as the database (via pg / pg-pool)
- 🔒 **Access & Refresh Token** authentication
- 📊 **Protected Dashboard API** (returns tokens + user info)
- ⚡ Built with **Express.js + ES6 modules**

---

## 🛠 Tech Stack

- **Backend**: Express.js (Node.js v22+)
- **Database**: PostgreSQL (managed via pgAdmin)
- **Auth**: JWT (Access + Refresh Tokens) & BetterAuth (Google login)
- **ORM/Query**: SQL queries with pg

---

## 📂 Project Structure

```
express_app/
│── config/
│   └── db.js              # PostgreSQL connection
│
│── controllers/
│   └── authController.js  # Signup, Login, Dashboard
│
│── models/
│   └── userModel.js       # User queries
│
│── routes/
│   └── authRoutes.js      # Auth-related routes
│
│── utils/
│   └── tokenUtils.js      # JWT token generation & verification
│
│── app.js                 # Express app entry
│── package.json
│── .env                   # Environment variables
│── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone Repo

```bash
git clone https://github.com/yourusername/express-auth-server.git
cd express-auth-server
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URL=postgresql://username:password@localhost:5432/your_db_name

JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CALLBACK_URL=http://localhost:3000/dashboard
```

### 4. Setup PostgreSQL Database

In pgAdmin, run:

```sql
CREATE DATABASE your_db_name;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 5. Run Server

```bash
npm start
```

Server runs on: [http://localhost:5000](http://localhost:5000)

---

## 🔑 API Endpoints

### 1. **Signup**

```http
POST /api/auth/signup
```

Request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword"
}
```

### 2. **Login**

```http
POST /api/auth/login
```

Response:

```json
{
  "accessToken": "...",
  "refreshToken": "...",
  "user": { "id": 1, "email": "john@example.com" }
}
```

### 3. **Dashboard (Protected)**

```http
GET /api/auth/dashboard
```

Headers:

```http
Authorization: Bearer <access_token>
```

Response:

```json
{
  "message": "Welcome to dashboard",
  "tokens": {
    "accessToken": "...",
    "refreshToken": "..."
  }
}
```

---

## 🌐 Google Login (BetterAuth)

- Sign in with Google via BetterAuth client.
- On success, user gets redirected to `/dashboard` with tokens.

---

## 📜 License

MIT License © 2025 Your Name

---

👉 Do you want me to also add **setup instructions for Google OAuth (BetterAuth)** in the README (with screenshots of Google Cloud console)?
