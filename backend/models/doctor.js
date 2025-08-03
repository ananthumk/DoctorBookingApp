const mongoose = require('mongoose')
const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    specialization: {type: String, required: true},
    profileImage: {type: String}, 
    availability: {type: String, enum: ['Available Today', 'Fully Booked', 'On Leave'], default: 'Available Today'},
    schedule: [{ date: String, time: String, status: String }],
    experience: {type:String, required: true},
    about: {type: String, required: true},
    education: {type:String, required: true},
    areaOfExpertise: {type: [String], required: true},
    
}, { timestamps: true })


module.exports = mongoose.model('Doctor', doctorSchema)