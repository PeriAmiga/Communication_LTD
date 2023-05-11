module.exports = {
    minLength: 10, // Minimum length required for a password
    passwordHistory:3, // Password should be different from the last 3 passwords
    loginAttemptsAllowed:3, // User can try to login 3 times before block
    requireLowercase: true, // Require at least one lowercase letter
    requireUppercase: true, // Require at least one uppercase letter
    requireNumbers: true, // Require at least one number
    mustToHaveChars:[
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*"
    ]
}