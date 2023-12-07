
// const mongoose = require("mongoose");

// const DeletedOrderSchema = mongoose.Schema(
//     {
//         previousOrderId: {
//             type: String,
//             required: true,
//         },
//         userID: {
//             type: String,
//             required: true,
//         },
//         products: [
//             {
//                 productID: {
//                     type: String,
//                     required: true,
//                 },
//                 name: {
//                     type: String,
//                 },
//                 quantity: {
//                     type: Number,
//                     default: 1,
//                 },
//                 unitPrice: {
//                     type: Number,
//                     required: true,
//                 },
//             },
//         ],
//         orderStatus: {
//             type: String,
//         },
//         orderTotal: {
//             type: Number,
//             required: true,
//         },
//         phoneNumber: {
//             type: String,
//             required: true,
//         },
//         email: {
//             type: String,
//             required: true,
//         },
//         address: {
//             street: {
//                 type: String,
//                 required: true,
//             },
//             apartment: {
//                 type: String,
//                 default: "",
//             },
//             city: {
//                 type: String,
//                 required: true,
//             },
//             state: {
//                 type: String,
//                 required: true,
//             },
//             zip: {
//                 type: String,
//                 required: true,
//             },
//             country: {
//                 type: String,
//                 required: true,
//             },
//         },
//         temprorylydelete: {
//             type: String,
//         },

//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("DeletedOrder", DeletedOrderSchema);
const mongoose = require("mongoose");

const DeletedOrderSchema = mongoose.Schema(
    {
        previousOrderId: {
            type: String,
            required: true,
        },
        userID: {
            type: String,
            required: true,
        },
        products: [
            {
                productID: {
                    type: String,
                    required: true,
                },
                name: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
                unitPrice: {
                    type: Number,
                    required: true,
                },
            },
        ],
        orderStatus: {
            type: String,
        },
        orderTotal: {
            type: Number,
            required: true,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        address: {
            street: {
                type: String,
                required: true,
            },
            apartment: {
                type: String,
                default: "",
            },
            city: {
                type: String,
                required: true,
            },
            state: {
                type: String,
                required: true,
            },
            zip: {
                type: String,
                required: true,
            },
            country: {
                type: String,
                required: true,
            },
        },
        temprorylydelete: {
            type: String,
        },
    },
    { timestamps: true }
);

const DeletedOrder = mongoose.model("DeletedOrder", DeletedOrderSchema);

module.exports = DeletedOrder;
