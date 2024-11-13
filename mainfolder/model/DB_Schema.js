const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
Name:{
required :true,
type :String,
minlength: 5,
maxlength: 15,


},
Username:{
type: String,
required : true,

maxlength:15,






},
Email :{
type:String,
required:true,
unique :true,
lowercase:true,




},
password:{
type:String,
required:true,
select:false,





},
bio :{

type:String,
minlength:5,
required:true,


},
visitCount: { type: Number, default: 0 }

},
{


timestamps:true, })
userSchema.pre('save', async function (next) {
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
})
const usermodel =  mongoose.model('User',userSchema) 

module.exports = usermodel;