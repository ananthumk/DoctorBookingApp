🩺 Doctor Booking App
A full-stack web application that allows users to search for doctors, view detailed profiles, and book appointments online. Built using React (frontend) and Node.js + Express + MongoDB (backend).

📦 Project Structure
t
project/
├── frontend/    # React-based UI
├── backend/     # Express API with MongoDB
└── README.md    # This file
🌐 Live Demo
Frontend: https://doctorbookingapp.vercel.app
Backend API: https://doctorbookingapp-docm.onrender.com

📲 Features
🔍 Search doctors by name or specialization

📄 View detailed doctor profiles

📅 Book appointments with custom time & notes

📤 Upload doctor profile images

📈 Track availability status: Available Today / Fully Booked / On Leave

🧠 Technologies Used
Frontend (frontend/)
React v19

React Router v7

Axios

CSS Modules / Plain CSS

React Icons

Context API

Backend (backend/)
Node.js & Express.js

MongoDB + Mongoose

Multer (for file uploads)

dotenv & CORS

🚀 Getting Started
🔧 Prerequisites
Node.js v18+

MongoDB (local or MongoDB Atlas)

🖥️ Setup Instructions
1. Clone the Repo

git clone https://github.com/your-username/project_name
cd doctor-booking-app
2. Setup Backend

cd backend
npm install
Create a .env file:


MONGO_URL=mongodb://localhost:27017/db_name
PORT=3001
Start server:


npm start
Backend runs at: http://localhost:3001

3. Setup Frontend

cd ../frontend
npm install
Create a .env file:



REACT_APP_BACKEND_URL=
Start the React app: http://localhost:3001


npm start
Frontend runs at: http://localhost:3000

🧪 API Endpoints Summary
Method	Endpoint	Description
GET	/doctors	List all doctors (with search)
GET	/doctors/:id	Get doctor by ID
POST	/doctors	Create a doctor profile
DELETE	/doctor/:id	Delete doctor by ID
POST	/appointment	Book an appointment
GET	/appointment	List all appointments



📁 License
This project is licensed under the MIT License.

