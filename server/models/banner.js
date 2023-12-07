const mongoose = require('mongoose')

const BannerSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
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

module.exports = mongoose.model('Banner', BannerSchema)