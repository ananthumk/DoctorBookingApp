Doctor Booking App - Frontend
Overview
This is the frontend React application for the Doctor Booking App. It provides users with an intuitive interface to:

Search for doctors by name or specialization.

View detailed doctor profiles.

Book appointments via a modal popup form.

The app communicates with a backend REST API to fetch doctor data and manage appointments.

🛠️ Technologies Used
React v19 – UI Library

React Router v7 – Routing & navigation

Axios – HTTP client for API requests

React Icons – Icon library

CSS Modules / Regular CSS – Styling

Context API – Global state management


📁 Project Structure
css
Copy
Edit
src/
├── components/
│   ├── Navbar/
│   ├── DoctorList/
│   ├── BookAppointment/
├── pages/
│   ├── LandingPage/
│   ├── DoctorDetailsPage/
├── Context/
│   └── AppContext.js
├── App.js
├── index.js
├── App.css
⚙️ Available Scripts
In the project root directory, you can run:

npm start
Runs the app in development mode.
Open http://localhost:3000 to view it in the browser.

npm run build
Builds the app for production to the build/ folder.
Minifies code and includes hashed filenames.

npm test
Launches the test runner in watch mode.

npm eject
Use with caution. This is irreversible and exposes build config.

ℹ️ Make sure your package.json uses react-scripts for these to work.

🌐 Environment Variables
Create a .env file in the project root:

env
Copy
Edit
REACT_APP_BACKEND_URL=https://doctorbookingapp-docm.onrender.com
The backend URL is stored in context (AppContext.js) and used across the app.

🔍 Features & Components
1. App.js
Root component

Sets up React Router routes:

/ → LandingPage

/doctor/:id → DoctorDetailsPage

Provides global context with:

searchQuery for filtering doctors

backendUrl for API calls

2. LandingPage
Shows top navbar with logo and search bar

Filters doctors by name/specialization using searchQuery

Displays doctors via DoctorList component

3. Navbar
App logo

Global search input (updates searchQuery)

Placeholder for future user profile icon

4. DoctorList
Fetches doctors from API filtered by searchQuery

Shows cards with photo, name, specialization, availability

Clicking a card navigates to detailed profile

5. DoctorDetailsPage
Fetches doctor details by ID

Displays:

About section

Education and expertise

Weekly availability

If available, shows "Book Appointment" button

6. BookAppointment Modal
Controlled form collects:

Patient name, email, date, time, and notes(optional)

Posts data to backend

Displays success message on booking

Can be closed via cancel or "X" icon

🎨 Styling
Responsive layout using Flexbox and Grid

CSS files (.css) for styling

Button colors indicate doctor availability (e.g., green = Available Today, red = Fully Booked and gray = On Leave)

