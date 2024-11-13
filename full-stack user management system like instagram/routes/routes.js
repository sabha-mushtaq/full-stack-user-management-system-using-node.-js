const express = require('express');
const authRouter = express.Router();
const { signup } = require('../controllers/signup.js');
const { verifytoken } = require('../controllers/jwtgeneration.js');
const { login } = require('../controllers/login.js');
const usermodel = require('../model/DB_Schema.js');
const path = require('path');
const { log } = require('console');

// Route for signing up
authRouter.post('/signup', signup);
authRouter.post('/login', login);
authRouter.get('/signup', (req, res) => {
    return res.render('signup.ejs');
});
authRouter.get('/login', async (req, res) => {
    
    return res.render('login.ejs');
});

// Home route
authRouter.get('/home', verifytoken, async (req, res) => {
    try {
        await usermodel.updateOne(
            { _id: req.session.userId }, // Ensure you have the correct user ID
            { $inc: { visitCount: 1 } }   // Increment visitCount by 1
        )
   
        // Fetch the updated user details
        const user = await usermodel.findById(req.session.userId); // Make sure to use req.session.userId

        // Check if the user is found
        if (!user) {
            return res.status(404).send("User not found"); // Handle user not found
        }




        // Render the home page with user details
        return res.render('home', {
            username: user.Username, // Match the case exactly
            bio: user.bio,           // Match the case exactly
            email: user.Email,       // Match the case exactly
            viewCount: user.visitCount, // Pass updated visit count to the template
            imagePath : '/profile.png'
        });
    } catch (error) {
        console.error("Error fetching user data:", error);
        res.status(500).send("Internal Server Error"); // Handle errors appropriately
    }
});
// Logout route
authRouter.post('/logout',verifytoken, (req, res) => {
    // Clear the JWT cookie
    res.clearCookie('token'); // Use the name of your cookie here
    // Redirect to login page
    res.redirect('/insta/login');
});


module.exports = authRouter;
