# Next.js Dashboard 📊

A simple invoice dashboard built with Next.js, TypeScript, Tailwind CSS, and PostgreSQL.

## Live Demo 🌐

View the deployed application at [Acme Dashboard](https://nextjs-dashboard-course-liart.vercel.app/).

## Demo Login 🔐

This project does not include a signup flow. Use the following demo credentials to sign in:

```text
Email: user@nextmail.com
Password: 123456
```



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

### Set up the database

This project uses PostgreSQL. Follow the official Next.js guide for creating and connecting a database:

[Set up the database for the Next.js Dashboard](https://nextjs.org/learn/dashboard-app/setting-up-your-database)

After creating the database, create a `.env` file in the project root. Add your own connection string and authentication secret:

```env
POSTGRES_URL=your-postgres-connection-string
AUTH_SECRET=generate-a-long-random-secret
```

Keep `.env` private. Do not commit database credentials or secret keys to Git.

Start the development server:

```bash
pnpm dev
```

In a separate terminal, seed the database by opening this URL:

```text
http://localhost:3000/seed
```

After the seed request completes, open the dashboard:

[http://localhost:3000](http://localhost:3000)

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

## Certificate 🏆

![Next.js App Router Fundamentals certificate](./public/next-js-app-router-fundamentals.png)

## Learn More 📚

This project is based on the [App Router | Next.js](https://nextjs.org/learn/dashboard-app) course.
