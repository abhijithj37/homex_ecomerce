const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    videolink: {
        type: String,
    },
    category: {
        type: String,
    },
    // catagory: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Catagory",
    //     required: true,
    // },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    specification: {
        type: String,
    },
    isfeatured: {
        type: Boolean,
        default: false,
    },
    images: [
        {
            img: { type: String },
        },
    ],
    dateCreated: {
        type: Date,
        default: Date.now,
    }

},
    { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)

