var express = require('express');
const fs = require("fs");
const pbkdf2 = require("pbkdf2");
const mysql = require("mysql2");
const passwordConfig = require("./passwordConfiguration");
const passwordDictionary = require("./commonPassword");
var router = express.Router();

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

function historyPassword(password, historyArray) {
    for (let i=0; i < historyArray.length || i < passwordConfig.passwordHistory; i++)
    {
        if(Hash(password,salt) === historyArray[i])
        {
            return true;
        }
    }
    return false;
}


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('changepassword');
});

router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    function resFunction(response)
    {
        if (!res.headersSent) {
            res.send(response);
        }
    }

    if(req.body.newPassword.length >= passwordConfig.minLength)
    {
        if(passwordConfig.requireNumbers) {
            if(!containNumber(req.body.newPassword))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(passwordConfig.requireUppercase) {
            if(!containUppercase(req.body.newPassword))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(passwordConfig.requireLowercase) {
            if(!containLowercase(req.body.newPassword))
            {
                resFunction({message: "false" });
                return;
            }
        }
        if(!containSymbol(req.body.newPassword))
        {
            resFunction({message: "false" });
            return;
        }
        if(commonPass(req.body.newPassword))
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
        password: Hash(req.body.newPassword,salt),
        password_array: []
    };

    // Select all emails from the Users table
    const queryEmail = `SELECT * FROM Users WHERE email = '${user.email}'`;

    // Execute the query
    connection.query(queryEmail, (err, results, fields) => {
        if (err) throw err;

        if (results.length === 0)
        {
            resFunction({message: "false" });
            return;
        }
        user.password_array = JSON.parse(results[0].password_array);
        if(historyPassword(req.body.newPassword, user.password_array))
        {
            resFunction({message: "history" });
            return;
        }
        if (Hash(req.body.oldPassword,salt) !== results[0].password)
        {
            resFunction({message: "false" });
            return;
        }

        resFunction({message: "accept" });

        user.password_array.splice(0, 0, user.password);
        const query = 'UPDATE Users SET password = ?, password_array = ? WHERE email = ?';
        const values = [user.password, JSON.stringify(user.password_array), user.email];

        connection.query(query, values, (error, results, fields) => {
            if (error) {
                console.error(error);
                throw error;
            }
            console.log('User updated successfully.');
        });
    });
});

module.exports = router;
