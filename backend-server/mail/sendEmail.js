const transport = require('./config');


const sendEmail = (userEmail, subj, message) => {

    // console.log(userEmail, subj, message);
    const mailOptions = {
        from: 'sustswe@gmail.com',
        to: userEmail,
        subject: subj,
        html: message
    };

    transport.sendMail(mailOptions)
        .then((res) => console.log('Email Sent!'))
        .catch((err) => console.log(err));
}

module.exports = sendEmail;