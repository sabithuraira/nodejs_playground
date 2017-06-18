var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = require('../models/mongo_customer');

router.get('/', function(req, res, next) {
  Customer.find(function(err, docs){
      //console.log(docs);
      res.render('mongo/index', { datas: docs });
  });
});

router.get('/new', function(req, res, next) {
  res.render('mongo/new', {});
});

router.post('/new', function(req, res, next) {
  console.log(req.body);
  
  var customer_instance = new Customer({ 
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  
  customer_instance.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('meow');
    }
  });

  res.render('mongo/new', {});
});

module.exports = router;
