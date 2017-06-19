var express = require('express');
var router = express.Router();

//configuration for csrf
var csrf = require('csurf');
var csrfProtection = csrf();
router.use(csrfProtection);

var contents= require('..//models/content.json');

router.get('/', function(req, res, next) {  
    const content = contents.find(c=>{
        return c.id == "post"
    })

    res.render('form/index', { content: content });
});

router.post('/', function(req, res, next) {  
    const content = contents.find(c=>{
        return c.id == "post"
    })
    const name = req.body.name;

    res.render('form/index', { content: content, name: name });
});


router.get('/csrf', function(req, res, next) {  
    const content = contents.find(c=>{return c.id == "csrf"})

    res.render('form/csrf', { content: content, csrfToken: req.csrfToken() });
});

router.post('/csrf', function(req, res, next) {  
    const content = contents.find(c=>{return c.id == "csrf"})
    const name = req.body.name;

    res.render('form/csrf', { content: content, name: name, csrfToken: req.csrfToken() });
});


router.get('/put', function(req, res, next) {  
    const content = contents.find(c=>{
        return c.id == "post"
    })

    res.render('form/put', { content: content });
});

router.put('/put', function(req, res) {  
    console.log('enter put');
    const content = contents.find(c=>{
        return c.id == "post"
    })
    const name = req.body.name;

    res.render('form/put', { content: content, name: name });
});

module.exports = router;
