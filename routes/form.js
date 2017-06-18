var express = require('express');
var router = express.Router();

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
    console.log("enter post");
    console.log(req.body);

    res.render('form/index', { content: content, name: name });
});

module.exports = router;
