const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const admin = require('../models/admin')
const ProductData = require("../models/product");
const Category = require("../models/catagory");
const fs = require('fs');
const Order = require("../models/order");
const DeletedOrder = require("../models/deletedOrder");
const Blog = require('../models/blog')
const User = require('../models/user');
const Banner = require('../models/banner');



//user name:"ananthu"
//password:"123"//$2a$12$IHAJeVrwC4ZBU0xLVS5X0.UZ2jBJZsoJGobdjh/nMqtiEEe5xuwyC


const adminLogin = async (req, res) => {
    console.log("login credentials...", req.body)
    try {
        let userName = await admin.findOne({ username: req.body.username })
        if (userName) {
            console.log("finded..", userName)
            const checkPassword = await bcrypt.compare(req.body.password, userName.password)
            if (checkPassword) {

                const id = userName._id
                const AdminToken = jwt.sign({ id },
                    process.env.SECRET_KEY, {
                    expiresIn: "1d",
                })
                console.log("ress jwt..", userName, AdminToken)

                res.status(200).json({ AdminToken: AdminToken, })

            } else {
                console.log("wrong password")
                res.status(401).json({ error: "wrong password" })
            }
        }
        else {
            console.log("wrong user name")
            res.status(401).json({ error: "wrong user name" })
        }
    }
    catch (err) {
        console.log("Err", err)
    }
}

// ============================PRODUCT========================================================================//
const AddProduct = async (req, res) => {
    // console.log(" req.body..", req.body)
    // console.log("req.files..", req.files)
    try {
        // Extract data from req.body and req.files
        const { title, videoLink, category, price, description, specification, featured } = req.body;
        const images = req.files.map((file) => file.filename);
        // Convert the featured field to a Boolean value
        const isFeatured = featured === 'true';

        // Create a new product instance
        const newProduct = new ProductData({
            title,
            videolink: videoLink, // Note the lowercase "videolink" to match your schema
            category,
            price,
            description,
            specification,
            isfeatured: isFeatured,
            images: images.map((img) => ({ img })), // Map images to an array of objects with "img" property
        });
        // Save the new product to the database
        const savedProduct = await newProduct.save();
        // Send a success response with the saved product data
        res.status(200).json({ message: 'Product added successfully', data: savedProduct });
    } catch (error) {
        console.error("Error adding product:", error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to add product' });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductData.find().sort({ createdAt: -1 });
        // console.log("products:", products)
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
};

const SingleProdut = async (req, res) => {
    try {
        const { productId } = req.params; // Get the product ID from the request parameters
        const product = await ProductData.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ error: 'Failed to fetch product' });
    }
};




const editProduct = async (req, res) => {
    const { productId } = req.params;
    // const images = req.files; // Access uploaded files
    // console.log("images:",images)
    try {
        // Extract data from req.body
        const { title, videoLink, category, price, description, specification, featured } = req.body;
        // Convert the featured field to a Boolean value
        const isFeatured = featured === 'true';

        // Find the existing product by productId
        const existingProduct = await ProductData.findById(productId);

        if (!existingProduct) {
            // If the product with the given productId is not found, send an error response
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update the product details
        existingProduct.title = title;
        existingProduct.videolink = videoLink; // Note the lowercase "videolink" to match your schema
        existingProduct.category = category;
        existingProduct.price = price;
        existingProduct.description = description;
        existingProduct.specification = specification;
        existingProduct.isfeatured = isFeatured;

        // Save the updated product to the database
        const updatedProduct = await existingProduct.save();

        // Send a success response with the updated product data
        res.status(200).json({ message: 'Product updated successfully', data: updatedProduct });
    } catch (error) {
        console.error("Error updating product:", error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to update product' });
    }
};




const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params; // Get the product ID from the request parameters

        // Find the product by ID and remove it from the database
        const deletedProduct = await ProductData.findByIdAndRemove(productId);

        if (!deletedProduct) {
            // If the product with the specified ID doesn't exist, return an error
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete associated images from the server (assuming you have stored image filenames in the product document)
        deletedProduct.images.forEach((image) => {
            // You can use fs.unlink or a similar method to delete the images from the server
            fs.unlink(`./public/images/${image.img}`, (err) => {
                if (err) {
                    console.error('Error deleting image:', err);
                }
            });
        });

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
};

// ====================================================================================================================//





const AddCatagory = async (req, res) => {
    console.log("req.body:", req.body)
    try {
        // Extract the category name from req.body
        const { name } = req.body;

        // Create a new category instance
        const newCategory = new Category({
            name,
        });

        // Save the new category to the database
        const savedCategory = await newCategory.save();

        // Send a success response with the saved category data
        res.status(200).json({ message: 'Category added successfully', data: savedCategory });
    } catch (error) {
        console.error("Error adding category:", error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to add category' });
    }
}

const GetCatagories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ dateCreated: -1 })
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
}

