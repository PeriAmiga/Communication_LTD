var express = require('express');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const mysql = require("mysql2");
var router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Communication_LTD',
});


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.query.email !== undefined)
    {
        if (!req.session.emailValidation) {
            // Flag does not exist, redirect or show an error message
            res.redirect('error'); // Redirect to the "error" page
            return;
        }
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

        // Select all usernames from the Users table
        const queryEmail = `SELECT * FROM Codes WHERE email = '${req.query.email}'`;

        // Execute the query
        connection.query(queryEmail, (err, results, fields) => {
            if (err) throw err;
            // Print out the usernames
            if (results.length === 0) {
                //INSERT new data
                const query = 'INSERT INTO Codes (email, code) VALUES (?, ?)';
                const values = [req.query.email, hashedCode];

                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    console.log('Data added to database.');
                });
            }
            else
            {
                //UPDATE data
                const query = 'UPDATE Codes SET code = ? WHERE email = ?';
                const values = [hashedCode, req.query.email];

                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                    console.log('Data updated successfully.');
                });
            }
        });
        req.session.emailValidation = false;
        res.render('codevalidation', {email: req.query.email});
    }
    else
    {
        req.session.emailValidation = false;
        res.render('error');
    }
});
/* GET home page. */
router.post('/', function(req, res, next) {

    function resFunction(response)
    {
        if (!res.headersSent) {
            res.send(response);
        }
    }

    // Select all usernames from the Users table
    const queryEmail = `SELECT * FROM Codes WHERE email = '${req.body.email}'`;

    // Execute the query
    connection.query(queryEmail, (err, results, fields) => {
        if (err) throw err;
        // Print out the usernames
        if (results[0].code !== req.body.code) {
            resFunction(false);
        }
        else
        {
            req.session.codeValidated = true;
            resFunction(true);
        }
    });
});

module.exports = router;
