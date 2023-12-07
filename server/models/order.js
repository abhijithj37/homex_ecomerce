// // const mongoose = require("mongoose");

// // const OrderSchema = mongoose.Schema(
// //   {
// //     userID: {
// //       type: String,
// //       required: true,
// //     },
// //     products: [
// //       {
// //         productID: {
// //           type: String,
// //           required: true,
// //         },
// //         quantity: {
// //           type: String,
// //           default: 1,
// //         },
// //       },
// //     ],
// //     amount : {
// //         type : Number,
// //         required : true
// //     },
// //     status : {
// //         type : String,
// //         default : 'Pending'
// //     },
// //     address : {
// //         type : Object,
// //         required : true
// //     }
// //   },
// //   { timestamps: true }
// // );

// // module.exports = mongoose.model("Order", OrderSchema);
// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// //CATAGORY SCHEMA
// const OrderSchema = new mongoose.Schema({
//   user: {
//     type: Schema.Types.ObjectId,
//     ref: "User",
//     require: true,
//   },
//   cartid: {
//     type: Schema.Types.ObjectId,
//     ref: "Cart",
//   },
//   cartitems: [
//     {
//       product: {
//         type: Schema.Types.ObjectId,
//         ref: "Product",
//         require: true,
//       },
//       quantity: {
//         type: Number,
//         default: 1,
//       },
//       dateCreated: {
//         type: Date,
//         default: Date.now,
//       },
//     }
//   ],
//   address: {
//     type: Object,
//     require: true,
//   },
//   totalPrice: {
//     type: Number,
//     require: true,
//   },
//   status: {
//     type: String,
//   },
//   dateCreated: {
//     type: Date,
//     default: Date.now,
//   },
//   created_at: Date
// });
// module.exports = mongoose.model("Order", OrderSchema);

// const mongoose = require("mongoose");

// const OrderSchema = mongoose.Schema(
//   {
//     userID: {
//       type: String,
//       required: true,
//     },
//     products: [
//       {
//         productID: {
//           type: String,
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//         unitPrice: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     orderStatus: {
//       type: String,
//       enum: ["placed", "shipped", "delivered", "cancelled"],
//       default: "placed",
//     },
//     orderTotal: {
//       type: Number,
//       required: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       // You may want to add additional email validation
//     },
//     address: {
//       street: {
//         type: String,
//         required: true,
//       },
//       city: {
//         type: String,
//         required: true,
//       },
//       state: {
//         type: String,
//         required: true,
//       },
//       zip: {
//         type: String,
//         required: true,
//       },
//       country: {
//         type: String,
//         required: true,
//       },
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Order", OrderSchema);
const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
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
      enum: ["placed", "shipped", "delivered", "cancelled","notcompleted"],
      default: "notcompleted",
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
      // You may want to add additional email validation
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      apartment: {
        type: String,
        default: "", // Set default to an empty string or adjust as needed
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

module.exports = mongoose.model("Order", OrderSchema);
