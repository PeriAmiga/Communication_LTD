const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'Communication_LTD',
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL server:', err);
        return;
    }
    console.log('Connected to MySQL server!');

    // create Users table
    const createUsersTableQuery = `
    CREATE TABLE IF NOT EXISTS \`Users\` (
      \`id\` INT unsigned NOT NULL AUTO_INCREMENT,
      \`email\` VARCHAR(320) NOT NULL,
      \`username\` VARCHAR(256) NOT NULL,
      \`password\` VARCHAR(255) NOT NULL,
      \`password_array\` TEXT NOT NULL,
      PRIMARY KEY (\`id\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `;
    connection.query(createUsersTableQuery, (error, results) => {
        if (error) {
            console.error('Error creating Users table:', error);
            return;
        }
        console.log('Users table created successfully!');
    });

    // create Clients table
    const createClientsTableQuery = `
    CREATE TABLE IF NOT EXISTS \`Clients\` (
      \`id\` INT unsigned NOT NULL AUTO_INCREMENT,
      \`firstName\` VARCHAR(32) NOT NULL,
      \`lastName\` VARCHAR(256) NOT NULL,
      \`phone\` VARCHAR(16) NOT NULL,
      \`email\` VARCHAR(256) NOT NULL,
      \`city\` VARCHAR(50) NOT NULL,
      \`address\` VARCHAR(95) NOT NULL,
      PRIMARY KEY (\`id\`,\`phone\`,\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
  `;
    connection.query(createClientsTableQuery, (error, results) => {
        if (error) {
            console.error('Error creating Clients table:', error);
            return;
        }
        console.log('Clients table created successfully!');
    });

    connection.end();
});
