var express = require('express');

var router = express.Router();

function indexHandler(req, res, next) {





    // req.ip
    console.log('hello console ip addr is', req.ip);
    // req.params from path /index/:param1
    console.log('params', req.params);


    // req.query
    console.log('query', req.query);
    console.log('query q is ', req.query['q']);

    // req.path
    console.log('path is', req.path);

    // req.hostname
    console.log('hostname is', req.hostname);

    // req.originalUrl
    console.log('origin url is', req.originalUrl);

    // req.protocol
    console.log('protocol is', req.protocol);

    // req.secure
    console.log('is request is secure', req.secure);

    // req.xhr
    console.log('is xhr', req.xhr);


    /*
    // Accept: text/html
    req.accepts('html');
    // => "html"

    // Accept: text/*, application/json
    req.accepts('html');

    // => "html"
    req.accepts('text/html');
    // => "text/html"
     */

    console.log(req.get('Content-Type'));
    // => "text/plain"

    console.log(req.get('content-type'));
    // => "text/plain"

    console.log(req.get('Something'));
    // => undefined




    // With Content-Type: text/html; charset=utf-8
    console.log(req.is('html'));
    console.log(req.is('text/html'));
    console.log(req.is('text/*'));
    // => true


    // Response

    //res.send('hello world');
    //res.status(404).end();

    res.set('Content-Type', 'text/plain');
    console.log('get content-type from response', res.get('Content-Type'));

    res.format ({
        'text/plain': function() {
            res.send('hey - text/plain');
        },

        'text/html': function() {
            res.send('hey - text/html');
        },

        'application/json': function() {
            res.send({ message: 'hey' });
        },

        'default': function() {
            // log the request and respond with 406
            res.status(406).send('Not Acceptable');
        }
    });


}

//router.get('/', indexHandler);
router.get('/', function(req, res) {
    res.send('hello world');
});

/*
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express',
        year: new Date().getFullYear()
    });
});
 */


module.exports = router;
