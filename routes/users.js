var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log('*** here users root path');

  //res.send('respond with a resource');




  res.send({
    user_id : 1
  });


});


router.get('/:user_id/', function(req, res, next) {


  console.log(req.params);

  // GET /search?q=tobi+ferret
  console.log(req.query.q);
  // GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse
  console.dir(req.query.order)
  // => 'desc'

  console.dir(req.query.shoe.color)
  // => 'blue'

  console.dir(req.query.shoe.type)
  // => 'converse'

  // GET /shoes?color[]=blue&color[]=black&color[]=red
  console.dir(req.query.color)
  // => ['blue', 'black', 'red']

  console.log('user id is', req.params['user_id']);

  res
      .status(200)
      .send('user id is ' + req.params['user_id']);

  //res.end();

});


router.post('/:user_id/', function(req, res, next) {

  console.log('params', req.params);
  console.log('params', req.params.user_id);
  console.log('the views directory is', req.app.get('views'));

  console.dir(req.originalUrl);
  console.log('baseUrl', req.baseUrl);
  console.dir(req.path);
  console.dir(req.protocol);
  console.dir(req.hostname);
  console.dir(req.ip);

  console.dir(req.protocol === 'https');
  console.log(req.route);
  console.dir(req.fresh);
  console.dir(req.stale);

  console.dir(req.xhr);

  console.log('body', req.body);

  //console.log('body get key', req.body.get('name'));

  let userId = Number(req.params.user_id); //Number(req.params['user_id']);

  console.log('body data >', req.body.name);

  //console.log(JSON.parse(req.body));

  /*

Method	Description
res.download()	Prompt a file to be downloaded.
res.end()	End the response process.
res.json()	Send a JSON response.
res.jsonp()	Send a JSON response with JSONP support.
res.redirect()	Redirect a request.
res.render()	Render a view template.
res.send()	Send a response of various types.
res.sendFile()	Send a file as an octet stream.
res.sendStatus()	Set the response status code and send its string representation as the response body.
   */

  /*
  res.append('Link', ['<http://localhost/>', '<http://localhost:3000/>']);
  res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly');
  res.append('Warning', '199 Miscellaneous warning');

  res.cookie('name', 'tobi', { domain: '.example.com', path: '/admin', secure: true });
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true });
   */





  console.log(req.body.name != undefined);

  if(req.body.name != undefined) {

    res
        .status(200)
        .json({
          user_id : userId,
          name : req.body.name
        });

  } else {

    res
        .status(500)
        .end();

  }


});


module.exports = router;
