var express = require('express')
var router = express.Router();


router.use('/', require('./user'));

router.get('/', function (req, res) {
	res.send('<h1>\\\\\\VIRTUS</h1><h4>Lorem ipsum dolor.</h4>');
});

module.exports = router
