# 🧪 Rick & Morty Wiki App

A modern web application for exploring characters, episodes, and locations from the "Rick and Morty" universe, built with the official [Rick and Morty API](https://rickandmortyapi.com/).

This project is built with a strong focus on **clean architecture**, **type safety**, and **responsive UI/UX**.

---

## 🚀 Tech Stack

* **Core:** React 18, TypeScript
* **Styling:** SCSS Modules, CSS Variables, Fluid Typography (`clamp`)
* **Routing:** React Router v6
* **Build Tool:** Vite
* **State & Persistence:** React Hooks (`useState`, `useEffect`), LocalStorage

---

## ✨ Key Features

* **Character Directory:** Pagination, search by name, and filtered results.
* **Episode & Location Filtering:** Dynamic character fetching via custom `<Select />` dropdown components.
* **Client-side Pagination:** Optimized data slicing for seamless navigation across character subsets.
* **Responsive Layout:** Mobile-first layout adjustments ensuring zero horizontal overflow across mobile, tablet, and desktop viewports.
* **State Persistence:** Automatic active page saving using `LocalStorage`.

---

## 🛠️ Architecture Highlights

* **Single Source of Truth:** Centralized data contracts (`CharacterType`, `EpisodeData`, `LocationData`) defined in `types.ts`.
* **Reusable UI Components:** Modular `PageHeader`, `Select`, and `Pagination` components with strict prop typing.
* **Scoped Styling:** SCSS Modules implementation preventing CSS class leakage and name collisions *(currently undergoing further refinements)*.

---

## 🚦 Quick Start

### Prerequisites
Make sure you have the following installed:
* **Node.js** (v18.x or higher)
* **npm** or **yarn**

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/elenaorowsski/rick-and-morty-wiki.git](https://github.com/elenaorowsski/rick-and-morty-wiki.git)
   cd rick-and-morty-wiki

2. Install dependencies:
   ```bash
   npm install

3. Start the development server:
   ```bash
   npm run dev

4. Open http://localhost:5173 in your browser.