# Shivadevi Foundation Website (Full Stack)

Production-ready NGO website with:
- Frontend: React + Vite
- Backend: Node.js + Express + MongoDB
- Admin panel: JWT-based secured dashboard
- Content: Blog + Events + Contact/Volunteer/Newsletter flows
- Testing: Playwright end-to-end smoke suite

## Project Structure

```txt
brightearth 4/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── components/
│   │   ├── lib/
│   │   └── context/
│   ├── tests/                    # Playwright tests
│   ├── playwright.config.js
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
└── ADMIN_PANEL_DOCUMENTATION.md  # Client handover doc
```

## Quick Start

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)

### 1) Backend

```bash
cd backend
npm install
npm run dev
```

Runs at `http://localhost:5001` (as configured in backend).

### 2) Frontend

```bash
cd frontend
npm install
npm run dev
```

Vite runs at `http://localhost:3000` (or next free port, often `3001`).

## Environment Variables

### Frontend (`frontend/.env.local`)
- `VITE_API_URL` - Backend API URL (example: `http://localhost:5001/api`)

### Backend (`backend/.env`)
- `MONGODB_URI` - MongoDB connection URI
- `JWT_SECRET` - JWT secret for admin auth
- `ADMIN_EMAIL` - Admin login email
- `ADMIN_PASSWORD` - Admin login password
- `SMTP_HOST` - SMTP host
- `SMTP_USER` - SMTP username
- `SMTP_PASS` - SMTP password/app password

## Current Payment Flow

Donation page uses a QR-based payment flow:
- User fills donor details on `/donate`
- Clicks `Donate Now`
- Razorpay-style modal opens with QR code
- User scans QR and completes payment externally

## Admin Panel

### Login
- URL: `/admin/login`
- Default credential (change in production):
  - Email: `admin@brightearth.org`
  - Password: `BrightEarth@2024!`

### Main modules
- Dashboard
- Donations (view/filter/search)
- Contacts (status updates: new/read/replied/archived)
- Volunteers (view/filter)
- Subscribers (view)
- Posts (create/edit/delete)
- Upcoming Events (create/edit/delete)

Full usage guide for client:
- See `ADMIN_PANEL_DOCUMENTATION.md`

## API Notes (Admin)

Base prefix: `/api/admin`

Common routes:
- `POST /login`
- `GET /dashboard`
- `GET /donations`
- `GET /contacts`
- `PATCH /contacts/:id`
- `GET /volunteers`
- `GET /subscribers`
- `GET /posts`
- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`
- `GET /events`
- `POST /events`
- `PUT /events/:id`
- `DELETE /events/:id`

All admin routes (except login) require Bearer token.

## End-to-End Testing (Playwright)

From `frontend/`:

```bash
npm run test:e2e
```

Generate/open HTML report:

```bash
npm run test:e2e:report
```

Artifacts:
- `frontend/playwright-report/`
- `frontend/test-results/results.json`

## Deployment Notes

### Frontend
- Build with `npm run build`
- Deploy `frontend/dist` to Vercel/Netlify/etc.

### Backend
- Deploy Node service to Render/Railway/VPS
- Set all backend env vars
- Ensure `/uploads` static serving + persistent storage strategy

### Database
- Use MongoDB Atlas in production

## Support

Project handover includes:
- Source code
- Admin usage document
- Playwright smoke tests


