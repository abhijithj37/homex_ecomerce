const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require("dotenv")
const morgan = require("morgan")
const cors = require('cors')
const connectDB = require('./config/db')
const AdminRouter = require('./routes/admin')
const UserRouter = require('./routes/user')
const path = require('path');
dotenv.config()
mongoose.set('strictQuery', false);


//file upload
const bodyParser = require('body-parser');
const multer = require("multer");
const { trackVisitors } = require('./middlewares/trackVisitors')
// const upload = multer({ _dir: "uploads" });
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//CONNECTING TO DB
connectDB()

//MIDDLEWEARS
app.use(cors())
app.use(morgan("common"))
app.use(express.json());
// Use Morgan for request logging
app.use(morgan('dev'));

app.use('/images', express.static(path.join(__dirname, 'public/images')))
app.use('/admin', AdminRouter)
app.use('/',trackVisitors, UserRouter)



const startServer = async (req, res) => {
  try {
    app.listen(process.env.PORT || 8000, console.log("Server started at port:", process.env.PORT))
  } catch (err) {
    console.log(err.message);
  }
};
startServer();
