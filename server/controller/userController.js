const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const users = require('../models/user');
const ProductData = require("../models/product");
// const UserCart = require("../models/cart");
const CartData = require("../models/cartnew");
const Order = require("../models/order");
const nodemailer = require('nodemailer');
const axios = require('axios');
const CryptoJS = require('crypto-js');


//REGISTER USER
const RegisterUser = async (req, res) => {
  try {
    let { userName, email, password } = req.body;
    console.log("userName, email, password;..", userName, email, password)
    if (userName && email && password) {
      let user = await users.findOne({ email: email });
      if (!user) {
        let salt = await bcrypt.genSalt(10);
        let hashPass = await bcrypt.hash(password, salt);
        const newUser = new users({
          username: userName,
          email,
          password: hashPass,
        });
        await newUser.save();
        let UserjwtToken = jwt.sign(hashPass, process.env.SECRET_KEY);

        let userDetails = {
          newUser,
          UserjwtToken
        }
        return res.status(200).json({ message: "login succesfull", userDetails });
      } else {
        console.log("Already exist:")
        return res.status(404).json({ error: 'Email or Username Already exist' });

      }
    } else {
      console.log("All fields required")
      return res.status(401).send("All fields required");
    }
  } catch (err) {
    console.log("error", err)
    return res.status(500).json(err.message);
  }
}


//USER LOGIN
const UserLogin = async (req, res) => {
  console.log("login credentials...", req.body)
  let { username, email, password } = req.body;
  console.log(" email, password.", email, password)
  if (password && (username || email)) {
    let user = await users.findOne({ $or: [{ username }, { email }] });

    console.log("user", user)
    if (user) {
      let match = await bcrypt.compare(password, user.password);
      if (match) {
        const { password, ...userWithoutPassword } = user._doc
        let data = {
          id: user.id,
        };
        // const UserjwtToken = jwt.sign({ id: data.id }, process.env.SECRET_KEY, { expiresIn: "10m" });
        let UserjwtToken = jwt.sign(data.id, process.env.SECRET_KEY);

        return res.status(200).json({ message: "login succesfull", UserjwtToken, user: userWithoutPassword });
      } else {
        return res.status(401).json({ message: "Invalid password" });

      }
    } else {
      return res.status(401).json({ message: "Invalid credetials" });
    }
  } else {
    return res.status(409).send("Email and Password must not be empty");
  }

}
// Forgot Password
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // Generate a unique reset token
//     const resetToken = crypto.randomBytes(20).toString('hex');

//     // Find the user by email
//     const user = await users.findOne({ email });

//     if (user) {
//       // Save the reset token and expiration time in the database
//       user.resetPasswordToken = resetToken;
//       user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
//       await user.save();

//       // Send an email with the reset link
//       const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

//       // Nodemailer setup
//       const transporter = nodemailer.createTransport({
//         service: 'Gmail',
//         auth: {
//             user: 'ananthu97468219@gmail.com', // Your Gmail email address
//             pass: 'iuxljpjvdldngccf' // Your Gmail password or app-specific password
//         }
//       });

//       // Email content
//       // const mailOptions = {
//       //   from: '"Your Name" <your-email@example.com>', // replace with your name and email
//       //   to: user.email,
//       //   subject: 'Password Reset',
//       //   text: `Click this link to reset your password: ${resetLink}`,
//       // };
//       const mailOptions = {
//         from: 'ananthu97468219@gmail.com',
//         to: 'thethree.ananthu@gmail.com',
//         subject: 'Password Reset',
//         text: `Click this link to reset your password: ${resetLink}`,
//       };

//       // Send the email
//       const info = await transporter.sendMail(mailOptions);
//       console.log("Message sent: %s", info.messageId);

