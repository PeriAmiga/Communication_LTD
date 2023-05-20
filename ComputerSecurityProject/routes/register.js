var express = require('express');
var router = express.Router();
const fs = require('fs');
const passwordConfig = require('./passwordConfiguration.js');
const passwordDictionary = require('./commonPassword.js');
const mysql = require("mysql2");
const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');


const salt = fs.readFileSync('../routes/salt.txt', 'utf-8');

function Hash(str, salt) {
    const inputBytes = Buffer.from(str);
    const hashBytes = pbkdf2.pbkdf2Sync(inputBytes, salt, 1000, 32, 'sha256');
    return hashBytes.toString('hex');
}


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Communication_LTD',
    multipleStatements: true
});


function containNumber(str) {
    return /\d/.test(str);
}

function containUppercase(str) {
    return (/[A-Z]/.test(str));
}

function containLowercase(str) {
    return (/[a-z]/.test(str));
}

function containSymbol(password) {
    let containsSymbol = false;
    for (let i = 0; i < passwordConfig.mustToHaveChars.length; i++) {
        if (password.includes(passwordConfig.mustToHaveChars[i])) {
            containsSymbol = true;
            break;
        }
    }
    return containsSymbol;
}

function commonPass(password) {
    return passwordDictionary.includes(password);
}



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");

    function resFunction(response)
    {
        if (!res.headersSent) {
            res.send(response);
        }
    }

    if(req.body.password.length >= passwordConfig.minLength)
    {
        if(passwordConfig.requireNumbers) {
            if(!containNumber(req.body.password))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(passwordConfig.requireUppercase) {
            if(!containUppercase(req.body.password))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(passwordConfig.requireLowercase) {
            if(!containLowercase(req.body.password))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(!containSymbol(req.body.password))
        {
            resFunction({message: "false" });
            return;
        }
        if(commonPass(req.body.password))
        {
            resFunction({message: "false" });
            return;
        }
    }
    else
    {
        resFunction({message: "false" });
        return;
    }

    const user = {
        email: req.body.email,
        username: req.body.username,
        password: Hash(req.body.password,salt),
        password_array: JSON.stringify([Hash(req.body.password,salt)])
    };


    // Select all usernames from the Users table
    const queryUsername = `SELECT username FROM Users WHERE username = ?`;
    const values = [user.username];

    // Execute the query
    connection.query(queryUsername, values, (err, results, fields) => {
        if (err) throw err;

        // Print out the usernames
        if (results.length > 0) {
            resFunction({message: "sql" });
        }
        else
        {
            // Select all emails from the Users table
            const queryEmail = `SELECT email FROM Users WHERE email = '${user.email}'`;

            // Execute the query
            connection.query(queryEmail, (err, results, fields) => {
                if (err) throw err;

                if(results.length > 0)
                {
                    resFunction({message: "sql" });
                }
                else
                {
                    resFunction({message: "accept" });
                    const query = 'INSERT INTO Users (email, username, password, password_array) VALUES (?, ?, ?, ?)';
                    const values = [user.email, user.username, user.password, user.password_array];

                    connection.query(query, values, (error, results, fields) => {
                        if (error) {
                            console.error(error);
                            throw error;
                        }
                        console.log('User added to database.');
                    });
                }
            });
        }
    });
});


module.exports = router;