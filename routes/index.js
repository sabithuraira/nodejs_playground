var express = require('express');
var router = express.Router();

var menus = require('..//models/menu.json');
var contents= require('..//models/content.json');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index/index', { menus: menus });
});

router.get('/json', function(req, res, next) {
  const content = contents.find(c=>{
    return c.id == "json"
  })
  res.render('index/page', { content: content });
});

router.get('/json_detail', function(req, res, next) {
  const content = contents.find(c=>{
    return c.id == "json_detail"
  })
  res.render('index/page', { content: content });
});

module.exports = router;