//       return res.status(200).json({ message: 'Password reset link sent to your email.' });
//     } else {
//       return res.status(404).json({ message: 'User not found.' });
//     }
//   } catch (error) {
//     console.error('Error in forgotPassword:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// };
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Generate a unique reset token
    const resetToken = CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);

    // Find the user by email
    const user = await users.findOne({ email });

    if (user) {
      // Save the reset token and expiration time in the database
      user.resetPasswordToken = resetToken;
      // user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour
      await user.save();

      // Send an email with the reset link
      const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

      console.log("credentails::", process.env.EMAIL_ID, process.env.PASSWORD)
      // Nodemailer setup
      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.PASSWORD,
        }
      });

      // Email content
      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: user.email,
        subject: 'Password Reset',
        text: `Click this link to reset your password: ${resetLink}`,
      };

      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log("Message sent: %s", info.messageId);

      return res.status(200).json({ message: 'Password reset link sent to your email.' });
    } else {
      return res.status(404).json({ message: 'User not found.' });
    }
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;
  console.log("resetPassword", token, password )
  try {
   

    // Find the user by the reset token
    const user = await users.findOne({
      resetPasswordToken: token,
    });

    if (!user) {
      return res.status(404).json({ message: 'Invalid or expired reset token.' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return res.status(200).json({ message: 'Password reset successful.' });
  } catch (error) {
    console.error('Error in reset password:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}










const PostCart = async (req, res) => {
  console.log("cart reqbody:", req.body)

  const { user, cart } = req.body;
  let shipping = 0;
  let tax = 0;

  const userId = user._id;
  const cartItems = cart.map(item => ({
    productID: item._id, // Assuming your cart items have an "_id" field that corresponds to the Product model
    quantity: item.quantity
  }));

  console.log("User ID:", userId);
  console.log("Cart Items:", cartItems);

  // Calculate the total price
  let totalPrice = 0;

  // Iterate through the cart items and calculate the total price
  for (const item of cartItems) {
    // Find the product by its ID in the database
    const product = await ProductData.findById(item.productID);

    if (product) {
      // Calculate the subtotal for the product (price * quantity)
      const subtotal = parseFloat(product.price) * item.quantity;
      totalPrice += subtotal;
    }
  }

  // Add shipping and tax to the total price
  totalPrice += shipping + tax;

  // Check if the user already has a cart
  const existingCart = await UserCart.findOne({ userID: userId });

  if (existingCart) {
    // Update the existing cart with the new cart items and total price
    existingCart.products = cartItems;
    existingCart.totalPrice = totalPrice;
    await existingCart.save();

    // Return the existing cart in the response
    return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: existingCart });
  } else {
    // Create a new cart if the user doesn't have one
    const newCart = new UserCart({
      userID: userId,
      products: cartItems,
      totalPrice: totalPrice
    });
    await newCart.save();

    return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: newCart });
  }
}


const GetCartWithTotalPrice = async (req, res) => {
  const userId = req.params.id
  let shipping = 0;
  let tax = 0;
  console.log("GetCart reqbody:userId", userId);
  const usercart = await CartData.findOne({ userID: userId });
  if (usercart) {
    console.log("usercart:", usercart);

    // Calculate the total price of the cart items
    let totalPrice = 0;
    for (const item of usercart.products) {
      // Fetch the product details (e.g., price) based on item.productID
      const product = await ProductData.findById(item.productID);

      if (product) {
        // Calculate the subtotal for the item (price * quantity)
        const subtotal = parseFloat(product.price) * parseInt(item.quantity, 10);
        totalPrice += subtotal;
      }
    }
    // Include the calculated total price in the response
    totalPrice += shipping + tax;

    console.log("usercart with total price:", usercart)
    return res.status(200).json({ message: "User cart", cart: usercart, totalPrice, shipping: shipping, tax: tax });
  } else {
    return res.status(401).json({ message: "No cart found for user" });
  }
}



const CreateCart = async (req, res) => {
  console.log("CreateCart:", req.body);
  try {
    const userId = req.body.userID;
    const productID = req.body.products[0].productID;

    let quantity = parseInt(req.body.products[0].quantity, 10); // Parse quantity as an integer
    const existingCart = await CartData.findOne({ userID: userId });
    if (existingCart) {
      const existingProduct = existingCart.products.find(
        (product) => product.productID === productID
      );

      if (existingProduct) {
        // If the product already exists, increment its quantity by the parsed quantity
        existingProduct.quantity += quantity;
      } else {
        // If the product doesn't exist in the cart, add it with the parsed quantity
        existingCart.products.push({ productID, quantity });
      }

      console.log("existingCart:", existingCart)
      await existingCart.save();
      res.json(existingCart);
    } else {
      // If the user doesn't have a cart, create a new cart with the parsed quantity
      const cartData = {
        userID: userId,
        products: [{ productID, quantity }]
      };
      const cart = await new CartData(cartData);
      await cart.save();
      res.json(cart);
    }
  } catch (err) {
    res.status(500).json(err.message);
  }
}



const GetCartnew = async (req, res) => {
  console.log("GetCartnew:", req.params.id);
  try {
    const cartProduct = await CartData.find({ userID: req.params.id });
    console.log("cartProduct:", cartProduct)
    res.json(cartProduct)
  } catch (err) {
    res.status(500).send('Internal Server Error')
  }
}


const getAllProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    console.log("getAllProductsByCategory:", category)
    // Check if a category is specified
    if (!category) {
      return res.status(400).json({ error: 'Category parameter is required' });
    }
    const products = await ProductData.find({ category });
    console.log("products:", products);
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};



