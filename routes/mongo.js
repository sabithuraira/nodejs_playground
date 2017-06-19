var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Customer = require('../models/mongo_customer');

router.get('/', function(req, res, next) {
  Customer.find(function(err, docs){
      console.log(docs);
      res.render('mongo/index', { datas: docs });
  });
});

router.get('/new', function(req, res, next) {
  res.render('mongo/new', {});
});

router.post('/new', function(req, res, next) {
  var customer_instance = new Customer({ 
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  
  customer_instance.save(function (err) {
    if (err) {
      return res.redirect('/mongo/new')
    } else {
      return res.redirect('/mongo')
    }
  });

  //res.render('mongo/new', {});
});

router.get('/edit/:id', function(req, res, next) {
  Customer.findOne({'_id': req.params.id},function(err, doc){
      console.log(doc);
      res.render('mongo/edit', { data: doc });
  });
});

router.put('/edit/:id', function(req, res, next) {
  console.log('enter put edit')
  var customer_instance = new Customer({ 
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  
  Customer.update({_id: req.params.id}, req.body , {upsert: true}, function (err, result) {
    if (err) {
      console.log(err)
      return res.redirect('/mongo/edit/'+data)
    } else {
      return res.redirect('/mongo')
    }
  });
});


router.delete('/delete/:id', function(req, res, next) {
  console.log('enter delete post')
  var customer_instance = new Customer({ 
    name: req.body.name,
    email: req.body.email,
    address: req.body.address
  });
  
  Customer.update({_id: req.params.id}, req.body , function (err, result) {
    if (err) {
      console.log(err)
      return res.redirect('/mongo/edit/'+data)
    } else {
      return res.redirect('/mongo')
    }
  });
});

module.exports = router;