const DeleteCatagories = async (req, res) => {
    try {
        const { categoryId } = req.params;
        // Delete the category by ID
        await Category.findByIdAndRemove(categoryId);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.error("Error deleting category:", error);
        res.status(500).json({ error: 'Failed to delete category' });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};


// const getPlacedOrder = async (req, res) => {
//     try {
//         const orders = await Order.find({ orderStatus: { $in: ["placed", "shipped", "delivered"] } }).sort({ createdAt: -1 });
//         res.status(200).json(orders);
//     } catch (error) {
//         console.error("Error fetching orders:", error);
//         res.status(500).json({ error: 'Failed to fetch orders' });
//     }
// };



const getPlacedOrder = async (req, res) => {
    try {
        const orders = await Order.find({ orderStatus: { $in: ["placed"] } }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

const getOrderByStatus = async (req, res) => {
    const { status } = req.params; // Assuming the status is passed in the URL params
    try {
        // Use $in to handle multiple status values if needed
        const orders = await Order.find({ orderStatus: { $in: [status] } }).sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};


const updateOrderStatus = async (req, res) => {
    const { orderId, newStatus } = req.body;
    console.log("updateOrderStatus:", req.body)


    
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ error: 'Order not found' });
        }
        order.orderStatus = newStatus;
        await order.save();
        res.status(200).json({ message: 'Order status updated successfully',order:order });
    } catch (error) {
        // Handle errors, log them, and send an error response
        console.error('Error updating order status:', error);
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

const deleteOrder = async (req, res) => {
    const orderId = req.params.orderId;
    try {
        // Find the order to be deleted
        const orderToDelete = await Order.findById(orderId);

        // If the order is not found, handle the case accordingly
        if (!orderToDelete) {
            res.status(404).json({ error: 'Order not found' });
        }

        // Create a new DeletedOrder based on the orderToDelete data
        const deletedOrder = new DeletedOrder({
            previousOrderId: orderToDelete._id,
            userID: orderToDelete.userID,
            products: orderToDelete.products,
            orderStatus: orderToDelete.orderStatus,
            orderTotal: orderToDelete.orderTotal,
            phoneNumber: orderToDelete.phoneNumber,
            email: orderToDelete.email,
            address: orderToDelete.address,
            temprorylydelete: orderToDelete.temprorylydelete,
        });

        // Save the DeletedOrder to the DeletedOrder collection
        await deletedOrder.save();

        console.log("deletedOrder:", deletedOrder)

        // Delete the original order
        await Order.findByIdAndDelete(orderId);

        console.log("Order deleted and stored in DeletedOrder collection");
        res.status(200).json({ message: 'Order deleted successfully', order: deletedOrder });

    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: 'Failed to delete order' });
    }
};
// Create a new blog post
const addBlog = async (req, res) => {

    console.log("add-blog:", req.body)

    // const images = req.files.map((file) => file.filename);

    console.log("images:", req.files[0].filename)


    try {
        const { heading, description, image, date } = req.body;

        // Create a new blog instance
        const newBlog = new Blog({
            heading,
            description,
            image: req.files[0].filename,
            date
        });

        // Save the new blog post to the database
        const savedBlog = await newBlog.save();

        console.log("savedBlog:", savedBlog)

        // Send a success response with the saved blog data
        res.status(200).json({ message: 'Blog post added successfully', data: savedBlog });
    } catch (error) {
        console.error('Error adding blog post:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to add blog post' });
    }
};

// Get all blog posts
const getAllBlogs = async (req, res) => {
    try {
        // Retrieve all blog posts from the database
        const blogs = await Blog.find().sort({ createdAt: -1 });

        // Send the blog posts as a response
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to fetch blog posts' });
    }
};

// Get a specific blog post by ID
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        // Retrieve the blog post by ID from the database
        const blog = await Blog.findById(id);

        // If the blog post is not found, send a 404 response
        if (!blog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // Send the blog post as a response
        res.status(200).json(blog);
    } catch (error) {
        console.error('Error fetching blog post by ID:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to fetch blog post' });
    }
};

// Update a blog post by ID
const updateBlogById = async (req, res) => {
    let updateBlog = {};
    const { blogId } = req.params;

    console.log("update-blog", blogId)

    try {
        const { heading, description, image, date } = req.body;

        // Find the existing blog post to get the old image filename
        const existingBlog = await Blog.findById(blogId);

        if (!existingBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }

        // If a new image is uploaded, delete the old image from the server
        if (req.files && req.files[0] && req.files[0].filename) {
            const oldImage = existingBlog.image;
            // const imagePath = path.join(__dirname, '../public/images', oldImage);

            try {
                fs.unlinkSync(`./public/images/${oldImage}`);
            } catch (err) {
                console.error('Error deleting old image:', err);
            }

            updateBlog = {
                heading,
                description,
                image: req.files[0].filename,
            };
        } else {
            updateBlog = {
                heading,
                description,
                date,
            };
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            blogId,
            updateBlog,
            { new: true }
        );

        res.status(200).json({ message: 'Blog post updated successfully', data: updatedBlog });
    } catch (error) {
        console.error('Error updating blog post by ID:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to update blog post' });
    }
};

