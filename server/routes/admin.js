const express = require('express')
const router = express.Router()
const { adminLogin, AddProduct, AddCatagory, deleteProduct, GetCatagories, getAllProducts,
    SingleProdut, editProduct, DeleteCatagories, getAllOrders, updateOrderStatus, deleteOrder,
    getPlacedOrder, getOrderByStatus, addBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,getAllUsers,
    deleteUserById,
    getAllBanners,
    getBannerById,
    addBanner,
    updateBannerById,
    deleteBannerById, } = require('../controller/adminController')
const ProductImageupload = require('../config/multer')
const { verifyAdmin } = require('../middlewares/adminAuthMiddleware')
const Visitor = require('../models/visitor')


router.post('/login', adminLogin)
//PRODUCT
router.post('/add-product', verifyAdmin, ProductImageupload.array('images'), AddProduct)
router.get('/all-products', getAllProducts)
router.get('/single-product/:productId', SingleProdut)
router.put('/edit-product/:productId', verifyAdmin, ProductImageupload.array('images'), editProduct)
router.delete('/delete-product/:productId', verifyAdmin, deleteProduct)
//CATAGORIES
router.post('/add-catagory', verifyAdmin, AddCatagory)
router.get('/get-categories', GetCatagories)
router.delete('/delete-categery/:categoryId', DeleteCatagories)
// ORDER
router.get('/all-orders', getAllOrders)
router.put('/update-orderStatus', verifyAdmin, updateOrderStatus)
router.delete('/delete-order/:orderId', verifyAdmin, deleteOrder)
router.get('/placed-orders', verifyAdmin, getPlacedOrder)
router.get('/get-order-status/:status', verifyAdmin, getOrderByStatus)
// BLOGG
router.post('/add-blog',verifyAdmin, ProductImageupload.array('images'), addBlog);
router.get('/all-blogs',verifyAdmin, getAllBlogs);
router.get('/blog/:id',verifyAdmin, getBlogById);
router.put('/update-blog/:blogId',verifyAdmin, ProductImageupload.array('images'), updateBlogById);
router.delete('/delete-blog/:id',verifyAdmin, deleteBlogById);
//USER
router.get('/all-users',verifyAdmin, getAllUsers);
router.delete('/delete-user/:id', deleteUserById);
//BANNER
router.get('/all-banners', verifyAdmin, getAllBanners);
router.post('/add-banner', ProductImageupload.array('images'), verifyAdmin, addBanner);
router.put('/update-banner/:id', verifyAdmin, updateBannerById);
router.delete('/delete-banner/:id', verifyAdmin, deleteBannerById);







//TO GET SITE VISIOTRS COUNT
router.get('/visitors', verifyAdmin, async (req, res) => {
    try {
        const visitorData = await Visitor.find();
        res.json(visitorData);
    } catch (error) {
        console.error('Error fetching visitor data:', error);
        res.status(500).json({ error: 'Failed to fetch visitor data' });
    }
});




















module.exports = router