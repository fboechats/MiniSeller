# MiniSeller

MiniSeller is a small, end-to-end frontend application that simulates a lightweight e-commerce experience. The goal of the project is not only to implement features, but to demonstrate how I approach real-world product development: clear architecture, predictable state, and a strong focus on maintainability and user experience.

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

## 🏗 Architecture & Decisions

The application is structured around a few core principles:

* **Predictable state management**: state is colocated where it makes sense and derived data is calculated explicitly.
* **Separation of concerns**: UI components focus on rendering, while business logic is kept isolated and reusable.
* **Readable components**: components are intentionally small and named after what they do, not how they do it.
* **Minimal dependencies**: only tools that provide clear value are included.

This mirrors how I would structure a production codebase that needs to be understood and maintained by multiple engineers over time.

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

* Shipping code that is easy to reason about
* Treating UX details (loading, empty states, feedback) as first-class concerns
* Writing code that I would feel comfortable owning long-term

While the scope is intentionally small, the mindset is the same one I bring to large, production systems.

---

## 📌 Notes

This project can be easily extended with:

* Persistence (localStorage or backend)
* Tests (unit and integration)
* Pagination or filtering
* Animations and micro-interactions

The foundation was designed with those evolutions in mind.
