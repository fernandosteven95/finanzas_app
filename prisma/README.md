# Prisma Directory

This directory manages the Database Schema and migrations.

## Contents
- `schema.prisma`: The main configuration file defining the Database models and relationships.
- `migrations/`: History of SQL migrations applied to the database.

## Commands
- `npx prisma generate`: Update the TypeScript client after schema changes.
- `npx prisma migrate dev`: Apply schema changes to the implementation database and create a migration file.
- `npx prisma studio`: Open a GUI to view and edit data.
