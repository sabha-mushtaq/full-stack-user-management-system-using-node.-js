const mongoose = require('mongoose');
const usermodel = require('../model/DB_Schema.js');
const bcrypt = require('bcrypt');
const { createToken } = require('./jwtgeneration.js');
const login = async (req, res) => {
  const { EmailOrUsername, password } = req.body;
  console.log('EmailOrUsername:', EmailOrUsername);
  console.log('Password:', password);
  
  // Check if EmailOrUsername is provided
  if (!EmailOrUsername) {
    return res.status(400).json({
      success: false,
      message: 'Please provide an Email or Username'
    });
  }

  try {
    // Find the user by either Email or Username
    const user = await usermodel.findOne({
      $or: [
        { Name: EmailOrUsername },
        { Email: EmailOrUsername },
        { Username: EmailOrUsername }  // Added Username field in query
      ]
    }).select('+password');
    
console.log(user);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Compare the provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate a token for the user
    const token = createToken(res, user);
   
    // Render the home page with user data
  return res.redirect('home')

  } catch (e) {
    // Handle server error
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};



module.exports = { login };

