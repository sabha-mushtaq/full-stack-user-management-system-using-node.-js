const bcrypt = require('bcrypt');
const userSchema = require('../model/DB_Schema.js');
// Pre-save middleware to hash password before saving
const hashsalt =()=>{userSchema.pre('save', async function (next) {
    // Only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        return next();
    }
    
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password using the salt
        this.password = await bcrypt.hash(this.password, salt);
        next(); // Invoke next middleware
    } catch (error) {
        return next(error); // Pass error to next middleware
    }
})};


module.exports = {hashsalt};
