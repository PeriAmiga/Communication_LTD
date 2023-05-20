var express = require('express');
const mysql = require("mysql2");
var router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Communication_LTD',
    multipleStatements: true
});


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('emailvalidation');
});
router.post('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");

    function resFunction(response)
    {
        if (!res.headersSent) {
            res.send(response);
        }
    }
    // Select all usernames from the Users table
    const queryEmail = `SELECT * FROM Users WHERE email = '${req.body.email}'`;

    // Execute the query
    connection.query(queryEmail, (err, results, fields) => {
        if (err) throw err;
        // Print out the usernames
        if (results.length === 0) {
            resFunction(false );
        }
        else
        {
            req.session.emailValidation = true;
            resFunction(true);
        }
    });
});

module.exports = router;
