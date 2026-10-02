# Next.js Dashboard 📊

A simple invoice dashboard built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Features ✨

- Dashboard with revenue and invoice information
- Customer and invoice pages
- Login form with password hashing
- PostgreSQL database integration
- Responsive design with Tailwind CSS

## Requirements 🧰

- Node.js
- pnpm
- PostgreSQL database

## Getting Started 🚀

Install the dependencies:

```bash
pnpm install
```

Create a `.env` file in the project root and add your database URL:

```env
POSTGRES_URL=your_postgres_connection_string
```

Seed the database by opening this URL in your browser after starting the app:

```text
http://localhost:3000/seed
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Useful Commands 📌

```bash
pnpm dev      # Start the development server
pnpm build    # Create a production build
pnpm start    # Start the production server
```

## Main Pages 🗂️

- `/login` - Sign in
- `/dashboard` - View dashboard information
- `/dashboard/customers` - View customers
- `/dashboard/invoices` - View and manage invoices

## Learn More 📚

This project is based on the [App Router | Next.js](https://nextjs.org/learn/dashboard-app) course.