const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params;
        // Find the blog post by ID
        const deletedBlog = await Blog.findById(id);
        // If the blog post is not found, send a 404 response
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog post not found' });
        }
        try {
            fs.unlinkSync(`./public/images/${deletedBlog.image}`);
        } catch (err) {
            console.error('Error deleting image:', err);
        }
        // Delete the blog post by ID from the database
        await Blog.findByIdAndDelete(id);
        // Send a success response with the deleted blog post data
        res.status(200).json({ message: 'Blog post and associated image deleted successfully', data: deletedBlog });
    } catch (error) {
        console.error('Error deleting blog post by ID:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};

const deleteUserById = async (req, res) => {
    const userId = req.params.id;

    try {
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Delete the user
        await user.remove();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

const addBanner = async (req, res) => {
    try {
        const { heading, description, image } = req.body;
        // Create a new banner instance
        const newBanner = new Banner({
            heading,
            description,
            image: req.files[0].filename
        });
        // Save the new banner to the database
        const savedBanner = await newBanner.save();
        // Send a success response with the saved banner data
        res.status(200).json({ message: 'Banner added successfully', data: savedBanner });
    } catch (error) {
        console.error('Error adding banner:', error);
        // Send an error response to the client
        res.status(500).json({ error: 'Failed to add banner' });
    }
};
const getAllBanners = async (req, res) => {
    try {
        const banners = await Banner.find().sort({ createdAt: -1 });
        res.status(200).json(banners);
    } catch (error) {
        console.error('Error fetching banners:', error);
        res.status(500).json({ error: 'Failed to fetch banners' });
    }
};
// const getBannerById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const banner = await Banner.findById(id);

//         if (!banner) {
//             return res.status(404).json({ error: 'Banner not found' });
//         }

//         res.status(200).json(banner);
//     } catch (error) {
//         console.error('Error fetching banner by ID:', error);
//         res.status(500).json({ error: 'Failed to fetch banner' });
//     }
// };

// const updateBannerById = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { heading, description, image } = req.body;

//         // Update the banner by ID in the database
//         const updatedBanner = await Banner.findByIdAndUpdate(
//             id,
//             { heading, description, image },
//             { new: true }
//         );

//         if (!updatedBanner) {
//             return res.status(404).json({ error: 'Banner not found' });
//         }

//         res.status(200).json({ message: 'Banner updated successfully', data: updatedBanner });
//     } catch (error) {
//         console.error('Error updating banner by ID:', error);
//         res.status(500).json({ error: 'Failed to update banner' });
//     }
// };
const updateBannerById = async (req, res) => {
    let updateBanner = {};
    const { id } = req.params;

    try {
        const { heading, description, image } = req.body;

        // Find the existing banner to get the old image filename
        const existingBanner = await Banner.findById(id);

        if (!existingBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }

        // If a new image is uploaded, delete the old image from the server
        if (req.files && req.files[0] && req.files[0].filename) {
            const oldImage = existingBanner.image;

            try {
                fs.unlinkSync(`./public/images/${oldImage}`);
            } catch (err) {
                console.error('Error deleting old image:', err);
            }

            updateBanner = {
                heading,
                description,
                image: req.files[0].filename,
            };
        } else {
            updateBanner = {
                heading,
                description,
                image: existingBanner.image, // Keep the existing image if no new image is uploaded
            };
        }

        const updatedBanner = await Banner.findByIdAndUpdate(
            id,
            updateBanner,
            { new: true }
        );

        res.status(200).json({ message: 'Banner updated successfully', data: updatedBanner });
    } catch (error) {
        console.error('Error updating banner by ID:', error);
        res.status(500).json({ error: 'Failed to update banner' });
    }
};


const deleteBannerById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the banner by ID
        const deletedBanner = await Banner.findByIdAndDelete(id);

        if (!deletedBanner) {
            return res.status(404).json({ error: 'Banner not found' });
        }
        // console.log("deletedBanner:",deletedBanner)
        // Delete the associated image file
        fs.unlinkSync(`./public/images/${deletedBanner.image}`);

        // Send a success response with the deleted banner data
        res.status(200).json({ message: 'Banner deleted successfully', data: deletedBanner });
    } catch (error) {
        console.error('Error deleting banner by ID:', error);
        res.status(500).json({ error: 'Failed to delete banner' });
    }
};

module.exports = {
    adminLogin, AddProduct, getAllProducts,
    SingleProdut, editProduct, deleteProduct, AddCatagory,
    GetCatagories, DeleteCatagories, getAllOrders,
    updateOrderStatus, deleteOrder, getPlacedOrder,
    getOrderByStatus, addBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    getAllUsers,
    deleteUserById,
    getAllBanners,
    addBanner,
    updateBannerById,
    deleteBannerById,
}



