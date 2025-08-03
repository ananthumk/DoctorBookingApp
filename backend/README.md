Doctor Booking App - Backend
Overview
The Doctor Booking App backend is a RESTful API built with Express.js and MongoDB for managing doctors, appointments, and user interactions. It supports doctor profile management (including image uploads), searching doctors, booking appointments, and retrieving appointment information.

Technologies Used
Node.js (JavaScript runtime)

Express.js (Web framework)

MongoDB with Mongoose (Database and ORM)

Multer (File upload handling)

CORS (Cross-Origin Resource Sharing)

dotenv (Environment variable management)

Setup Instructions
Clone the repository:

bash
git clone <your-repository-url>
cd backend
Install dependencies:

bash
npm install
Create a .env file in the root directory with the following variables:

text
MONGO_URL=mongodb://localhost:27017/your-db-name or use mongodb altas
PORT=3001
Start the server:

bash
npm start
The server will listen on http://localhost:3001 (or the PORT you specify).

API Endpoints
1. Create a Doctor Profile (with image upload)
POST /doctors

Headers:
Content-Type: multipart/form-data

Body Params:

    name (String, required)

    specialization (String, required)

    availability (String: "Available Today" | "Fully Booked" | "On Leave", optional)

    schedule (Array of { date: String, time: String, status: String }, optional — send as JSON string)

    experience (String, required)

    about (String, required)

    education (String, required)

    areaOfExpertise (Array of Strings, required — send as JSON string)

    profileImage (File, optional)

    Example (using curl):

    bash
    curl -X POST http://localhost:3001/doctors \
    -H "Content-Type: multipart/form-data" \
    -F "name=John Doe" \
    -F "specialization=Cardiology" \
    -F "availability=Available Today" \
    -F 'schedule=[{"date":"2023-08-01","time":"9:00 AM","status":"Open"}]' \
    -F "experience=10" \
    -F "about=Experienced cardiologist" \
    -F "education=MBBS, MD" \
    -F 'areaOfExpertise=["Heart","Vascular"]' \
    -F "profileImage=@/path/to/image.jpg"
    Response:

    json
    {
    "_id": "64c8f1abcd1234567890abc1",
    "name": "John Doe",
    "specialization": "Cardiology",
    "availability": "Available Today",
    "schedule": [{"date":"2023-08-01","time":"9:00 AM","status":"Open"}],
    "experience": "10",
    "about": "Experienced cardiologist",
    "education": "MBBS, MD",
    "areaOfExpertise": ["Heart", "Vascular"],
    "profileImage": "/uploads/1627845123456-image.jpg",
    "createdAt": "2023-08-01T10:00:00.000Z",
    "updatedAt": "2023-08-01T10:00:00.000Z",
    "__v": 0
    }
2. Get All Doctors (with Optional Search)
GET /doctors?search=keyword

Query Params:

search (String, optional) — searches in doctor’s name and specialization.

Example:

    bash
    curl "http://localhost:3001/doctors?search=cardio"
    Response:

    json
    [
    {
        "_id": "64c8f1abcd1234567890abc1",
        "name": "John Doe",
        "specialization": "Cardiology",
        "availability": "Available Today",
        "profileImage": "/uploads/1627845123456-image.jpg"
    }
    ]
3. Get Doctor by ID
GET /doctors/:id

URL Params:

id (String) - MongoDB ObjectId of the doctor

Example:

    bash
    curl http://localhost:3001/doctors/64c8f1abcd1234567890abc1
    Response:

    json
    {
    "_id": "64c8f1abcd1234567890abc1",
    "name": "John Doe",
    "specialization": "Cardiology",
    "availability": "Available Today",
    "profileImage": "/uploads/1627845123456-image.jpg",
    "schedule": [...],
    "experience": "10",
    "about": "Experienced cardiologist",
    "education": "MBBS, MD",
    "areaOfExpertise": ["Heart", "Vascular"],
    "createdAt": "...",
    "updatedAt": "..."
    }
4. Create an Appointment
POST /appointment

Headers:
Content-Type: application/json

Body Params:

    doctorId (String, required)

    patientName (String, required)

    email (String, required)

    dateTime (String, required, e.g., "2023-08-10 10:00 AM")

    notes (String, optional)

    Example:

    bash
    curl -X POST http://localhost:3001/appointment \
    -H "Content-Type: application/json" \
    -d '{
            "doctorId": "64c8f1abcd1234567890abc1",
            "patientName": "Jane Smith",
            "email": "jane@example.com",
            "dateTime": "2023-08-10 10:00 AM",
            "notes": "Need consultation about chest pain"
        }'
    Response:

    json
    {
    "data": {
        "_id": "64c8f1f0cd234567890abcd2",
        "doctorId": "64c8f1abcd1234567890abc1",
        "patientName": "Jane Smith",
        "email": "jane@example.com",
        "dateTime": "2023-08-10 10:00 AM",
        "notes": "Need consultation about chest pain",
        "createdAt": "2023-08-01T10:10:00.000Z",
        "updatedAt": "2023-08-01T10:10:00.000Z",
        "__v": 0
    }
    }
5. Get All Appointments
GET /appointment

Response:

    json
    [
    {
        "_id": "64c8f1f0cd234567890abcd2",
        "doctorId": {
        "_id": "64c8f1abcd1234567890abc1",
        "name": "John Doe",
        "specialization": "Cardiology"
        },
        "patientName": "Jane Smith",
        "email": "jane@example.com",
        "dateTime": "2023-08-10 10:00 AM",
        "notes": "Need consultation about chest pain"
    }
    ]
6. Delete Doctor by ID
DELETE /doctor/:id

URL Params:

id (String) - MongoDB ObjectId of the doctor

Example:

    bash
    curl -X DELETE http://localhost:3001/doctor/64c8f1abcd1234567890abc1
    Response (Success):

    json
    { "message": "Deleted Successfully" }
    Response (Not Found):

    json
    { "message": "Doctor not found" }
