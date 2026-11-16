# Real Estate Property Management & Booking Platform

A full-stack real estate web application built to simplify property discovery, listing management, and property visit bookings. The platform provides separate user and admin functionality with secure authentication, property management, image uploads, and booking notifications.

## Tech Stack

### Frontend
- React.js 18
- Vite 7
- Tailwind CSS 4
- React Router DOM
- Axios
- Framer Motion
- Lucide React
- React Hot Toast
- React Select
- jsPDF & jsPDF AutoTable

### Backend
- Node.js
- Express.js 5
- MongoDB
- Mongoose

### Authentication & Security
- JSON Web Tokens (JWT)
- Access & Refresh Tokens
- OTP Verification
- bcryptjs
- Role-Based Access Control (RBAC)

### Third-Party Integrations
- Cloudinary – Property image storage
- Multer – File uploads
- Nodemailer – Email notifications

### Development & Testing
- Git & GitHub
- ESLint
- Nodemon
- Jest
- Supertest

## Key Features

### User Features
- OTP-based user verification
- Secure password-based login
- JWT authentication and token refresh
- Browse available properties
- Search properties by location and price range
- Filter properties by BUY or RENT
- View featured properties
- View detailed property information
- Submit property visit booking requests
- View bookings using email
- Cancel booking requests
- Submit contact enquiries

### Admin Features
- Admin registration and login
- Role-based admin access
- Create, update, and delete property listings
- Upload multiple property images
- Manage registered users
- View and manage booking requests
- Approve or reject bookings
- Manage customer enquiries
- Booking status email notifications

### Backend Features
- RESTful API architecture
- MongoDB database integration
- Property listing pagination
- JWT authentication middleware
- Centralized error handling
- Custom 404 handling
- Cloudinary image integration
- Automated email notifications

## Project Structure

```text
Real-Estate-Platform/
│
├── Backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env
│   └── package.json
│
└── Frontend/
    ├── src/
    ├── public/
    ├── .env
    └── package.json
```

## API Documentation

Base URL:

```text
http://localhost:3060
```

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/send-otp` | Send OTP |
| POST | `/auth/verify-otp` | Verify OTP |
| POST | `/auth/login` | User login |
| POST | `/auth/refresh` | Refresh access token |

### Properties

| Method | Endpoint | Description |
|---|---|---|
| GET | `/properties` | Get all properties |
| GET | `/properties/:id` | Get property details |
| GET | `/properties/search` | Search properties |
| GET | `/properties/featured` | Get featured properties |
| GET | `/properties/type/:type` | Filter by property type |
| POST | `/properties/admin` | Create property |
| PUT | `/properties/admin/:id` | Update property |
| DELETE | `/properties/admin/:id` | Delete property |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| POST | `/bookings` | Create booking request |
| GET | `/bookings/user/:email` | Get user bookings |
| DELETE | `/bookings/delete/:id` | Cancel booking |
| GET | `/bookings` | Get all bookings (Admin) |
| DELETE | `/bookings/:id` | Delete booking (Admin) |

### Admin Bookings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/admin/bookings` | Get all bookings |
| PUT | `/admin/bookings/:id/status` | Update booking status |

### Admin Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/admin/create` | Create admin |
| POST | `/admin/login` | Admin login |
| PUT | `/admin/approve/:id` | Approve booking |
| PUT | `/admin/reject/:id` | Reject booking |
| PUT | `/admin/:id` | Update admin |
| GET | `/admin/users` | Get all users |
| DELETE | `/admin/users/:id` | Delete user |
| GET | `/admin/contacts` | Get contact enquiries |
| DELETE | `/admin/contacts/:id` | Delete contact enquiry |
| POST | `/admin/upload` | Upload property images |

### Contact

| Method | Endpoint | Description |
|---|---|---|
| POST | `/contacts` | Submit contact enquiry |

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Check server status |

**Note:** Admin-protected routes require a valid JWT Bearer token with the ADMIN role.

## Installation & Setup

### Prerequisites
- Node.js
- npm
- MongoDB database
- Cloudinary account
- Gmail account with an App Password (for email notifications)

### 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd Real-Estate-Platform
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the Backend directory:

```env
PORT=3060

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=15m

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

MAIL_USER=your_gmail_address
MAIL_PASSWORD=your_gmail_app_password
```

Start the backend server:

```bash
npm run dev
```

Backend runs at:

```text
http://localhost:3060
```

### 3. Frontend Setup

Open another terminal:

```bash
cd Frontend
npm install
```

Create a `.env` file inside the Frontend directory:

```env
VITE_API_URL=http://localhost:3060
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local frontend URL in the terminal.

## Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm start` | Start production server |
| `npm test` | Run Jest tests |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint checks |

## Security & Authentication

- Passwords are hashed using bcryptjs.
- JWT access tokens have a configurable expiry (15 minutes by default).
- Refresh tokens are stored with a 7-day expiry.
- Protected routes use Bearer token authentication.
- Admin operations are restricted through role-based authorization.
- Environment variables are used for sensitive configuration.

## Image & Email Services

**Cloudinary:** Property images are uploaded using Multer and stored in Cloudinary. The API returns secure image URLs.

**Nodemailer:** Gmail SMTP is used for OTP emails, booking request confirmations, and booking approval or rejection notifications.

## License

This project is developed for learning, development, and portfolio purposes.
