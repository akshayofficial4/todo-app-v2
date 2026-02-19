# Full Stack MERN Todo App

This is a **Full Stack Todo Application** built using the **MERN stack** (MongoDB, Express, React, Node.js).  
The app supports user authentication and basic todo management features.  
The project is fully deployed.

---

## Live Demo

Frontend (Vercel):  
https://todo-app-v2-nu.vercel.app/

Backend (Render):  
https://todo-app-v2-zgmj.onrender.com

---

## Tech Stack

Frontend:
- React (Vite)
- Tailwind CSS
- JavaScript

Backend:
- Node.js
- Express.js
- MongoDB
- JWT Authentication

Deployment:
- Vercel (Frontend)
- Render (Backend)

---

## Features

- User registration and login
- JWT-based authentication
- Create todos
- Edit todos
- Mark todos as completed
- Delete todos
- Filter todos (All / Active / Completed)
- Responsive UI

---

## Project Structure

todo-app-v2/
├── backend/
│ ├── server.js
│ ├── package.json
│ └── src/
│
├── frontend/
│ ├── src/
│ ├── index.html
│ └── package.json
│
└── README.md


---

## Environment Variables

### Backend

Create a `.env` file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000


### Frontend

Create a `.env` file inside the frontend folder:

VITE_API_URL= http://localhost:5000 ( your url)


---

## Run the Project Locally

### Backend

cd backend
npm install
npm run dev


### Frontend

cd frontend
npm install
npm run dev

---

## Author

Akshay  
GitHub: https://github.com/akshayofficial4
