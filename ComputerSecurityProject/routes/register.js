var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next)
{
    res.header("Access-Control-Allow-Origin", "*");
    console.log(req.body);
    if (req.body.password.length >= 16) {
        res.send(true);
    } else {
        res.send(false);
    }
});


module.exports = router;
