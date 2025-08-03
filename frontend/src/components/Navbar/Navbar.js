import React, { useContext } from 'react'
import { FaSearch, FaUserCircle  } from "react-icons/fa";
import './Navbar.css'
import { Appcontext } from '../../Context/AppContext';
import logo from '../../assets/DBLogo.png'

const Navbar = () => {
    const { searchQuery, setSearchQuery} = useContext(Appcontext)
    
    return (
        <div className='navbar-container'>
            <img src={logo} alt="logo" className='logo' />
            <div className='navbar-search-container'>
                <FaSearch size={20} className='search-icon' />
                <input type="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className='navbar-search-input' placeholder='Search doctors by name and specialization' />
            </div>
            <FaUserCircle size={20} className='user-profile' />
        </div>
    )
}

export default Navbar 