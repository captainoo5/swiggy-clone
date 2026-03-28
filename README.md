# 🍔 Swiggy Clone – Frontend

A responsive React-based frontend for a food delivery platform inspired by Swiggy. This application allows users to browse food items, view details, manage a cart, and interact seamlessly with a backend API.

## 🚀 Live Demo

👉 [https://swiggy-clone-jade-ten.vercel.app](https://swiggy-clone-jade-ten.vercel.app)

## ✨ Features

- **Browse available food items** (catalog)
- **View detailed food preview**
- **Add/remove items from cart**
- **Dynamic cart updates** (quantity & total)
- **User authentication** (login/signup)
- **Conditional checkout** (login required)
- **Admin dashboard integration**
- **Responsive UI design**


## 🧰 Tech Stack

- **React** (Vite)
- **Axios** (API communication)
- **React Router** (navigation)
- **CSS / Tailwind CSS** (styling)


## 🔗 Backend Integration

This frontend connects to a Node.js + Express backend API.

👉 **Backend Repository**:
[https://github.com/captainoo5/swiggy-clone-backend](https://github.com/captainoo5/swiggy-clone-backend)

### 🔐 Authentication Flow
- Users can browse food without logging in
- Login is required only when proceeding to checkout
- JWT token is stored in `localStorage`
- Admin users have access to protected dashboard routes


## 🛒 Cart Functionality
- Cart state managed on frontend
- Stored in `localStorage` for persistence
- **Supports**:
  - Add item
  - Remove item
  - Update quantity
  - Calculate total price

## 📁 Project Structure

```text
src/
 ├── components/
 ├── pages/
 ├── services/
 ├── utils/
 ├── App.jsx
 └── main.jsx
```

## ⚙️ Environment Variables

Create a `.env` file in the root:

```env
VITE_API_URL=http://localhost:5000
```

For production:

```env
VITE_API_URL=https://your-backend-url.onrender.com
```

## 🧪 Running Locally

```bash
git clone https://github.com/captainoo5/swiggy-clone
cd swiggy-clone
npm install
npm run dev
```

## 📸 Screenshots
