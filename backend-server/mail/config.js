const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport(
    {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "6f385e8b4ebc97",
            pass: "2299226e1091a9"
        }
    }
);

module.exports = transport