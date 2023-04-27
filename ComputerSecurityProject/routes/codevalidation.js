var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log(req.query.email);
    if (req.query.email != undefined)
    {
        res.render('codevalidation');
    }
    else
    {
        res.render('error');
    }
});
/* GET home page. */
router.post('/', function(req, res, next) {
    console.log(req.body);
    res.send("OK");
});

module.exports = router;
