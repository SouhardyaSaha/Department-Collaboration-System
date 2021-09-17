const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport(
    {
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "582cffec0c74fb",
            pass: "a6a6bd9ced4a62"
        }
    }
);

module.exports = transport