const getAllFeaturedProducts = async (req, res) => {
  try {
    const featuredProducts = await ProductData.find({ isfeatured: true })
      .sort({ dateCreated: -1 }); // Sort by dateCreated in descending order

    console.log("all featured products:", featuredProducts);
    res.status(200).json(featuredProducts);
  } catch (error) {
    console.error("Error fetching featured products:", error);
    res.status(500).json({ error: 'Failed to fetch featured products' });
  }
};





const UpdateCart = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user's ID is passed as a parameter
    const updatedCartData = req.body; // The updated cart data

    // Find the user's cart by userID
    const existingCart = await CartData.findOne({ userID: userId });

    if (existingCart) {
      // Update the cart with the updated data
      existingCart.products = updatedCartData;

      // Save the updated cart to the database
      await existingCart.save();
      console.log("UpdateCart existingCart:", existingCart)

      res.status(200).json(existingCart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}




// const CreateCartForLocalStoreditems = async (req, res) => {
//   const userId = req.body.userID;
//   // console.log("CreateCartForLocalStoreditems:", req.body)
//   console.log("userId:", userId)
//   console.log("LocalCart Product:::", req.body.LocalCartProduct.products)


// }






const CreateCartForLocalStoreditems = async (req, res) => {
  try {
    const userId = req.body.userID;
    const localCartProducts = req.body.LocalCartProduct.products;

    // Check if the user already has a cart
    const existingCart = await CartData.findOne({ userID: userId });

    if (existingCart) {
      // Iterate through the localCartProducts and update the existing cart
      for (const product of localCartProducts) {
        const existingProduct = existingCart.products.find(
          (cartProduct) => cartProduct.productID === product.productID
        );

        if (existingProduct) {
          // If the product already exists, increment its quantity
          existingProduct.quantity += product.quantity;
        } else {
          // If the product doesn't exist in the cart, add it
          existingCart.products.push({
            productID: product.productID,
            quantity: product.quantity
          });
        }
      }

      await existingCart.save();
      res.status(200).json({ message: 'Cart updated successfully', cart: existingCart });
    } else {
      // If the user doesn't have a cart, create a new cart with the localCartProducts
      const cartData = {
        userID: userId,
        products: localCartProducts
      };
      const cart = await new CartData(cartData);
      await cart.save();
      res.status(200).json({ message: 'Cart created successfully', cart: cart });
    }
  } catch (err) {
    res.status(500).json({ message: 'An error occurred', error: err.message });
  }
}



const DeleteCart = async (req, res) => {
  try {
    const deleteCart = await UserCart.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteCart);
  } catch (err) {
    res.status(500).json(err.message);
  }
}


// const Checkout = async (req, res) => {
//   const { user, cart } = req.body;
//   console.log("Checkout reqbody:", req.body);

//   let shipping = 0;
//   let tax = 0;

//   const userId = user._id;
//   const cartItems = cart.map(item => ({
//     productID: item._id, // Assuming your cart items have an "_id" field that corresponds to the Product model
//     quantity: item.quantity
//   }));

//   console.log("User ID:", userId);
//   console.log("Cart Items:", cartItems);

//   // Calculate the total price
//   let totalPrice = 0;

//   // Iterate through the cart items and calculate the total price
//   for (const item of cartItems) {
//     // Find the product by its ID in the database
//     const product = await ProductData.findById(item.productID);

//     if (product) {
//       // Calculate the subtotal for the product (price * quantity)
//       const subtotal = parseFloat(product.price) * item.quantity;
//       totalPrice += subtotal;
//     }
//   }

//   // Add shipping and tax to the total price
//   totalPrice += shipping + tax;

