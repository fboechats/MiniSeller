# MiniSeller

MiniSeller is a small, end-to-end frontend application that simulates a lightweight e-commerce experience.

Rather than focusing on feature volume, this project demonstrates how I approach real-world product development: clear architecture, predictable state management, and thoughtful UX decisions, all with an emphasis on maintainability and long-term ownership.

---

## ✨ Project Goals

* Build a realistic product-like application rather than a toy example
* Keep the codebase simple, readable, and easy to evolve
* Focus on clear data flow, component responsibility, and UI feedback
* Avoid unnecessary abstractions or over-engineering

---

## 🧩 Features

* Product listing with dynamic rendering
* Cart management (add/remove/update items)
* Derived state handling (totals, quantities)
* Clear UI feedback for user actions
* Responsive and clean layout

---

🏗 Architecture & Decisions

The application is structured around a few core principles commonly applied in production systems:

- Predictable state management: state is colocated where it naturally belongs, while derived data (totals, quantities) is calculated explicitly to avoid hidden coupling.
- Clear separation of concerns: UI components focus on rendering and interaction, while business logic is isolated and reusable.
- Readable, intention-revealing components: components are kept small and named after *what* they do, not *how* they do it.
- Minimal dependencies: only tools that provide clear, immediate value are included, avoiding unnecessary abstractions.

This mirrors how I would design a codebase meant to scale in complexity while remaining approachable to multiple engineers over time.

---

## 🛠 Tech Stack

* TypeScript
* React
* Modern CSS (utility-first approach)

---

## 📁 Project Structure

```
src/
  components/   # Reusable UI components
  data/         # Database sample
  hooks/        # Custom React hooks
  utils/        # Shared utilities and helpers
```

The structure favors scalability without introducing unnecessary complexity.

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

---

## 🧠 What This Project Represents

MiniSeller reflects how I think about frontend engineering:

- Shipping code that is easy to reason about and modify
- Treating UX details (loading, empty states, feedback) as first-class concerns
- Writing software I would feel comfortable owning, evolving, and supporting long-term

While the scope is intentionally small, the engineering mindset is the same one I bring to large, production systems.

---

## 📌 Notes

This project can be easily extended with:

* Persistence (localStorage or backend)
* Tests (unit and integration)
* Pagination or filtering
* Animations and micro-interactions

The foundation was designed with those evolutions in mind.
