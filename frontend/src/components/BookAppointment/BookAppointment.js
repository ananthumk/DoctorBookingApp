import React, { useContext, useEffect, useState } from 'react'
import './BookAppointment.css'
import axios from 'axios'
import { Appcontext } from '../../Context/AppContext'

const BookAppointment = ({name, setForm, docId}) => {
  const [details, setDetails ] = useState({
   patientName:'',
   email: '',
   doctorId: docId,
   dateTime: '',
   notes: ''
  })
  const [statusOk, setStatusOk] = useState(false)
  const [patientDetails, setPatientDetails] = useState({})
 
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')

  const { backendUrl} = useContext(Appcontext)

  const handleInput = (e) => {
   const {value, name} = e.target
   setDetails(prevDetails => ({
      ...prevDetails,
      [name]: value
   }))
  }

  useEffect(() => {
    setDetails(prev => ({
      ...prev,
      dateTime: date && time ? `${date} ${time}` : ''
    }))
  }, [date, time])
  
  useEffect(() => {
     setDetails(prev => ({
      ...prev,
      doctorId: docId
     }))
  }, [docId])

  useEffect(() => {
  if (statusOk) { 
    const timer = setTimeout(() => {
      setForm(false);
      setStatusOk(false);
    }, 2000);

    return () => clearTimeout(timer);
  }
}, [statusOk, setForm, setStatusOk]);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post(`${backendUrl}/appointment`, details)
    if (response.status === 200){
        console.log(response.data.data)
        const updatedDetails = {
          patientName: response.data.data.patientName,
          email: response.data.data.email,
          dateTime: response.data.data.dateTime
        }
        setPatientDetails(updatedDetails)
        setStatusOk(true)
    }else{
      setStatusOk(false)
    }
  }

  return (
    <div className='book-appointment-container'>
      {statusOk ? 
      <div className='success-card'>
        <img src='https://static.vecteezy.com/system/resources/previews/026/530/562/non_2x/round-checkbox-authentication-or-success-tick-vector.jpg' alt='' />
        <h2>Appointment Confirmed!</h2>
        <p>{`Your appointment with Dr. ${name} has been successfully booked.`}</p>
        <div className='success-patient-section'>
           <p>Doctor Name: {name}</p>
           <p>Patient Name: {patientDetails.patientName}</p>
           <p>DateTime: {patientDetails.dateTime}</p>
        </div>
      </div> :
      <div className='booking-card'>
        <div className='top-section'>
         <h2>{`Book an appointment with Dr.${name}`} </h2>
         <p onClick={() => setForm(false)}>X</p>
         </div>
         <form className='form-container' onSubmit={handleSubmit}>
             <div className='form-section'>
                <label>Patient Name *</label>
                <input type="text" name="patientName" value={details.patientName} onChange={handleInput} placeholder='Enter your full name' required/>
             </div>
             <div className='form-section'>
                <label>Email *</label>
                <input type="email" name="email" value={details.email} onChange={handleInput} placeholder='Enter your email address' required />
             </div>
             <div className='form-section'>
                <label>Preferred Date *</label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}  required  />
             </div>
              <div className='form-section'>
                <label>Preferred Time *</label>
                <select value={time} onChange={(e) => setTime(e.target.value)} required>
                  <option>Select a Time slot</option>
                    <option>9: 00 AM</option>
                    <option>10: 00 AM</option>
                    <option>11: 00 AM</option>
                    <option>12: 00 AM</option>
                    <option>12: 30 AM</option>
                    <option>2: 00 AM</option>
                    <option>3: 00 AM</option>
                    <option>4: 00 AM</option>
                </select>
             </div>
             <div className='form-section'>
                <label>Additional Notes</label>
                <textarea value={details.notes} cols={8} rows={7} onChange={handleInput} name='notes' placeholder='Any specific concerns or notes for the doctor.' />
             </div>
              <div className='btn-container'>
            <button className='cancel-btn' onClick={() => setForm(false)}>Cancel</button>
            <button className='book-btn' type='submit'>Book Appointment</button>
         </div> 
         </form> 
        
      </div> }     
    </div>
  )
}

export default BookAppointment