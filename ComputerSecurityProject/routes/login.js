var express = require('express');
const fs = require("fs");
const pbkdf2 = require("pbkdf2");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
const passwordConfig = require('./passwordConfiguration.js');
var router = express.Router();

const salt = fs.readFileSync('../routes/salt.txt', 'utf-8');

function Hash(str, salt) {
    const inputBytes = Buffer.from(str);
    const hashBytes = pbkdf2.pbkdf2Sync(inputBytes, salt, 1000, 32, 'sha256');
    return hashBytes.toString('hex');
}


function generateRandomString() {
    const symbols = ["!", "@", "#", "$", "%", "^", "&", "*"];
    const allChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";

    // Add at least one uppercase letter
    password += getRandomChar("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
    // Add at least one lowercase letter
    password += getRandomChar("abcdefghijklmnopqrstuvwxyz");
    // Add at least one number
    password += getRandomChar("0123456789");
    // Add at least one symbol
    password += getRandomChar(symbols);

    // Add additional random characters
    while (password.length < 10) {
        password += getRandomChar(allChars);
    }

    return password;
}

function getRandomChar(characters) {
    return characters[Math.floor(Math.random() * characters.length)];
}

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Communication_LTD',
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {

    function resFunction(response)
    {
        if (!res.headersSent && response.message === "accept") {
            res.cookie('user', {username: user.username});
            res.send(response);
        }
        else if(!res.headersSent)
        {
            res.send(response);
        }
    }

    const user = {
        username: req.body.username,
        password: Hash(req.body.password,salt),
    };


    // Select all usernames from the Users table
    const queryUsername = `SELECT * FROM Users WHERE username = '${user.username}'`;

    // Execute the query
    connection.query(queryUsername, (err, results, fields) => {
        if (err) throw err;

        // Print out the usernames
        if (results.length === 0) {
            resFunction({message: "false" });
        }
        else
        {
            let tries = results[0].login_attempts;
            if(results[0].username === user.username && results[0].password === user.password) {
                resFunction({message: "accept"});
                const query = 'UPDATE Users SET login_attempts = ? WHERE username = ?';
                const values = [0, user.username];
                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                console.log('User logged successfully.');
                });
            }
            else if(tries === passwordConfig.loginAttemptsAllowed)
            {
                resFunction({message: "email"});
                const randomPassword = generateRandomString();
                const query = 'UPDATE Users SET login_attempts = ?, password = ? WHERE username = ?';
                const values = [0, Hash(randomPassword,salt), user.username];

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
                    to: `${results[0].email}`,
                    subject: 'Your New Password',
                    text: `Your new password is ${randomPassword}, please don't share it with anyone!`
                };

                // Send the email
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });


                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                });
            }
            else
            {
                resFunction({message: "false" });
                tries += 1;
                const query = 'UPDATE Users SET login_attempts = ? WHERE username = ?';
                const values = [tries, user.username];

                connection.query(query, values, (error, results, fields) => {
                    if (error) {
                        console.error(error);
                        throw error;
                    }
                });
            }
        }
        });
});

module.exports = router;
