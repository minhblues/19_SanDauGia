const db = require('../utils/db');
const nodemailer = require('nodemailer');

module.exports={
    sendEmail: (req,res,email,sub,htm)=>{
        var smtpTransport = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "minhcine99@gmail.com",
                pass: "taolaminhne"
            }
        });
        var mailOptions;
        mailOptions = {
            to: email,
            subject: sub,
            html: htm
        }
        console.log(mailOptions);
        smtpTransport.sendMail(mailOptions, function (error, response) {
            if (error) {
                console.log(error);
            } else {
                console.log("Message sent: " + response.message);
            }
        });
    
    }
}