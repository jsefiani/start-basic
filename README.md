# TanStack Start Basic Project

A modern React application built with TanStack Start, featuring internationalization with Lingui and styled with Tailwind CSS.

## Prerequisites

- Node.js (v18 or higher)
- npm, yarn, or pnpm

## Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Compile translations**
   ```bash
   npm run lingui:compile
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at http://localhost:3000

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lingui:extract` - Extract translatable strings
- `npm run lingui:compile` - Compile translations

## Features

- **TanStack Router** - Type-safe routing
- **Internationalization** - Multi-language support (English, French, Dutch)
- **Tailwind CSS** - Utility-first styling
- **TypeScript** - Full type safety
- **Vite** - Fast development and build tool

## Project Structure

- `src/routes/` - Application routes
- `src/components/` - Reusable components
- `src/locales/` - Translation files
- `src/lib/lingui/` - Internationalization utilities
