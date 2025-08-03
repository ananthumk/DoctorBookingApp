import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './DoctorList.css'
import { useNavigate } from 'react-router-dom'
import { Appcontext } from '../../Context/AppContext'
import { IoMdArrowDropright } from "react-icons/io";

const DoctorList = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const {backendUrl, searchQuery} = useContext(Appcontext)
  console.log('backend Url', backendUrl, searchQuery)
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`${backendUrl}/doctors?search=${searchQuery}`)
      console.log(response.data)
      const updatedVal = response.data.map(data => ({
        id: data._id,
        name: data.name,
        specialization: data.specialization,
        availability: data.availability,
        profileImage: data.profileImage
      }))
      console.log(updatedVal)
      setData(updatedVal)
    }
    fetchData()
  }, [searchQuery, backendUrl])
  return (
    <div className='doctor-list-container'>
      {data.map(eachData => {
        const { id, name, specialization, availability, profileImage } = eachData
        return (
          <div onClick={() => navigate(`/doctor/${id}`) } key={id} className='doctor-card' >
            <img src={profileImage} alt="name" />
            <div>
            <h4>{name}</h4>
            <p>{specialization}</p>
            <button className={
              availability === 'Available Today'
                ? 'availableToday'
                : availability === 'Fully Booked'
                  ? 'fullyBooked'
                  : 'onLeave'
            }
            >
              {availability}</button>
            </div>
            <IoMdArrowDropright size={20} className='right-arrow' />
          </div>
        )
      })}
    </div>
  )
}

export default DoctorList