//   // Check if the user already has a cart
//   const existingCart = await UserCart.findOne({ userID: userId });

//   if (existingCart) {
//     // Update the existing cart with the new cart items and total price
//     existingCart.products = cartItems;
//     existingCart.totalPrice = totalPrice;
//     await existingCart.save();

//     // Return the existing cart in the response
//     return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: existingCart });
//   } else {
//     // Create a new cart if the user doesn't have one
//     const newCart = new UserCart({
//       userID: userId,
//       products: cartItems,
//       totalPrice: totalPrice
//     });
//     await newCart.save();

//     return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: newCart });
//   }
// };


const calculateProductSubtotal = async (productId, quantity) => {
  const product = await ProductData.findById(productId);
  if (product) {
    return parseFloat(product.price) * quantity;
  }
  return 0;
};

const calculateTotalPrice = async (cartItems) => {
  let totalPrice = 0;
  for (const item of cartItems) {
    const subtotal = await calculateProductSubtotal(item.productID, item.quantity);
    totalPrice += subtotal;
  }
  return totalPrice;
};

const Checkout = async (req, res) => {
  const { user, cart } = req.body;
  console.log("Checkout reqbody:", req.body);

  let shipping = 0;
  let tax = 0;

  const userId = user._id;
  const cartItems = cart.map(item => ({
    productID: item._id, // Assuming your cart items have an "_id" field that corresponds to the Product model
    quantity: item.quantity
  }));

  console.log("User ID:", userId);
  console.log("Cart Items:", cartItems);

  const totalPrice = await calculateTotalPrice(cartItems);

  // Add shipping and tax to the total price
  totalPrice += shipping + tax;

  // Check if the user already has a cart
  const existingCart = await UserCart.findOne({ userID: userId });

  if (existingCart) {
    // Update the existing cart with the new cart items and total price
    existingCart.products = cartItems;
    existingCart.totalPrice = totalPrice;
    await existingCart.save();

    // Return the existing cart in the response
    return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: existingCart });
  } else {
    // Create a new cart if the user doesn't have one
    const newCart = new UserCart({
      userID: userId,
      products: cartItems,
      totalPrice: totalPrice
    });
    await newCart.save();

    return res.status(200).json({ message: "Checkout successful", total: totalPrice, cart: newCart });
  }
};



// const createThawaniSession = async () => {

//   const url = 'https://uatcheckout.thawani.om/api/v1/checkout/session';
//   // Publishable Key: HGvTMLDssJghr9tlN9gr4DVYt0qyBy
//   const publishable_key = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";
//   const secretKey = 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'; // Replace with your actual Secret Key

//   const requestData = {
//     client_reference_id: '123412',
//     mode: 'payment',
//     products: [
//       {
//         name: 'product ananthu 1',
//         quantity: 1,
//         unit_amount: 1*1000,
//       },
//       {
//         name: 'ananthu 1',
//         quantity: 2,
//         unit_amount: 10*1000,
//       },
//     ],
//     success_url: 'https://company.com/success',
//     cancel_url: 'https://company.com/cancel',
//     metadata: {
//       'Customer name': 'somename',
//       'order id': 0,
//     },
//   };

//   try {
//     const response = await axios.post(url, requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'thawani-api-key': secretKey,
//       },
//     });
//     const sessionData = response.data.data;
//     console.log("sessionData:", sessionData)
//     console.log("sessionData.session_id:", sessionData.session_id)
//     const paymentPageURL = `https://uatcheckout.thawani.om/pay/${sessionData.session_id}?key=${publishable_key}`
//     // Return both the session data and the payment page URL
//     return { sessionData, paymentPageURL };
//   } catch (error) {
//     throw error; // Throw the error so it can be handled by the calling code
//   }
// };




// const Payment = async (req, res) => {

//   console.log("req.body:",req.body)

//   const userId = req.body.userID;
//   // Check if the user already has a cart
//   const userCart = await CartData.findOne({ userID: userId });
//   console.log("userCart:",userCart)

//   try {
//     const { sessionData, paymentPageURL } = await createThawaniSession();
//     console.log("paymentPageURL:", paymentPageURL);
//     // Redirect the user to the Thawani payment page
//     return res.status(200).json({ paymentUrl: paymentPageURL});  } catch (error) {
//     console.error(error);
//     // Handle the error and potentially send an error response to the client
//   }
// };





