const nodemailer = require('nodemailer')
require('dotenv').config()

const sendEmail = (subject, message, send_to, sent_from, reply_to) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: "465",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            }
        })
    
        const options = {
            from: sent_from,
            to: send_to,
            replyTo: reply_to,
            subject: subject,
            html: message
        }
    
        //sendEmail
    
        transporter.sendMail(options, function(err, info) {
            if(err) {
                console.log(err)
                return reject(err);
            } else{ 
                return resolve(info)
            }
        })
    })
}

module.exports= sendEmail