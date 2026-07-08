# APK Parser Architecture

## Purpose

The parser subsystem extracts structured information from Android APK files.

It does not perform security analysis or calculate risk scores.

---

## Parser Responsibilities

A parser should:

- Extract information from an APK.
- Standardize the extracted data.
- Return structured Python objects.

A parser should never:

- Calculate risk.
- Guess missing values.
- Remove useful information.
- Use AI.

---

## Parser Pattern

Every parser follows the same architecture.

Extract

↓

Create Record

↓

Create Collection

↓

Public Parser

---

## Public API

Only two functions are exposed outside this package.

```python
from app.core.parsers import load_apk
from app.core.parsers import parse_apk