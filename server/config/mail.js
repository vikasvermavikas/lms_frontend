// Import the Nodemailer library
const nodemailer = require('nodemailer');

// Create a transporter object
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // use tls
  auth: {
    user: 'rakeshkrmaurya12@gmail.com',
    pass: 'zyvrzwxhqngkiuzc',
  }
});

module.exports = transporter;