// WORKING

// const Payment= async (req, res) => {
//   const data = {
//     client_reference_id: Date.now(),
//     mode: 'payment',
//     products: [
//       {
//         name: 'Name',
//         quantity: 1,
//         // unit_amount: Math.round(100 * 1000 * 100) / 100, // Convert to two decimal places
//         unit_amount: 300000
//       },
//     ],

//     success_url: 'http://yourfrontendurl/success',
//     cancel_url: 'http://yourfrontendurl/fail',
//   };


//   console.log("dataL",data)

//   try {
//     const response = await axios.post('https://uatcheckout.thawani.om/api/v1/checkout/session', data, {
//       headers: {
//         'Content-Type': 'application/json',
//         'thawani-api-key': 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et',
//       },
//     });

//     const paySessionId = response.data.data.session_id;

//     const paymentUrl = `https://uatcheckout.thawani.om/pay/${paySessionId}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`;
//     return res.status(200).json({ paymentUrl: paymentUrl});

//     // res.redirect(paymentUrl);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send('Payment request failed');
//   }
// }



// ==========================================================================

// const createThawaniSession = async (products) => {

//   console.log("products::", products)

//   const url = 'https://uatcheckout.thawani.om/api/v1/checkout/session';
//   // Publishable Key: HGvTMLDssJghr9tlN9gr4DVYt0qyBy
//   const publishable_key = "HGvTMLDssJghr9tlN9gr4DVYt0qyBy";
//   const secretKey = 'rRQ26GcsZzoEhbrP2HZvLYDbn9C9et'; // Replace with your actual Secret Key

//   const requestData = {
//     client_reference_id: '123412',
//     mode: 'payment',
//     products,
// products: [
//   {
//     name: 'Name',
//     quantity: 1,
//     unit_amount: 300000
//   },
// ],

//     success_url: 'http://127.0.0.1:5173/sucess-page',
//     cancel_url: 'http://127.0.0.1:5173/cancel-page',
//     metadata: {
//       'Customer name': 'somename',
//       'order id': 0,
//     },
//   };

//   try {
//     const response = await axios.post(url, requestData, {
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json',
//         'thawani-api-key': secretKey,
//       },
//     });
//     const sessionData = response.data.data;
//     console.log("sessionData:", sessionData)
//     console.log("sessionData.session_id:", sessionData.session_id)
//     const paymentPageURL = `https://uatcheckout.thawani.om/pay/${sessionData.session_id}?key=${publishable_key}`
//     // Return both the session data and the payment page URL
//     return { sessionData, paymentPageURL };
//   } catch (error) {
//     throw error; // Throw the error so it can be handled by the calling code
//   }
// };

// // ==========================================================================


// const Payment = async (req, res) => {
//   console.log("Payment req.body:", req.body);

//   const userId = req.body.userID;

//   try {
//     // Fetch the user's cart from your database
//     const userCart = await CartData.findOne({ userID: userId });

//     if (!userCart) {
//       // Handle the case where the user's cart is not found
//       return res.status(404).json({ message: "User's cart not found" });
//     }

//     // Initialize an empty array to store the product details
//     const products = [];

//     for (const cartItem of userCart.products) {
//       const product = await ProductData.findById(cartItem.productID);
//       if (product) {
//         // Calculate the total price for the product
//         const totalPrice = parseFloat(product.price) * cartItem.quantity;


//         // let shipping = 0;
//         // let tax = 0;
//         // totalPrice += shipping + tax;

//         // {
//         //   name: 'product ananthu 1',
//         //   quantity: 1,
//         //   unit_amount: 1*1000,
//         // },
//         // Add the product details to the array
//         products.push({
//           // productID: cartItem.productID,
//           name: product.title.substring(0, 32).toLowerCase(), // Limit to the first 32 characters and convert to lowercase
//           quantity: cartItem.quantity,
//           unit_amount: totalPrice * 1000, // Calculate the total price
//         });
//       }
//     }

//     const { sessionData, paymentPageURL } = await createThawaniSession(products);
//     console.log("paymentPageURL:", paymentPageURL);

//     // Redirect the user to the Thawani payment page
//     return res.status(200).json({ paymentUrl: paymentPageURL });
//   } catch (error) {
//     console.error(error);
//     // Handle the error and potentially send an error response to the client
//   }
// };

