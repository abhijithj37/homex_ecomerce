const mongoose = require('mongoose');

const visitorSchema = mongoose.Schema({
    ip: String,
    userAgent: String,
    visits: Number,
})
module.exports = mongoose.model('Visitor', visitorSchema)
