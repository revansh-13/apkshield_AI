# APKShield AI Backend Architecture

## Overview

The backend follows a layered architecture where each module has a single responsibility.
The system is designed to separate APK parsing, risk assessment, AI explanation, and API handling into independent layers.

---

## Core Principles

### 1. Single Responsibility Principle

Every module is responsible for one task only.

Examples:
- Upload API handles HTTP requests.
- Loader initializes APK analysis.
- Parsers extract structured information.
- Risk Engine evaluates security risks.
- AI explains the Risk Engine's findings.

---

### 2. Parser ≠ Risk Engine

The parser only extracts facts from the APK.

The Risk Engine interprets those facts and calculates the security score.

---

### 3. AI Never Makes Security Decisions

AI is responsible only for explaining the results produced by the Risk Engine.

Security decisions always come from deterministic rules.

---

### 4. Preserve Raw Information

Parsers never discard information.

If data cannot be extracted, return `None` instead of guessing.

---

### 5. Machine-Readable Backend

The backend returns native Python data types.

Examples:
- int
- bool
- datetime
- list
- dict
- None

Formatting is handled by the frontend.

---

### 6. Open/Closed Principle

New parsers should be added through the parser registry without modifying the parser pipeline.

---

### 7. Android Knowledge Separation

Android-specific metadata belongs inside:

app/android/

Parser modules should never hardcode Android knowledge.

---

## Backend Layers

Client

↓

FastAPI

↓

Upload Pipeline

↓

APK Loader

↓

Parser Pipeline

↓

Risk Engine

↓

AI Explanation Layer

↓

Frontend Dashboard

---

## Development Philosophy

Every feature follows the same workflow:

Design

↓

Discuss Responsibilities

↓

Implementation

↓

Testing

↓

Review

↓

Refactor

The project prioritizes software engineering principles over rapid implementation.