// ==========================================================================

// const Payment = async (req, res) => {
//   console.log("Payment req.body:", req.body);

//   const userId = req.body.userID;

//   try {
//     // Fetch the user's cart from your database
//     const userCart = await CartData.findOne({ userID: userId });

//     if (!userCart) {
//       // Handle the case where the user's cart is not found
//       return res.status(404).json({ message: "User's cart not found" });
//     }

//     // Initialize an empty array to store the product details
//     const products = [];

//     for (const cartItem of userCart.products) {
//       const product = await ProductData.findById(cartItem.productID);
//       if (product) {
//         // Calculate the total price for the product
//         const totalPrice = parseFloat(product.price) * cartItem.quantity;
//         products.push({
//           // productID: cartItem.productID,
//           name: product.title.substring(0, 32).toLowerCase(), // Limit to the first 32 characters and convert to lowercase
//           quantity: cartItem.quantity,
//           unit_amount: totalPrice * 1000, // Calculate the total price
//         });
//       }
//     }

//     const { sessionData, paymentPageURL } = await createThawaniSession(products);
//     console.log("paymentPageURL:", paymentPageURL);

//     // Redirect the user to the Thawani payment page
//     return res.status(200).json({ paymentUrl: paymentPageURL });
//   } catch (error) {
//     console.error(error);
//     // Handle the error and potentially send an error response to the client
//   }
// };
// ==========================================================================


const createThawaniSession = async (orderDetails) => {

  let products = orderDetails.Orderedproducts
  console.log("products::", products)
  console.log(" orderDetails.order:", orderDetails.order)

  const url = 'https://uatcheckout.thawani.om/api/v1/checkout/session';



  const requestData = {
    client_reference_id: orderDetails.orderId,
    mode: 'payment',
    products,
    success_url: `${process.env.CLIENT_URL}/sucess-page`,
    cancel_url: `${process.env.CLIENT_URL}/cancel-page`,
    metadata: {
      'Customer name': orderDetails.customerName,
      'order id': orderDetails.orderId,
      'customer id': orderDetails.customerId,
      'customer email': orderDetails.customerEmail,
    },

  };

  try {
    const response = await axios.post(url, requestData, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'thawani-api-key': process.env.THAWANI_API_SECRET_KEY,
      },
    });
    const sessionData = response.data.data;
    console.log("sessionData:", sessionData)
    // sessionData.currency = 'USD';
    // console.log("sessionData currency:",sessionData)

    console.log("sessionData.session_id:", sessionData.session_id)
    const paymentPageURL = `https://uatcheckout.thawani.om/pay/${sessionData.session_id}?key=${process.env.THAWANI_API_PUBLIC_KEY}`
    // Return both the session data and the payment page URL
    return { sessionData, paymentPageURL };
  } catch (error) {
    throw error; // Throw the error so it can be handled by the calling code
  }
};


const Payment = async (req, res) => {
  const {
    userID,
    email,
    country,
    firstName,
    lastName,
    address,
    apartment,
    city,
    state,
    pinCode,
    phone,
  } = req.body;

  try {
    // Find user's cart
    const userCart = await CartData.findOne({ userID });

    if (!userCart) {
      return res.status(404).json({ message: "User's cart not found" });
    }

    // Calculate orderTotal based on userCart products
    let orderTotal = 0;
    const products = [];

    for (const cartItem of userCart.products) {
      const product = await ProductData.findById(cartItem.productID);
      if (product) {
        const totalPrice = parseFloat(product.price) * cartItem.quantity;
        products.push({
          productID: cartItem.productID,
          quantity: cartItem.quantity,
          name: product.title,
          unitPrice: parseFloat(product.price), // Include unitPrice here
          currency: 'USD'
        });

        orderTotal += totalPrice;
      }
    }

    const newOrder = new Order({
      userID,
      products,
      orderStatus: "notcompleted", // Set the default order status
      orderTotal,
      phoneNumber: phone,
      email,
      address: {
        street: address,
        apartment,
        city,
        state,
        zip: pinCode,
        country,
      },
    });

    // Save the new order
    const savedOrder = await newOrder.save();

    console.log("savedOrder:", savedOrder)

    let order = {
      products: savedOrder.products,
      orderTotal: savedOrder.orderTotal

    }

    //STRUCTRING PRODUCT DETAILS FOR TAWANI API (name,quantity,unit_amount)
    var Orderedproducts = savedOrder.products.map(({ name, quantity, unitPrice }) => ({
      name: name.substring(0, 32).toLowerCase(),
      quantity,
      unit_amount: unitPrice * 1000

    }));

    console.log("newO rdered Products:", Orderedproducts);

    let user = await users.findById(userID);
    console.log("user:", user)

    const orderDetails = {
      Orderedproducts,
      orderId: savedOrder._id,
      customerName: user.username,
      customerEmail: user.email,
      customerId: user._id,
      order
    }
    if (user) {
      const { sessionData, paymentPageURL } = await createThawaniSession(orderDetails);
      console.log("paymentPageURL sessionData::", sessionData, paymentPageURL);
      return res.status(200).json({ paymentUrl: paymentPageURL, seesionId: sessionData.session_id });
    }
    return res.status(400).json({ message: "your not a user" });




  } catch (error) {
    console.error(error);
  }
};

