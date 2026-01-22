# EdTech Assignment Management System

A full-stack **role-based EdTech platform** where **Admins**, **Mentors**, and **Students** collaborate through assignments, submissions, and reviews.

Built with **Next.js App Router**, **MongoDB**, **JWT authentication**, and **role-based access control (RBAC)**.

---

## Features

### Student
- View available assignments (auto-filtered)
- Submit assignment (only once per assignment)
- Edit submission before deadline and Review
- View mentor feedback & score
- Track submission status (submitted / reviewed)

### Mentor
- View assigned student submissions
- Review submissions (feedback + score)
- View reviewed submissions
- Mentor dashboard statistics

### Admin
- Create, update, and soft-delete assignments
- Assign mentors to assignments
- View mentor & student overview
- Platform-wide statistics dashboard

---

## Authentication & Authorization

- JWT-based authentication
- Role-based access control (RBAC)
- Protected routes using **Next.js `proxy` middleware**
- Automatic redirection for unauthorized access

### Supported Roles
- `admin`
- `mentor`
- `student`

---

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- React + TypeScript
- Tailwind CSS
- React Query
- Zod + Formik
- Lucide Icons

### Backend
- Next.js Route Handlers
- MongoDB + Mongoose
- JWT Authentication
- Aggregation pipelines
- Soft delete pattern (`isDeleted`)




##  Core Business Logic

### Assignment Status
- `open` → before due date
- `closed` → after due date
- `deleted` → soft-deleted (`isDeleted: true`)

### Submission Rules
- A student can submit **only once per assignment**
- Editing allowed only if:
  - assignment is `open`
  - submission status is `submitted`

### Mentor Review Rules
- Mentor can review **only assignments assigned to them**
- Mentor ownership verified via `Assignment → mentorId`

---

## API Endpoints

### Student
- `GET /api/student/assignments`
- `POST /api/student/submit`
- `PUT /api/student/submit/:id`
- `GET /api/student/submissions`
- `GET /api/student/stats`

### Mentor
- `GET /api/mentor/submissions`
- `PATCH /api/mentor/review`
- `GET /api/mentor/stats`

### Admin
- `POST /api/admin/assignment`
- `DELETE /api/admin/assignment/:id`
- `GET /api/admin/mentors`
- `GET /api/admin/stats`

---

## Middleware Protection

- Public routes: `/`, `/register`
- Static assets allowed (`/_next`, `/images`, `/fonts`)
- JWT validation for all protected routes
- Role-based route access enforcement

---

## Run Locally


npm install
npm run dev


## What This Project Demonstrates

Real-world RBAC implementation

Clean service-controller architecture

Secure middleware design

MongoDB aggregation usage

Production-ready full-stack patterns

Interview-ready system design


## Author

Pintu Kumar

GitHub: https://github.com/pintu1609

LinkedIn: https://www.linkedin.com/in/pintu-kumar-46b147204/

## Environment Variables

Create a `.env.local` file:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN_EXPIRY_DAY=2d