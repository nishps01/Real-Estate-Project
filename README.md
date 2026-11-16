# Real Estate Property Management & Booking Platform

A full-stack real estate web application built to streamline property discovery, listing management, customer enquiries, and property visit bookings through dedicated user and admin interfaces.

## Key Features

- **User Authentication:** OTP-based registration, secure login, JWT access and refresh tokens.
- **Property Management:** Browse, search, filter, and view property listings.
- **Booking Management:** Submit property visit requests and track booking status.
- **Admin Dashboard:** Manage properties, registered users, bookings, and customer enquiries.
- **Booking Workflow:** Approve or reject booking requests with automated email notifications.
- **Image Management:** Multiple property image uploads with Cloudinary integration.
- **Contact Management:** Handle customer enquiries through the admin dashboard.
- **CSV Export:** Export booking records for administrative use.

## Technology Stack

**Frontend:** React.js, Tailwind CSS, Axios, Vite

**Backend:** Node.js, Express.js, REST APIs

**Database:** MongoDB, Mongoose

**Authentication:** JWT, OTP Verification, Access & Refresh Tokens

**Integrations:** Cloudinary, Multer, Nodemailer

## Installation & Setup

### 1. Clone Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Real-Estate-Project
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` from `.env.example`:

```powershell
Copy-Item .env.example .env
```

Configure your environment variables:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create a frontend `.env` file:

```env
VITE_API_URL=http://localhost:3000
```

Start the frontend:

```bash
npm run dev
```

## Main API Endpoints

| Module | Endpoints |
|---|---|
| Authentication | `/auth/send-otp`, `/auth/verify-otp`, `/auth/login`, `/auth/refresh` |
| Properties | `/properties`, `/properties/:id`, `/properties/type/:type`, `/properties/featured`, `/properties/search` |
| Property Management | `/properties/admin`, `/properties/admin/:id` |
| Bookings | `/bookings`, `/bookings/user/:email`, `/bookings/delete/:id` |
| Admin Bookings | `/admin/bookings`, `/admin/bookings/:id/status` |
| Contact | `/contacts`, `/admin/contacts` |
| Admin | `/admin/create`, `/admin/login`, `/admin/users`, `/admin/upload` |

## Security

- JWT-based authentication and protected routes.
- Role-based authorization for admin operations.
- Environment variables for sensitive credentials.
- Secure access and refresh token management.
- Admin-only access to management APIs.

## Developer

Full-Stack MERN Stack Project.