const RetrieveSession = async (req, res) => {

  console.log("RetrieveSession", req.body.sessionid)


  // process.env.THAWANI_API_SECRET_KEY
  // process.env.THAWANI_API_PUBLIC_KEY


  try {
    const response = await axios.get(`https://uatcheckout.thawani.om/api/v1/checkout/session/${req.body.sessionid}`, {
      headers: {
        'Content-Type': 'application/json',
        'thawani-api-key': process.env.THAWANI_API_SECRET_KEY,
      },
    });

    const sessionData = response.data.data;
    // Handle and update your system based on the sessionData
    if (sessionData.payment_status === 'paid') {
      // Payment was successful, update the order status to 'placed'
      // Example: Update order status in your database

      console.log("Payment successful!:", sessionData)
      console.log("Payment status!:", sessionData.payment_status)
      console.log("sessionData.metadata:", sessionData.metadata
      )


      const { 'Customer name': customerName, 'order id': orderId, 'customer id': customerId, 'customer email': customerEmail } = sessionData.metadata;

      console.log("Customer Name:", customerName);
      console.log("Order ID:", orderId);
      console.log("customer email:", customerEmail);
      console.log("customerId:", customerId);

      let customerOrderDetails = {
        customerName,
        orderId,
        customerEmail,
        paymentStatus: sessionData.payment_status

      }

      try {
        const updatedOrder = await Order.findOneAndUpdate(
          { _id: orderId },
          { orderStatus: 'placed' },
          { new: true } // This option returns the updated document
        );

        console.log("Order updated:", updatedOrder);

        // Delete user cart after placing the order CartData
        const existingCart = await CartData.findOneAndDelete({ userID: customerId });

        console.log("existingCart:", existingCart);


        console.log("User cart deleted:", existingCart);

        return res.status(200).json({ message: 'Payment successful Order placed', orderDetails: customerOrderDetails });



      } catch (error) {
        console.error("Error updating order status:", error);
        return res.status(500).send('Internal Server Error');
      }




      // return res.status(200).json({ message: 'Payment successful! Order placed.', orderDetails: customerOrderDetails });

    } else {
      // Payment was not successful, handle accordingly
      // Example: Do not create the order or mark it as 'pending' in your database pending
      console.log("Payment failed:", sessionData)
      const { 'order id': orderId } = sessionData.metadata;
      //deleting payment
      const deletedOrder = await Order.findOneAndDelete({ _id: orderId });

      console.log("Deleted pending order:", deletedOrder);

      res.json({ message: 'Payment failed. Order not placed.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }





}



const getUserPlacedOrder = async (req, res) => {
  const userId = req.params.id;

  try {
    const orders = await Order.find({
      userID: userId,
      orderStatus:  { $in: ["placed", "shipped", "delivered","cancelled"] }
    }).sort({ createdAt: -1 });
    console.log("orders:", orders)

    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};




module.exports = {
  forgotPassword,
  resetPassword,
  RegisterUser, UserLogin, PostCart, GetCartWithTotalPrice,
  Checkout, UpdateCart, DeleteCart, CreateCart, GetCartnew,
  CreateCartForLocalStoreditems, Payment, RetrieveSession,
  getAllProductsByCategory,
  getAllFeaturedProducts,
  getUserPlacedOrder
}



