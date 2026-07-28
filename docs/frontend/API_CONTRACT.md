# API Contract

## Upload APK

POST /analyze

Request

multipart/form-data

Field

file

Response

{
  "status": "success",

  "analysis": {},

  "risk": {},

  "ai": {}
}

---

# Risk Object

risk_score

risk_level

findings

summary

---

# Finding

rule_id

title

description

severity

recommendation

category

---

# AI

summary

explanation

recommendations