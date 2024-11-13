async function errorHandler(err, req, res, next) {
    // Log the error message for debugging purposes
    console.error(err.message);
  
    // Send a JSON response to the client with error details
    return res.status(500).json({
      success: false,
      message: err.message || 'Internal Server Error',  // Fallback message if err.message is undefined
    });
  }
  
  module.exports = errorHandler;
  