import AdminInstance from "../Instances/AdminInstance"

//ADMIN END POINTS
export const Adminlogin=(values)=>AdminInstance.post(`admin/login`,values)
//PRODUCT
// export const AddProduct=(values)=>AdminInstance.post(`admin/add-product`,values)
export const GetAllproduct=()=>AdminInstance.get(`admin/all-products`)
export const GetSingleProduct=(productId)=>AdminInstance.get(`admin/single-product/${productId}`)
export const DeleteProduct=(productId)=>AdminInstance.delete(`admin/delete-product/${productId}`)
//CATAGORIES
export const AddCatagory=(values)=>AdminInstance.post(`admin/add-catagory`,values)
export const GetCategory=()=>AdminInstance.get(`admin/get-categories`)
export const DeleteCategory=(categoryId)=>AdminInstance.delete(`admin/delete-categery/${categoryId}`)
//ORDERS
export const GetAllOrders=()=>AdminInstance.get(`admin/all-orders`)
export const UpdateOrderStatus=(values)=>AdminInstance.put(`admin/update-orderStatus`,values)
export const DeleteOrder=(orderId)=>AdminInstance.delete(`admin/delete-order/${orderId}`)
export const GetPlacedOrder=()=>AdminInstance.get(`admin/placed-orders`)
export const GetOrderByitStatus=(status)=>AdminInstance.get(`admin/get-order-status/${status}`)
export const GetAllVisitors=()=>AdminInstance.get(`admin/visitors`)
//BLOG
export const GetAllBlogs = () => AdminInstance.get('admin/all-blogs');
export const GetBlogById = (blogId) => AdminInstance.get(`admin/blog/${blogId}`);
export const DeleteBlogById = (blogId) => AdminInstance.delete(`admin/delete-blog/${blogId}`);
// USERS
export const GetAllUsers = () => AdminInstance.get('admin/all-users');
export const DeleteUser = (userId) => AdminInstance.delete(`admin/delete-user/${userId}`);
// BANNER
export const GetAllBanner=()=>AdminInstance.get(`admin/all-banners`)
export const DeleteBanner=(id)=>AdminInstance.delete(`admin//delete-banner/${id}`)

// router.get('/all-banners', verifyAdmin, getAllBanners);
// router.post('/add-banner', verifyAdmin, addBanner);
// router.put('/update-banner/:id', verifyAdmin, updateBannerById);
// router.delete('/delete-banner/:id', verifyAdmin, deleteBannerById);

