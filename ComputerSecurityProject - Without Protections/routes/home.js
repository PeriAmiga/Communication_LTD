var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.cookies.user)
    {
        const username = req.cookies.user.username;
        res.render('home', {username:username});
    }
    else
    {
        res.render('error');
    }
});


router.post('/', function(req, res, next) {
    res.clearCookie('user');
    res.send(true);
});

module.exports = router;