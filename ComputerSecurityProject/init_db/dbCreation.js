const mysql = require('mysql2');

// create a connection to the MySQL server
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456'
});

// connect to the MySQL server
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server!');
});

// create a new schema
const schemaName = 'Communication_LTD';
connection.query(`CREATE DATABASE ${schemaName}`, (error, results) => {
    if (error) {
        console.error('Error creating schema:', error);
        return;
    }
    console.log(`Schema ${schemaName} created successfully!`);
});

// close the connection when you're done
connection.end();