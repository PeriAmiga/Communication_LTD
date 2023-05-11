var express = require('express');
var router = express.Router();
const fs = require('fs');
const passwordConfig = require('./passwordConfiguration.js');

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
    var array = fs.readFileSync('commonPassword.js').toString().split("\n");
    for (i in array) {
        console.log(array[i]);
    }
    return true;
    //return commonPasswords.includes(password);
}



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    if(req.body.password.length >= passwordConfig.minLength)
    {
        if(passwordConfig.requireNumbers) {
            if(!containNumber(req.body.password))
            {
                res.send(false);
                return;
            }
        }
        if(passwordConfig.requireUppercase) {
            if(!containUppercase(req.body.password))
            {
                res.send(false);
                return;
            }
        }
        if(passwordConfig.requireLowercase) {
            if(!containLowercase(req.body.password))
            {
                res.send(false);
                return;
            }
        }
        if(!containSymbol(req.body.password))
        {
            res.send(false);
            return;
        }
        if(commonPass(req.body.password))
        {
            res.send(false);
            return;
        }
    }
    else
    {
        res.send(false);
        return;
    }
    res.send(true);
});


module.exports = router;