const express = require('express')
const router = express.Router()
const { RegisterUser, UserLogin, PostCart, GetCartWithTotalPrice,
    Checkout, UpdateCart,
    DeleteCart, CreateCart, GetCartnew,
    CreateCartForLocalStoreditems, Payment,
    RetrieveSession, getAllProductsByCategory,
    getAllFeaturedProducts,getUserPlacedOrder,forgotPassword,resetPassword
} = require('../controller/userController')
const { VerifyUser } = require('../middlewares/userAuthMiddleWare')
const { getAllProducts, SingleProdut, GetCatagories, getAllBanners, getAllBlogs } = require('../controller/adminController')
// const { trackVisitors } = require('../middlewares/trackVisitors')

router.post('/register-user', RegisterUser)
router.post('/user-login', UserLogin)
router.post('/forgot-password',forgotPassword )
router.post('/reset-password',resetPassword )


//CART
router.post('/cart', VerifyUser, PostCart)
router.get('/cart/:id', VerifyUser, GetCartWithTotalPrice)
router.post('/cart-new', VerifyUser, CreateCart)
router.put('/cart-new/:id', VerifyUser, UpdateCart)
router.delete('/cart-new/:id', VerifyUser, DeleteCart)
router.get('/cart-new/:id', VerifyUser, GetCartnew)
router.post('/create-cart-for-localstored', VerifyUser, CreateCartForLocalStoreditems)
//PAYMENT
router.post('/checkout', VerifyUser, Checkout,)
router.post('/payment', VerifyUser, Payment,)
router.post('/retrieve-session', RetrieveSession)
//PRODUCT
router.get('/all-products', getAllProducts)
router.get('/single-product/:productId', SingleProdut)
router.get('/get-categories', GetCatagories)
router.get('/product-by-cataorie/:category', getAllProductsByCategory)
router.get('/featured-products', getAllFeaturedProducts)
//BLOG
router.get('/blogs', getAllBlogs);
// BANNER
router.get('/banners', getAllBanners);
//ORDER
router.get('/user-orders/:id', VerifyUser,getUserPlacedOrder )







module.exports = router