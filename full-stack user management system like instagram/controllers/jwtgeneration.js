const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const JWT_SECRET = process.env.API_KEY; // Your JWT secret from environment variables

// Create JWT token function
const createToken = (res, user) => {
    // Payload can include any user information you want to encode
    const payload = {
        id: user._id,       // typically user id is used
        username: user.Username
    };

    // Create a JWT token, with an expiry time of 1 day
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });

    // Set the cookie
    res.cookie('token', token, {
        httpOnly: true,     // Prevents JavaScript access
        secure: false,       // Only sent over HTTPS
        sameSite: 'Strict', // Prevents cross-site sending
        maxAge: 3600000     // Expiration (in ms)
    });

   
  
};

// Verifying token
const verifytoken = (req, res, next) => {
    // Extract token from the cookies
    const token = req.cookies.token;

    // Check if the token is provided
    if (!token) {
        return res.redirect('/insta/login');
    }

    // Verify the token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.redirect('/insta/login');
        }

        // Token is valid; store decoded information in request object
        req.user = decoded;
        req.session.userId = decoded.id; // Use `id` from payload, not `userId`
        console.log("Session User ID:", req.session.userId);

        next(); // Proceed to the next middleware or route handler
    });
}

module.exports = { createToken, verifytoken };
