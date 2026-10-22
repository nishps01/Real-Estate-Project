# Real Estate Backend — Node.js + Express.js + MongoDB

## Run

```bash
npm install
cp .env.example .env
```

`.env` file mein `MONGODB_URI` aur `JWT_SECRET` set karo.

```bash
npm run dev
```

Server default: http://localhost:3060

## Main Endpoint Mapping

- **Authentication:** `POST /auth/send-otp`, `/auth/verify-otp`, `/auth/login`, `/auth/refresh`
- **Properties:** `GET /properties`, `/properties/:id`, `/properties/type/:type`, `/properties/featured`, `/properties/search`
- **Admin Property CRUD:** `POST /properties/admin`, `PUT /properties/admin/:id`, `DELETE /properties/admin/:id`
- **Bookings:** `POST /bookings`, `GET /bookings/user/:email`, `DELETE /bookings/delete/:id`
- **Admin Bookings:** `GET /admin/bookings`, `PUT /admin/bookings/:id/status?status=APPROVED`
- **Contacts:** `POST /contacts`
- **Admin Contacts:** `GET /admin/contacts`, `DELETE /admin/contacts/:id`
- **Admin Management:** `/admin/create`, `/admin/login`, `/admin/users`, `/admin/upload`

## Security

- Protected routes ke liye `Authorization: Bearer <JWT>` header use hota hai.
- Admin routes ke liye token mein `ADMIN` role required hai.
- Database URL aur secret keys `.env` file mein rakho.
- `.env` ko Git mein commit mat karo.
