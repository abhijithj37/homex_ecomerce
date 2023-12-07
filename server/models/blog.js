const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
}, { timestamps: true }
)

module.exports = mongoose.model('Blog', BlogSchema)