# EventSync

> A real-time event management and participant engagement platform — replacing static PDFs and paper programs with a dynamic, interactive experience.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database Setup](#database-setup)
- [Project Structure](#project-structure)
- [User Roles](#user-roles)
- [Scripts](#scripts)
- [Contributing](#contributing)

---

## Overview

**EventSync** is a Next.js-based platform designed for conferences, workshops, and events of any scale. It provides:

- A **public-facing** schedule with live session detection and Q&A
- An **admin interface** for organizers to manage events, sessions, rooms, and speakers
- **Personal itineraries** saved locally in the browser (no account required for attendees)

---

## Features

| Feature | Description |
|---|---|
| 📅 Multi-track schedule | Grid-based timeline view with parallel sessions per room |
| 🔴 Live session detection | Automatic badge when a session is currently in progress |
| 💬 Q&A system | Submit and upvote questions during live sessions |
| 🎤 Speaker profiles | Public pages with bio, photo, social links, and sessions |
| ⭐ Favorites / Personal itinerary | Bookmark sessions, stored in browser local storage |
| 🔐 Organizer dashboard | Authenticated admin panel to manage events, sessions, rooms, and speakers |
| 🏠 Room-based filtering | Browse sessions filtered by venue room |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| ORM | [Prisma 7](https://www.prisma.io/) |
| Database | PostgreSQL (via `pg`) |
| Auth | password hashing for admin accounts |
| Runtime | Node.js ≥ 20.9.0 |

---

## Prerequisites

Make sure you have the following installed:

- **Node.js** `>= 20.9.0`
- **npm** `>= 10`
- **PostgreSQL** instance (local or remote)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-org/event-sync.git
cd event-sync
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Then fill in your values (see [Environment Variables](#environment-variables)).

### 4. Set up the database

```bash
npx prisma migrate dev
```

### 5. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env` file at the project root with the following:

```env
# PostgreSQL connection string
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

> **Note:** Never commit your `.env` file to version control.

---

## Database Setup

EventSync uses **Prisma** as its ORM with a PostgreSQL database.

```bash
# Run pending migrations
npx prisma migrate dev

# Open Prisma Studio (GUI for your database)
npx prisma studio

# Generate the Prisma client after schema changes
npx prisma generate
```

The Prisma configuration file is located at `prisma/schema.prisma` and migrations are stored in `prisma/migrations/`.

---

## Project Structure

```
event-sync/
├── app/                    # Next.js App Router pages & layouts
├── components/             # Reusable React components
├── lib/                    # Shared utilities and server-side helpers
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Migration history
├── public/                 # Static assets
├── .env                    # Local environment variables (gitignored)
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS / Tailwind configuration
├── prisma.config.ts        # Prisma configuration
├── tsconfig.json           # TypeScript configuration
└── eslint.config.mjs       # ESLint configuration
```

---

## User Roles

### 🛠 Organizer (Admin)
Authenticated access only. Can create and manage events, sessions, rooms, and speaker profiles.

### 👥 Participant (Public)
No login required. Can browse the schedule, view live sessions, submit and upvote questions, and bookmark sessions.

### 🎤 Speaker
No authentication. Has a public profile page displaying their bio, links, and associated sessions.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint across the codebase |
---