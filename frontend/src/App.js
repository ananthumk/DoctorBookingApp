import { useState } from 'react';
import './App.css';
import DoctorDetailsPage from './pages/DoctorDetailsPage/DoctorDetailsPage';
import LandingPage from './pages/LandingPage/LandingPage'
import { Routes, Route } from 'react-router-dom'
import { Appcontext } from './Context/AppContext';

function App() {
  const [searchQuery, setSearchQuery] = useState('')
  const backendUrl = 'https://doctorbookingapp-docm.onrender.com'
  return (
    <Appcontext.Provider value={{
      searchQuery, setSearchQuery, backendUrl
    }}>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path='/doctor/:id' element={<DoctorDetailsPage />} />
        </Routes>
      </div>
    </Appcontext.Provider>
  );
}

export default App;
