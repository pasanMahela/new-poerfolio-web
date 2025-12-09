# Admin Portal User Guide

## Accessing the Admin Portal

### URL Access
Navigate to: `http://localhost:5173/pasan100323`

This is your secret admin URL. Keep it private!

## Login Process

### Step 1: Enter Email
1. Go to `/pasan100323`
2. Enter your admin email: `pasancp2000@gmail.com`
3. Click "Send OTP"

### Step 2: Check Email
- You'll receive an email with a 6-digit OTP code
- The code expires in 10 minutes
- Maximum 3 OTP requests per hour per IP

### Step 3: Enter OTP
1. Enter the 6-digit code from your email
2. Click "Verify & Login"
3. You'll be redirected to the dashboard

## Dashboard Features

### Projects Management
- **View**: See all your GitHub projects
- **Add**: Click "Add New project" button
- **Edit**: Click edit icon on any project
- **Delete**: Click trash icon (with confirmation)

**Fields:**
- Title
- Description
- Tech Stack (comma-separated)
- Repository URL
- Live URL

### Experience Management
- Add/edit work experience
- Fields: Company, Role, Period, Achievements

### Skills Management
- Add/edit technical skills
- Fields: Name, Category, Logo URL

### Education Management
- Add/edit education details
- Fields: Degree, Institution, Period, GPA

## Security Features

✅ **OTP Authentication**: One-time passwords via email
✅ **JWT Tokens**: 30-minute session expiry
✅ **Rate Limiting**: Max 3 OTP requests/hour
✅ **Auto Logout**: After 30 minutes of inactivity
✅ **Secure Routes**: All admin APIs require authentication

## Important Notes

1. **Session Management**
   - Sessions expire after 30 minutes
   - You'll be auto-logged out and redirected to login

2. **Data Persistence**
   - All changes are saved to your data files
   - Changes reflect immediately on the portfolio

3. **Email Requirements**
   - Only `pasancp2000@gmail.com` can access admin
   - OTP codes are sent from `pasanmama5@gmail.com`

4. **Troubleshooting**
   - If OTP doesn't arrive, check spam folder
   - If rate limited, wait 1 hour
   - If session expires, just login again

## Running the Admin Portal

### Start Backend Server
```bash
cd server
npm run dev
```
Server runs on: `http://localhost:5000`

### Start Frontend
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

### Access Admin
Navigate to: `http://localhost:5173/pasan100323`

## API Endpoints

All admin endpoints require `Authorization: Bearer <token>` header

### Authentication
- `POST /api/auth/request-otp` - Request OTP code
- `POST /api/auth/verify-otp` - Verify OTP and get token

### Admin CRUD
- `GET /api/admin/projects` - Get all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

Same pattern for: `/experience`, `/skills`, `/education`

## Tips

- **Bookmark** the admin URL for quick access
- **Keep OTP emails** for reference
- **Regular backups** of your data files
- **Test changes** before deploying

## Support

If you encounter issues:
1. Check browser console for errors
2. Verify backend server is running
3. Confirm email credentials are correct
4. Check `.env` file configuration
