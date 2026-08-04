# Contributing Guide

Thank you for your interest in contributing to **Lakshya Agarwal Portfolio 2.0**. We are committed to maintaining an exceptional standard of software craftsmanship, performance, and accessibility.

---

## 📜 Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please treat everyone with empathy and respect.

---

## 🛠️ Local Development Workflow

### 1. Fork & Clone

```bash
# Clone your fork
git clone https://github.com/<your-username>/sequence.git
cd sequence/portfolio

# Add upstream remote
git remote add upstream https://github.com/lak-is-law/sequence.git
```

### 2. Branch Naming Convention

Create a descriptive feature or fix branch from `main`:

```bash
# Feature branches
git checkout -b feat/canvas-lod-downsampling

# Bugfix branches
git checkout -b fix/safari-audio-context-unlock

# Performance branches
git checkout -b perf/d3-vector-projection-caching

# Documentation branches
git checkout -b docs/architecture-diagram-update
```

### 3. Install Dependencies

Ensure you are using **Node.js 18.17+** and **npm 9+**:

```bash
npm ci
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be live at `http://localhost:3000`.

---

## ✍️ Commit Message Guidelines (Conventional Commits)

We enforce the [Conventional Commits v1.0.0](https://www.conventionalcommits.org/) standard. All commit messages must follow this structure:

```
<type>(<optional scope>): <description>

[optional body]

[optional footer(s)]
```

### Allowed Types

| Type | Purpose | Example |
| :--- | :--- | :--- |
| `feat` | Introduces a new feature or interactive module | `feat(arcade): add keyboard accessibility to pixel football` |
| `fix` | Bug fixes | `fix(cursor): prevent ring stickiness on window blur` |
| `perf` | Code changes that improve performance / frame rate | `perf(scrolly): implement requestIdleCallback frame streaming` |
| `docs` | Documentation only changes | `docs(readme): add system architecture diagram` |
| `refactor` | Code changes that neither fix bugs nor add features | `refactor(audio): decouple oscillator factory nodes` |
| `test` | Adding or updating automated verification tests | `test(api): add rate limit sliding window unit test` |
| `chore` | Build tools, dependencies, and configuration changes | `chore(deps): bump next from 14.2.34 to 14.2.35` |

---

## 🧪 Pre-Pull Request Verification Checklist

Before submitting a Pull Request, run the following automated verification suite:

```bash
# 1. Strict TypeScript Compiler Check
npm run type-check

# 2. Next.js ESLint Linting
npm run lint

# 3. Production Production Build Validation
npm run build
```

Every PR must pass with **0 TypeScript errors** and **0 ESLint warnings**.

---

## 📬 Pull Request Submission Process

1. Push your branch to your GitHub fork:
   ```bash
   git push origin feat/your-feature-name
   ```
2. Open a Pull Request against the `main` branch of `lak-is-law/sequence`.
3. Fill out the standardized [Pull Request Template](.github/PULL_REQUEST_TEMPLATE.md):
   - Provide a clear summary of changes.
   - Attach visual screenshots or video recordings for UI changes.
   - Confirm adherence to WCAG 2.2 AA accessibility standards.
4. Maintainers will review your PR within 2–3 business days.
