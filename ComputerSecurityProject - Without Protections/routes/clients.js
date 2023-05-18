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


router.post('/', function(req, res, next) {

    if (req.body.flag)
    {
        // Add new client to the data
        const client = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            city: req.body.city,
            address: req.body.address,
        };
        const query = `INSERT INTO clients (firstName, lastName, phone, email, city, address) VALUES ('${client.firstname}', '${client.lastname}', '${client.phone}', '${client.email}', '${client.city}', '${client.address}')`;
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error(error);
                throw error;
            }
            console.log('Client added to database.');
        });
        res.send(true);
    }
    else
    {
        // Return all the clients table from the data
        const query = 'SELECT * FROM clients';
        connection.query(query, (error, results, fields) => {
            if (error) {
                console.error(error);
                throw error;
            }
            console.log('Client loaded successfully.');
            res.send(results);
        });
    }
});

module.exports = router;