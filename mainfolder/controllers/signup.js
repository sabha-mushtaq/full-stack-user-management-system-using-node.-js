const mongoose = require('mongoose');
const usermodel = require('../model/DB_Schema.js'); 
const {createToken} =  require('./jwtgeneration.js')
// email validation dependency
const emailValidator = require('email-validator');


const signup = async (req, res) => {
  // request user data
  const { Name, Username, Email, password, bio } = req.body;


  // conditions to be checked before
  if (!Name || !Username || !Email || !password || !bio) {
    return res.status(400).json({ 
      success: false, 
      message: 'Every field is required' 
    });
  }

  // checking email validity
  const emailvalidate = emailValidator.validate(Email);
  if (!emailvalidate) {
    return res.status(400).json({
      success: false, 
      message: 'Invalid email'
    });
  }

  // save user in database
  try {
    const userinfo = new usermodel({ Name, Username, Email, password, bio });
    
    const user = await userinfo.save();

// Create JWT token
const token = createToken(res,user); // Get the token
return res.redirect('home')


  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        success: false, 
        message: 'Email already exists'
      });
    }
    return res.status(500).json({
      success: false, 
      message: e.message
    });
  }
};

module.exports = { signup };
