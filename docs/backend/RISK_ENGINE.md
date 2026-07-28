# Risk Engine Architecture

## Overview

The Risk Engine is the deterministic security analysis layer of APKShield AI.

Its responsibility is to evaluate the structured output produced by the Parser and generate standardized security findings. The Risk Engine never parses APKs directly and never uses AI to determine whether an APK is secure.

The overall backend flow is:

```text
APK Upload
    ↓
Loader
    ↓
Parser
    ↓
Risk Engine
    ↓
AI Explanation
    ↓
Frontend Dashboard
```

---

# Design Principles

The Risk Engine follows these principles:

* Deterministic — Every rule is based on explicit conditions.
* Modular — Each security category is isolated into its own evaluator and rule set.
* Extensible — New security checks can be added without modifying existing modules.
* Explainable — Every finding contains evidence showing exactly why it was generated.
* AI-Free Decisions — AI explains findings but never determines risk.

---

# Folder Structure

```text
Risk_Engine/
│
├── engine.py
├── pipeline.py
├── evaluator.py
├── findings.py
├── scoring.py
├── weights.py
├── levels.py
│
├── evaluators/
│   ├── permissions.py
│   ├── certificates.py
│   ├── manifest.py
│   ├── urls.py
│   ├── components.py
│   └── strings.py
│
└── rules/
    ├── permissions.py
    ├── certificates.py
    ├── manifest.py
    ├── urls.py
    ├── components.py
    └── strings.py
```

---

# Component Responsibilities

## engine.py

Public entry point for the Risk Engine.

Responsible for:

* Accepting parser output
* Calling the evaluation pipeline
* Returning the final risk report

Public API:

```python
calculate_risk(parser_output)
```

---

## pipeline.py

Coordinates all evaluator modules.

Responsibilities:

* Execute each evaluator
* Collect findings
* Calculate risk score
* Determine risk level
* Build the final risk report

The pipeline contains orchestration only.

---

## evaluator.py

Contains shared evaluation utilities.

Current public function:

```python
run_rules()
```

Responsibilities:

* Execute a collection of rules
* Collect generated findings
* Return standardized findings

No security logic belongs here.

---

## evaluators/

Each evaluator is responsible for one parser output category.

Examples:

* Certificates
* Manifest
* Permissions
* URLs
* Components
* Strings

Responsibilities:

* Receive parser output
* Pass data to the appropriate rule registry
* Return findings

Evaluators never contain security decisions.

---

## rules/

Rules are the core of the Risk Engine.

Each rule evaluates exactly one security property.

Examples:

* Debug Certificate
* SHA-1 Certificate
* Self-Signed Certificate
* Debuggable Application
* Missing Target SDK

Rules are:

* Independent
* Deterministic
* Stateless

Each rule either:

* Returns a finding
* Returns None

---

## findings.py

Responsible for the standardized finding schema.

Each finding contains:

* Rule ID
* Title
* Severity
* Description
* Category
* Evidence

---

## weights.py

Central registry for all detection rules.

Responsibilities:

* Rule identifiers
* Rule weights

Example:

```python
RULE_DEBUG_CERTIFICATE = "CERT-002"

_RISK_WEIGHTS = {
    RULE_DEBUG_CERTIFICATE: 20,
}
```

Every new rule must be registered here.

---

## scoring.py

Converts findings into a numerical risk score.

Responsibilities:

* Read rule IDs
* Look up weights
* Calculate total score

---

## levels.py

Maps numerical scores to human-readable risk levels.

Example:

```text
Score
    ↓
LOW
MEDIUM
HIGH
CRITICAL
```

---

# Evaluation Flow

```text
Parser Output
        │
        ▼
Pipeline
        │
        ▼
Evaluator
        │
        ▼
Rule Registry
        │
        ▼
Individual Rules
        │
        ▼
Findings
        │
        ▼
Scoring
        │
        ▼
Risk Level
        │
        ▼
Risk Report
```

---

# Rule Architecture

Every rule follows the same structure.

1. Extract required fields.
2. Evaluate one security property.
3. Return `None` if the condition is not met.
4. Return a standardized finding if the condition is met.

Rules should never:

* Modify parser output
* Calculate risk scores
* Call other rules
* Perform parsing

---

# Rule Design Principles

Every rule should:

* Evaluate one security property.
* Be independent of other rules.
* Produce deterministic results.
* Return minimal evidence explaining why it matched.

Multiple findings may be generated from the same artifact.

Example:

```text
Certificate
    ├── Debug Certificate
    ├── SHA-1 Certificate
    └── Self-Signed Certificate
```

---

# Adding a New Rule

Adding a new rule follows a consistent workflow.

1. Add a Rule ID to `weights.py`.
2. Assign a risk weight.
3. Implement the rule in the appropriate file under `rules/`.
4. Register the rule in the module registry.
5. Verify the evaluator imports the registry.
6. Test with a real APK.
7. Confirm:

   * Finding appears
   * Risk score changes
   * API response is correct

---

# Current Modules

## Completed

* Certificates
* Manifest
* Permissions

## In Progress

* URLs

## Planned

* Components
* Strings

---

# Future Improvements

Planned enhancements include:

* Additional certificate rules
* Component security analysis
* Advanced URL analysis
* String analysis
* Network Security Configuration analysis
* Native library analysis
* Automated unit tests
* Rule catalog documentation

---

# Architecture Status

Current Status:

**Architecture Frozen (Sprint 5)**

Future development should focus on adding new rules and evaluators without changing the overall architecture unless a significant design issue is identified.
