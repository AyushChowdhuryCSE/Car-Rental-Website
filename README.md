# 🚗 Car Rental Management System (MERN + Vite)

A full‑stack **Car Rental Website** built using the **MERN stack with Vite** that allows users to browse cars, book rentals, and manage reservations, while providing an admin system for managing vehicles and users.

---

## 📁 Project Structure

```
carrental/
│
├── client/                 # Frontend (Vite + React)
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                 # Backend (Node + Express)
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ✨ Features

### 👤 User Features

* Browse available cars
* View car details with images & specs
* Book cars for specific dates
* User authentication (Login / Register)
* View booking history

### 🛠 Admin Features

* Add / update / delete cars
* Manage users
* View all bookings

### ⚙ System Features

* JWT‑based authentication
* Role‑based access control
* RESTful API
* Secure routes using middleware
* Context API for global state
* Responsive UI

---

## 🧰 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Context API
* Axios

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

---

## ⚙️ Environment Variables

### Client (`client/.env`)

```
VITE_BASE_URL=http://localhost:5000
```

### Server (`server/.env`)

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## 🚀 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/car-rental-website.git
cd carrental
```

---

### 2️⃣ Install Dependencies

#### Frontend

```bash
cd client
npm install
```

#### Backend

```bash
cd server
npm install
```

---

### 3️⃣ Run the Project

#### Start Backend

```bash
cd server
npm start
```

#### Start Frontend

```bash
cd client
npm run dev
```

Frontend ➜ `http://localhost:5173`
Backend ➜ `http://localhost:5000`

---

## 🔐 API Structure

```
/api/users      → User routes
/api/cars       → Car routes
/api/bookings   → Booking routes
```

---

---

## ✅ Future Enhancements

* Online payment gateway integration
* Live car availability tracking
* Admin dashboard with analytics
* Email & SMS booking notifications
* Ratings & reviews system
* Multi‑language support

---

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m "Add feature"`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Author

Developed by Ayush Chowdhury
GitHub: https://github.com/AyushChowdhuryCSE

---

⭐ If you like this project, don’t forget to star the repository!
