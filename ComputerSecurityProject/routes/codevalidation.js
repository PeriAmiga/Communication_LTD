var express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.email);
    if (req.query.email !== undefined)
    {
        const code = Math.floor(Math.random() * 900000) + 100000;
        const sha1sum = crypto.createHash('sha1');
        sha1sum.update(code.toString());
        const hashedCode = sha1sum.digest('hex');

        // Create a transporter object to send the email
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'computersec03@gmail.com',
                pass: 'vkfeslydypqgbnnx'
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'computersec03@gmail.com',
            to: `${req.query.email}`,
            subject: 'Your verification code',
            text: `Your verification code is ${hashedCode}, please don't share it with anyone!`
        };

// Send the email
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.render('codevalidation');
    }
    else
    {
        res.render('error');
    }
});
/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("OK");
});

module.exports = router;
