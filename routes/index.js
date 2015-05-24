var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'ShiCipher' });
});

router.post('/codeMessage', function(req,res){
	console.log(req.body["message-text"]);
	res.redirect("./");
});

module.exports = router;
