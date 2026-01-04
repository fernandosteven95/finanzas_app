# Lib Directory

This directory contains utility functions, shared logic, and configuration files.

## Contents
- `prisma.ts`: The singleton instance of the Prisma Client to prevent multiple connections in development.
- `utils.ts`: Helper functions (e.g., class name merging with `clsx` and `tailwind-merge`).
- `actions.ts` (or `actions/` folder): Server Actions for data mutation.
- `types.ts` (or `types/` folder): Shared TypeScript definitions.

## Guidelines
- Keep logic pure and testable where possible.
- Business logic that doesn't depend on UI should live here.
