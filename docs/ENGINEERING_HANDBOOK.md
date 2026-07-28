# APKShield AI Engineering Handbook

Version: Frontend v1.0

---

# Project Philosophy

APKShield AI is a production-quality software project.

This is NOT a prototype.

This is NOT a college assignment.

This is NOT a hackathon demo.

Every decision should prioritize:

- Maintainability
- Readability
- Scalability
- Type Safety
- Accessibility
- Performance

Architecture always takes priority over speed.

---

# Development Workflow

Every feature follows:

Engineering Task

↓

Implementation Plan

↓

Implementation

↓

Lint

↓

Build

↓

Review

↓

Git Commit

↓

Merge

Never skip steps.

---

# Folder Philosophy

Folders represent responsibilities.

Components never contain business logic.

Business logic never contains UI.

API communication never happens inside components.

Pages compose features.

Features compose shared components.

---

# Frontend Architecture

Application

↓

Layout

↓

Pages

↓

Features

↓

Shared Components

↓

Services

↓

Backend

---

# Folder Responsibilities

app/

Routing only.

Never place reusable UI here.

components/

Reusable UI.

No API calls.

hooks/

Business logic.

services/

Backend communication.

One service per domain.

types/

Only interfaces and shared types.

lib/

Utilities.

config/

Application configuration.

constants/

Static values.

styles/

Animations and theme.

---

# Component Rules

Every component has one responsibility.

Maximum file size:

~250 lines.

If larger,

split it.

Never duplicate components.

Never duplicate Tailwind classes unnecessarily.

Prefer composition over inheritance.

---

# React Rules

Use Server Components by default.

Use Client Components only when required.

Avoid prop drilling.

Prefer composition.

Keep state local whenever possible.

---

# TypeScript Rules

Strict mode.

No any.

No unknown without narrowing.

Prefer interfaces for public APIs.

Use types for unions.

Never suppress compiler errors.

---

# API Rules

Never call axios inside components.

Never call fetch inside components.

All backend communication goes through services/.

Backend responses must match API_CONTRACT.md.

Never invent API responses.

---

# Styling Rules

Tailwind only.

Use shadcn components whenever possible.

No inline styles.

Dark theme first.

Professional cybersecurity appearance.

No excessive gradients.

No glassmorphism.

Minimal animations.

---

# Accessibility

Semantic HTML.

Keyboard navigation.

ARIA labels.

Visible focus.

Color contrast.

---

# Performance

Lazy load large sections.

Memoize only when needed.

Optimize images.

Avoid unnecessary rerenders.

---

# Documentation

Every feature starts with a task.

Every implementation updates documentation if necessary.

Documentation is the source of truth.

Never let code drift from docs.

---

# Code Quality

Readable code is preferred over clever code.

Favor explicitness.

Write production-quality software.

Always explain created and modified files after implementation.