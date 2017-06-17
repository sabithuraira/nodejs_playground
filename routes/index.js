var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("masuk /")
  res.render('index', { title: 'Farifam' });
});

module.exports = router;
