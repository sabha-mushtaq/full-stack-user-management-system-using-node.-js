// creating express server
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');
const app = express();
app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'mainfolder', 'views'));

app.use(express.static(path.join(__dirname, 'mainfolder', 'public')));



const session = require('express-session');

app.use(session({
    secret: 'API_KEY',   // replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }    // Set `true` if using HTTPS
}));


const dotenv = require('dotenv');
dotenv.config()
app.use(express.json());  // For JSON data
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
// route setting
const authRouter = require('./mainfolder/routes/routes.js');
app.use('/insta',authRouter);
 
// Defining port adress
const port =  5001;
//connecting to database 
const connecttodatabase = require('./mainfolder/model/connect.js');
connecttodatabase()
// error handling middleware
const {errorHandler} =require('./mainfolder/middlewares/errorhandling.js')
//listening server
app.listen(port,()=>{

console.log('server listening sucessfully on port', port);





})