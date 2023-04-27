var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('emailvalidation');
});
router.post('/', function(req, res, next) {
    console.log(req.body.email);
    res.send(true);

});

module.exports = router;
