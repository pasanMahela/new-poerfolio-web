# Portfolio Project

This is a full-stack portfolio application consisting of a React frontend and an Express.js backend.

## Project Structure

```
/
├── frontend/     # React + Vite application
└── backend/      # Express.js + MongoDB API
```

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB connection string (Atlas or local)
- Gmail account (for contact form emails)

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   JWT_SECRET=your_jwt_secret
   ADMIN_EMAIL=your_admin_email@example.com
   ```
4. Start the server:
   ```bash
   npm run dev
   ```

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend/` directory (optional for local, but good practice):
   ```env
   VITE_API_URL=http://localhost:5000
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment on Render.com

This project is configured to be deployed easily on Render. You can deploy both the frontend and backend as separate services from the same repository.

### Backend (Web Service)
1. Create a new **Web Service** on Render.
2. Connect your GitHub repository.
3. Settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   Add all variables from your `backend/.env` file.

### Frontend (Static Site)
1. Create a new **Static Site** on Render.
2. Connect your GitHub repository.
3. Settings:
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. **Environment Variables**:
   - `VITE_API_URL`: The URL of your deployed Backend Web Service (e.g., `https://my-portfolio-api.onrender.com`).

## Features
- **Dynamic Content**: Manage Projects, Experience, Skills, and Education via the Admin Dashboard.
- **Admin Portal**: Secure login with Email OTP.
- **Contact Form**: direct email integration using Nodemailer.
- **Responsive Design**: Built with Tailwind CSS and Framer Motion.

## License
MIT
