# Replit Development Guide

## Overview

This is a full-stack web application built as a portfolio website for Rishabh Tiwari, featuring a space-themed design with modern technologies. The application serves as both a personal portfolio showcase and a foundation for space-related web applications, with real-time satellite tracking capabilities and 3D interactive visualizations.

## System Architecture

The application follows a monorepo structure with clear separation between frontend, backend, and shared components:

- **Frontend**: React-based SPA with TypeScript and Tailwind CSS
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but extensible)
- **Styling**: Tailwind CSS with shadcn/ui components and space-themed design system
- **Build System**: Vite for frontend bundling and esbuild for backend compilation

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **UI Library**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom space-themed color palette
- **Animation**: Framer Motion for smooth animations and transitions

### Backend Architecture
- **Server**: Express.js with TypeScript
- **API Design**: RESTful endpoints with structured error handling
- **Storage**: In-memory storage implementation with interface for database abstraction
- **Middleware**: Custom logging, JSON parsing, and error handling

### Database Schema
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Basic user authentication structure (extensible)
- **Migrations**: Automated database schema management

### UI Component System
- **Base**: shadcn/ui component library with consistent theming
- **Custom Components**: Space-themed portfolio sections (Hero, About, Projects, Skills, etc.)
- **Interactive Elements**: Animated stars, particles, and cosmic visual effects

## Data Flow

1. **Client Requests**: React components make API calls through TanStack Query
2. **Server Processing**: Express.js handles requests with middleware pipeline
3. **Data Storage**: Currently uses in-memory storage, easily extensible to PostgreSQL
4. **Response Handling**: Structured JSON responses with error handling
5. **State Management**: Client-side caching and synchronization via TanStack Query

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React DOM, React Router (Wouter)
- **Backend**: Express.js, TypeScript execution (tsx)
- **Database**: Drizzle ORM, Neon Database serverless driver
- **UI/UX**: Radix UI primitives, Tailwind CSS, Framer Motion
- **Development**: Vite, TypeScript, PostCSS

### Build and Deployment
- **Development**: Vite dev server with HMR and proxy setup
- **Production**: Static asset generation with Express.js API server
- **Database**: PostgreSQL with connection pooling support

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` starts both frontend and backend concurrently
- **Hot Reloading**: Vite provides instant feedback for frontend changes
- **API Proxy**: Development server proxies API requests to Express backend

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: esbuild compiles TypeScript server to `dist/index.js`
- **Deployment**: Single production command serves static files and API endpoints

### Database Setup
- **Schema Management**: `npm run db:push` applies schema changes
- **Environment**: DATABASE_URL environment variable required
- **Connection**: Neon serverless PostgreSQL integration

## Changelog

Changelog:
- June 26, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.