# Components Directory

This directory contains reusable UI components used throughout the application.

## Structure
- `ui/`: Fundamental primitive components (buttons, inputs, cards) - often wraps Shadcn/UI or Radix primitives.
- `dashboard/`: Components specific to the dashboard view (charts, summarizing cards).
- `forms/`: Reusable form components and logic.
- `layout/`: Structural components like Navbar, Sidebar, Footer.

## Guidelines
- **Reusability**: Components should be as generic as possible.
- **Client Components**: If a component needs state (`useState`, `useEffect`), mark it with `"use client"`.
