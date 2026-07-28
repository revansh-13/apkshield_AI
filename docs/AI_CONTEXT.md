# AI Context

Before writing any code:

1. Read PROJECT_CONTEXT.md.
2. Read the relevant documentation in docs/frontend or docs/backend.
3. Follow the architecture exactly.
4. Do not modify backend unless explicitly requested.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

## Rules

- Strict TypeScript
- No `any`
- One responsibility per component
- Responsive by default
- Accessible by default
- Use Server Components unless a Client Component is required
- Never invent backend responses
- Route all API calls through `services/`
- Keep components modular and reusable
- Explain created and modified files after implementation