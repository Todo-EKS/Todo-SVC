const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

// Secret key used to sign the JWT token
const jwtSecret = process.env.JWT_SECRET;

module.exports = function decodeJWT(token) {
  // Decode the JWT token
  try {
    // const decodedToken = jwt.verify(token, secretKey);
    const decodedToken = jwt.verify(token, jwtSecret);

    return decodedToken
  } catch (error) {
    console.error('Error decoding token:', error.message);
  }
}
