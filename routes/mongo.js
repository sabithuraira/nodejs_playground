var express = require('express');
var router = express.Router();
//configuration for csrf
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

var mongoose = require('mongoose');
var Customer = require('../models/mongo_customer');
var contents= require('..//models/content.json');

router.get('/', function(req, res, next) {
  const content = contents.find(c=>{return c.id == "mongoindex"})

  Customer.find(function(err, docs){
      console.log(docs);
      res.render('mongo/index', { datas: docs, content: content });
  });
});

router.get('/new', function(req, res, next) {
  const content = contents.find(c=>{return c.id == "mongoadd"})
  res.render('mongo/new', { csrfToken: req.csrfToken(), content: content });
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
      res.render('mongo/edit', { data: doc, csrfToken: req.csrfToken()  });
  });
});

router.post('/edit/:id', function(req, res, next) {
  // console.log('enter put edit')
  // var customer_instance = new Customer({ 
  //   name: req.body.name,
  //   email: req.body.email,
  //   address: req.body.address
  // });
  
  Customer.update({_id: req.params.id}, req.body , {upsert: true}, function (err, result) {
    if (err) {
      console.log(err)
      return res.redirect('/mongo/edit/'+data)
    } else {
      return res.redirect('/mongo')
    }
  });
});


router.get('/delete/:id', function(req, res, next) {
  Customer.findByIdAndRemove(req.params.id, function(err) {
    if (err) throw err;
    return res.redirect('/mongo')
  });
});

module.exports = router;
