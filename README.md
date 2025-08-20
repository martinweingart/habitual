# Habitual

A modern habit tracker web application built with [Next.js](https://nextjs.org), Drizzle ORM, PostgreSQL, and shadcn/ui.

## Features

- User authentication and registration
- Create, edit, and delete habits
- Daily habit completion tracking
- Habit streaks and weekly progress charts
- Responsive, accessible UI with Tailwind CSS and shadcn/ui
- Optimistic UI updates for a smooth experience

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

2. **Set up your environment:**

   - Copy `.env.example` to `.env.development.local` and fill in your database and secret values.

3. **Run database migrations:**

   ```bash
   npm run db:migrate
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `src/app/` — Next.js app directory (routes, pages, layouts)
- `src/components/` — UI and feature components
- `src/lib/` — Database, actions, and utility functions
- `src/types/` — TypeScript types

## Tech Stack

- Next.js (App Router)
- Drizzle ORM
- PostgreSQL
- Tailwind CSS & shadcn/ui
- TypeScript

## Deployment

Deploy easily on [Vercel](https://vercel.com/) or your preferred platform.  
See [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## License

MIT
