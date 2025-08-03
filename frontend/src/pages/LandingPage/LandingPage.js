import React, { useContext } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './LandingPage.css'
import DoctorList from '../../components/DoctorList/DoctorList'
import { Appcontext } from '../../Context/AppContext'

const LandingPage = () => {
  const {searchQuery, setSearchQuery} = useContext(Appcontext)
  return (
    <div className='landing-page-container'>
        <Navbar />
        <div className='doctor-list-page' style={{marginTop: '5%'}}>
          <h1>Find Your Doctor</h1>
          <p>Choose from our experienced healthcare professionals</p>
           <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='search-input' placeholder='Search doctors by name and specialization' />
          <DoctorList />
        </div>
    </div>
  )
}

export default LandingPage