# Portfolio Website with Admin Dashboard

A modern, dynamic portfolio website featuring a comprehensive Admin Dashboard for Content Management. Built with the MERN stack (MongoDB, Express.js, React, Node.js).

## 🚀 Features

-   **Dynamic Content:** Manage Hero section, About me, Experience, Projects, Skills, and Social links directly from the admin panel.
-   **Admin Dashboard:** Secure login with email OTP authentication.
-   **Project Management:** Add, edit, delete, and toggle visibility of projects.
-   **GitHub Integration:** Sync repositories directly from GitHub.
-   **File Management:** Upload and crop profile pictures, manage CVs and 3D models.
-   **Modern UI/UX:** Responsive design, dark mode support, and smooth animations using Framer Motion.

## 📂 Project Structure

The project is divided into two main folders:

-   **`frontend/`**: The React application (Vite).
-   **`backend/`**: The Node.js/Express server and MongoDB connection.

## 🛠️ Technology Stack

-   **Frontend:** React, Vite, Tailwind CSS, Framer Motion, Axios
-   **Backend:** Node.js, Express.js, MongoDB (Mongoose)
-   **Authentication:** JWT, Email OTP (Nodemailer)
-   **Tools:** Multer (File Uploads), React Easy Crop

## ⚙️ Setup & Installation

You need to set up both the frontend and backend.

### 1. Prerequisites

-   Node.js (v18 or higher)
-   MongoDB Atlas account (or local MongoDB)
-   Git

### 2. Backend Setup

1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file in the `backend` directory (see [Environment Variables](#environment-variables)).
4.  Start the server:
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5000`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
    The site will be available at `http://localhost:5173`.

## 🔐 Environment Variables

Create a `.env` file in the **`backend/`** directory with the following:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=your_mongodb_connection_string

# Email Configuration (for OTPs)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password

# Admin Configuration
ADMIN_EMAIL=your_admin_email@example.com
JWT_SECRET=your_super_secret_key_change_this
```

## 🏃‍♂️ Running the Project

To run the full application locally:

1.  **Terminal 1 (Backend):**
    ```bash
    cd backend
    npm run dev
    ```
2.  **Terminal 2 (Frontend):**
    ```bash
    cd frontend
    npm run dev
    ```

## 📝 Admin Access

1.  Go to `http://localhost:5173/admin`.
2.  Enter the email configured as `ADMIN_EMAIL` in your `.env`.
3.  Check your email for the OTP code.
4.  Enter the code to access the dashboard.

## 📄 License

MIT License.
