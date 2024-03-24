<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>

<body>
    <h1>Communication LTD Project</h1>

    <p>Communication LTD is a project aimed at managing communication-related tasks. It incorporates various technologies such as Node.js, Express.js, MySQL, Nodemailer, Crypto, and pbkdf2. The project utilizes these technologies to implement functionalities like user authentication, email validation, client registration, and client management.</p>

    <h2>Technologies Used</h2>
    <ul>
        <li><strong>Node.js:</strong> A JavaScript runtime environment used for server-side programming.</li>
        <li><strong>Express.js:</strong> A web application framework for Node.js used to build the server-side logic.</li>
        <li><strong>MySQL:</strong> A relational database management system used for data storage.</li>
        <li><strong>Nodemailer:</strong> A module for Node.js applications used to send emails.</li>
        <li><strong>Crypto:</strong> A module for Node.js applications used for cryptographic functions.</li>
        <li><strong>pbkdf2:</strong> A module for Node.js applications used for key derivation functions.</li>
        <li><strong>HTML/CSS:</strong> Used for structuring and styling the web pages.</li>
        <li><strong>JavaScript:</strong> Used for client-side scripting.</li>
    </ul>

    <h2>Algorithms and Techniques</h2>
    <ul>
        <li><strong>Password Hashing:</strong> To securely store user passwords, the project uses the PBKDF2 algorithm for password hashing. It applies a cryptographic hash function iteratively to the input password along with a salt value, making it computationally expensive to generate hash values, hence protecting against brute-force attacks.</li>
        <li><strong>Random Password Generation:</strong> For generating random passwords, the project utilizes a function that combines uppercase letters, lowercase letters, numbers, and special characters. This ensures that the generated passwords are strong and secure.</li>
        <li><strong>Protection Against Cross-Site Scripting (XSS) and SQL Injection:</strong> The project incorporates measures to protect against common web vulnerabilities like Cross-Site Scripting (XSS) and SQL Injection. It uses prepared statements and parameterized queries when interacting with the database to prevent SQL injection attacks. Additionally, it properly sanitizes user inputs to mitigate the risk of XSS attacks.</li>
    </ul>

    <h2>Project Structure</h2>
    <p>The project is organized into two folders:</p>
    <ul>
        <li><strong>With Protection:</strong> Contains code with measures to protect against XSS and SQL injection.</li>
        <li><strong>Without Protection:</strong> Contains code without explicit protection measures.</li>
    </ul>
    <p>Each folder consists of various modules and routes responsible for different functionalities, such as user authentication, email validation, client registration, and client management.</p>

    <h2>Deployment</h2>
    <p>The project can be deployed on a web server using platforms like Heroku, AWS, or DigitalOcean. Ensure that appropriate security configurations are implemented to protect against common web vulnerabilities.</p>
</body>

</html>