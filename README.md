unit test


git clone git@github.com:<github username>/node-app.git
cd node-app

### mocha
Test framework for node (You can choose other testing framework if you wish like Jasmin, Jest, Tape etc.)

### supertest
Provide a high-level abstraction for testing HTTP


### Writing Tests
We are ready to write our first integration test. Our test is going to navigate to the site root (“/”) and verify that the page responds with the text “hello world”.
Under a new directory /test/ create test.js. Copy and paste the following code:

var request = require(‘supertest’);
var app = require(‘../index.js’);
describe(‘GET /’, function() {
 it(‘respond with hello world’, function(done) {
 //navigate to root and check the the response is "hello world"
 request(app).get(‘/’).expect(‘hello world’, done);
 });
});

We are going to use Mocha to run our test. 
We installed Mocha as part of our devDependencies in package.json file. 
To run the test we need to pass Mocha our /test/test.js file as an argument.

./node_modules/.bin/mocha ./test/test.js
If you run this command from your project root you will see our test run and pass.

figure 4
Looking at figure 1 step #3, we would like Jenkins to execute our integration test after it builds. To achieve that we need to create a shell script in our project that trigger our test.
Make new /script/ folder and a file name test without the file extension. Copy and paste the following code into the test file:

#!/bin/sh
./node_modules/.bin/mocha ./test/test.js

Grant executable permissions:
chmod +x script/test

And test it by executing the shell script from the project root:
./script/test


git add .
git commit -m ‘simple node app with test’
git push origin master






…or create a new repository on the command line
echo "# untitled1" >> README.md

git init
git add README.md
git commit -m "first commit"
git remote add origin https://github.com/basil79/untitled1.git
git push -u origin master


…or push an existing repository from the command line
git remote add origin https://github.com/basil79/untitled1.git
git push -u origin master


-_Notes_-
__Notes__
**Notes**
# test
## test
### test

You can learn more in the [link text](http://url)
