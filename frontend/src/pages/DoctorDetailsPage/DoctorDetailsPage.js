import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from 'react-router-dom'
import './DoctorDetailsPage.css'
import BookAppointment from '../../components/BookAppointment/BookAppointment';
import { Appcontext } from '../../Context/AppContext';

const DoctorDetailsPage = () => {
    const [doctorData, setDoctorData] = useState({})
    const [viewForm, setForm] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()
    const { backendUrl } = useContext(Appcontext)
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${backendUrl}/doctors/${id}`)
                console.log(response.data)
                setDoctorData(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id, backendUrl])
    return (
        <>
        <div className='doctor-details-page-container'>
            <div className='doctor-navbar-container'>
                <div style={{ color: '#3B38A0', cursor: 'pointer' }}> <FaArrowLeft size={20} onClick={() => navigate('/')} />
                    <p className='back-para'>Back to Doctors</p>
                </div>
                <FaUserCircle size={20} />
            </div>
            <div className='doctor-profile-container'>
                <div className='profile-section'>
                    <img src={doctorData.profileImage} alt={doctorData.name} className='profile-image' />
                    <div className='details'>
                        <h1>Dr. {doctorData.name}</h1>
                        <p>{doctorData.specialization}</p>
                        <p>{doctorData.experience} year of experience</p>
                        <button className={
                            doctorData.availability === 'Available Today'
                                ? 'availableToday'
                                : doctorData.availability === 'Fully Booked'
                                    ? 'fullyBooked'
                                    : 'onLeave'
                        }
                        >
                            {doctorData.availability}</button>
                    </div>
                </div>
                <div className='doctor-deatils-section'>
                    <div className='left-side'>
                        <div className='sections'>
                            <h2>About</h2>
                            <p>{doctorData.about}</p>
                        </div>
                        <div className='sections'>
                            <h2>Education & Certifications</h2>
                            <p>{doctorData.education}</p>
                        </div>
                        <div className='sections'>
                             <h2>Areas of Expertise</h2>
                             <div className='btns'>
                                {doctorData?.areaOfExpertise?.map(content => {
                                    return <button className='experties-btn'>
                                        {content}
                                    </button>
                                })}
                             </div>
                        </div>
                    </div>
                    <div className='schedule-section'>
                       <h2>Weekly Schedule</h2>
                       {doctorData?.schedule?.map(
                        data => {
                            const { idx, date, status, time} = data
                            return (
                                <>
                                <div className='dates-section'>
                                    <p>{date}</p>
                                    <p>{`${status === 'Fully Booked' || status === 'On Leave' ? 'Closed': `${time} - 5:00 AM`}`}</p>
                                </div>
                                {idx !== (doctorData.schedule.length - 1) && <hr style={{width: '100%', color: 'grey'}} /> }
                                </>
                            )
                        }
                       )}
                    </div>
                </div>
                <div className='appointment-btn'>
                    {doctorData.availability === 'Available Today' ?
                    <button onClick={() => setForm(true)}>
                       Book Appointment
                   </button>:
                   <button className='na-btn' disabled>
                    Not Available
                   </button>
                    }
                   
                </div>
            </div>
        </div>
        {viewForm  && <BookAppointment name={doctorData.name} setForm={setForm} docId={id} />}
        </>
    )
}

export default DoctorDetailsPage