# App Directory

This directory contains all the application routes, pages, and layouts, following the **Next.js App Router** structure.

## Structure
- `page.tsx`: The home page of the application.
- `layout.tsx`: The root layout shared across the entire app.
- `globals.css`: Global styles and Tailwind CSS directives.
- `[route]/page.tsx`: Sub-pages (e.g., `/dashboard`, `/transactions`).

## Guidelines
- **Server Components**: By default, all components here are Server Components. Use `"use client"` directive for interactive components.
- **Data Fetching**: Fetch data directly in `page.tsx` or `layout.tsx` when possible.
