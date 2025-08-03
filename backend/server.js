const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const Doctor = require('./models/doctor')
const Appointment = require('./models/appointment')
const app = express()
const fs = require('fs');
const path = require('path');



app.use(express.json())
app.use(cors())

require('dotenv').config()

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);  
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})

const upload = multer({storage})

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
.catch(err => console.error(err))

app.use('/uploads', express.static('uploads'))

app.post('/doctors', upload.single('profileImage'), async( req, res) => {
    try {
        const { name, specialization, availability, schedule, experience, about, education, profileImage, areaOfExpertise }= req.body
        const newDoctor = new Doctor({
            name, 
            specialization,
            availability,
            schedule,
            profileImage: req.file ? '/uploads/' + req.file.filename : profileImage,
            experience,
            about,
            education,
            areaOfExpertise
        })
        await newDoctor.save()
        res.status(200).json(newDoctor)
    } catch (error) {
        console.log(error)
        res.status(500).json({err: error.message})
    }
})

app.get('/doctors', async ( req, res) => {
    const search = req.query.search?.toLowerCase() || ''
    let filter = {}
    if (search){
        filter = {
            $or: [
                {name: {$regex: search, $options: 'i'}},
                {specialization: {$regex: search, $options: 'i'}}
            ]
        }
    }
    const doctors = await Doctor.find(filter)
    res.status(200).json(doctors)
})

app.get('/doctors/:id', async ( req, res) => {
    try {
        const id = req.params.id
    const doctor = await Doctor.findById(id)
    if (!doctor) return res.status(400).json({error: 'Doctor not found'})
    res.status(200).json(doctor)
    } catch (error) {
        res.status(500).json({err: 'Invalid Doctor Id'})
    }
    
})

app.post('/appointment', async ( req, res) => {
    try {
        const { doctorId, patientName, email, dateTime} = req.body 
        if (!doctorId || !patientName || !email || !dateTime) return res.status(400).json({error: "Missing fields"})
        const newAppointment = new Appointment({
            doctorId, patientName, email, dateTime
        })      
        const data  = await newAppointment.save()
        res.status(200).json({data})  
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get('/appointment', async (req, res) => {
    const appointments = await Appointment.find().populate('doctorId')
    res.status(200).json(appointments)
})

app.delete('/doctor/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Doctor.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.status(200).json({ message: 'Deleted Successfully' });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
});


const port = process.env.PORT || 3001 
app.listen(port, () => console.log(`Server listening to http://localhost:${port}`) )


