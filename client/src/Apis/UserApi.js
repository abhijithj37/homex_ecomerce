import UserInstance from "../Instances/UserInstance";

export const UserRegister = (values) => UserInstance.post(`register-user`, values)
export const UserLogin = (values) => UserInstance.post(`user-login`, values)
export const GetAllproduct = () => UserInstance.get(`admin/all-products`)
export const GetSingleProduct = (productId) => UserInstance.get(`admin/single-product/${productId}`)
export const PostAddToCart = (values) => UserInstance.post(`cart`, values)
export const GetCartWithTotalPrice = (id) => UserInstance.get(`cart/${id}`)
export const CheckOut = (values) => UserInstance.post(`checkout`, values)

export const forgotPassword = (values) => UserInstance.post(`forgot-password`, values)
export const resetPassword = (values) => UserInstance.post(`reset-password`, values)


// router.post('/forgot-password',forgotPassword )


export const AllProducts=()=>UserInstance.get(`all-products`)
export const SingleProduct=(productId)=>UserInstance.get(`single-product/${productId}`)
export const Catagories=()=>UserInstance.get(`get-categories`)
export const FeaturedProducts=()=>UserInstance.get(`featured-products`)

// ==========new cart========================//
export const PostCartnew = (values) => UserInstance.post(`cart-new`, values)
export const PutCartnew = (id, updatedCart) => UserInstance.put(`cart-new/${id}`,updatedCart)
export const GetCartnew = (id) => UserInstance.get(`cart-new/${id}`)
export const DeleteCartnew = (id) => UserInstance.delete(`cart-new/${id}`)
export const PostCartForLocalStoreditems = (values) => UserInstance.post(`create-cart-for-localstored`, values)
export const Payment = (values) => UserInstance.post(`payment`, values)
export const RetrieveSession = (values) => UserInstance.post(`retrieve-session`,values)
export const GetAllProductsByCategory = (category) => UserInstance.get(`product-by-cataorie/${category}`)

export const AllBanners=()=>UserInstance.get(`banners`)
export const AllBlogs=()=>UserInstance.get(`blogs`)
export const GetUserPlacedOrder = (id) => UserInstance.get(`/user-orders/${id}`)

