const mongoose = require('mongoose')

const appointmentSchema = new mongoose.Schema({
    doctorId: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true},
    patientName: {type: String, required: true},
    email: {type: String, required: true},
    dateTime: {type: String, required: true},
    notes: {type: String}
}, { timestamps: true })

module.exports = mongoose.model('Appointment', appointmentSchema)