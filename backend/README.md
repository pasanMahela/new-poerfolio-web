# Portfolio Backend Server

Express.js backend for handling contact form submissions via email.

## Setup Instructions

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Gmail App Password

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification** (enable if not already)
3. Scroll down to **App Passwords**
4. Click **Select app** → Choose **Mail**
5. Click **Select device** → Choose **Other (Custom name)**
6. Enter "Portfolio Backend" and click **Generate**
7. Copy the 16-character password (remove spaces)

### 3. Create Environment File

```bash
# Copy the example file
cp .env.example .env

# Edit .env and add your Gmail App Password
# Replace 'your_gmail_app_password_here' with the password from step 2
```

Your `.env` file should look like:
```
PORT=5000
EMAIL_USER=pasancp2000@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # Your actual app password
```

### 4. Run the Server

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## Testing

### Health Check
```bash
curl http://localhost:5000/api/health
```

### Test Contact Form
```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "message": "This is a test message"
  }'
```

## API Endpoints

### GET /api/health
Health check endpoint
- **Response**: `{ status: 'OK', message: 'Server is running' }`

### POST /api/contact
Submit contact form
- **Body**: 
  ```json
  {
    "name": "string",
    "email": "string",
    "message": "string"
  }
  ```
- **Success Response**: `{ success: true, message: 'Message sent successfully!' }`
- **Error Response**: `{ success: false, message: 'Error message' }`

## Deployment

For production deployment, you can use:
- **Heroku**: `heroku create` and `git push heroku main`
- **Railway**: Connect your GitHub repo
- **Render**: Deploy from GitHub
- **DigitalOcean**: Use App Platform

Remember to set environment variables in your hosting platform!

## Troubleshooting

**Email not sending?**
- Verify Gmail App Password is correct
- Check if 2-Step Verification is enabled
- Make sure .env file is in the server directory
- Check server logs for error messages

**CORS errors?**
- Make sure the frontend is running on the expected port
- Update CORS configuration in server.js if needed
