# Frontend Architecture

## Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion
- Axios
- React Hook Form
- Zod

---

# Pages

/

Landing

/upload

Upload APK

/analysis/[id]

Analysis Dashboard

/history

Previous Analyses

/settings

Application Settings

---

# Component Layers

Pages

↓

Feature Components

↓

Shared Components

↓

Services

↓

Backend API

---

# State Flow

User

↓

Upload

↓

API

↓

Analysis Response

↓

Dashboard

↓

Findings

↓

AI

↓

Export

---

# Folder Responsibilities

app/

Routing

components/

Reusable UI

services/

Backend communication

hooks/

Business logic

types/

Interfaces

lib/

Utilities

config/

Configuration

constants/

Application constants

styles/

Animations & themes