var createError = require('http-errors');
var express = require('express');

//var http = require('http');
var fs = require('fs');
var mysql = require('mysql');


// Modiz
var Modiz = require('./modiz');


var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var logger = require('morgan');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs'); // handlebars

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(bodyParser.json()); // bodyParser JSON

app.use(express.static(path.join(__dirname, 'public'))); // static files __dirname

console.log('dir name', __dirname);
console.log('path to public', path.join(__dirname, 'public'));
console.log('process', process.env.PORT);


var modiz = new Modiz({
  jdbc : {
    host : "localhost",
    user : "root",
    password : "glb21aas",
    database : "modiz",
    multipleStatements : true
  }
});

console.log(modiz.toString());






var n = {name: "Basil", age: 39};
console.log(n);

// sort keys
function d(n) {
  var keys = Object.keys(n);
  var l = keys.length;
  if(l <= 1) return;
  keys.sort();
  for(var i = 0; i < l; i++) {
    var key = keys[i];
    var v =  n[key];

    console.log(key);
    console.log(v);

    delete n[key];
    n[key] = v;

  }
}

d(n);
console.log(n);


for(var key in n) {
  console.log('key', key);
  console.log('value', n[key]);
}


console.log("-----------------------");

const add = (a, c) => a + c;
console.log(add(1, 2));

const arr = [5, 7, 1, 8, 4];
const sum = arr.reduce(function(previousValue, currentValue, currentIndex, sourceArray) {
  console.log(currentIndex);
  return previousValue + currentValue;
}, 10);

console.log(sum);

const sum2 = arr.reduce((previousValue, currentValue, currentIndex, sorceArray) => {
  return previousValue + currentValue;
}, 10);

console.log(sum2);



const arr2 = ['Javascript', 'Python', 'PHP', 'Java', 'C'];
function mapForEach(arr, fn) {
  const newArr = [];
  for(let i = 0; i < arr.length; i++) {
    newArr.push(
        fn(arr[i])
    );
  }
  return newArr;
}

const arr4 = mapForEach(arr2, function(item) {
  return item.length;
});

console.log(arr4);

console.log(arr2.reverse());


const str = 'Hello World';
const reverseStr = str.split('').reverse().join('');
console.log(reverseStr);


const compareWithOposite = (str, opposite) => {
  let a = str.replace(/\W/g, '');
  let b = opposite.replace(/\W/g,'');
  if(a.length == b.length) {
   let reversed = b.split('').reverse().join('');
   return a.toLowerCase() == reversed.toLowerCase()
  }
  return false;
}

console.log(compareWithOposite('Hello World!', '!d-lroW olleH'));


const ages = [26,27,26,26,28,28,29,29,40,30];
const uniqueAges = ages.filter(function(value, index, array) {
  //console.log(array);
  //console.log(value);
  //console.log(index);
  return array.indexOf(value) == index;
});

console.log(uniqueAges);

const mySet = new Set(ages);
console.log(mySet);
console.log([...mySet]);

const unique2 = [...new Set(ages)];
console.log(unique2);


var arrLeft = [1, 2, 3];
var arrRight = [...arrLeft, 4, 5, 6];


// ...spread
// var arr3 = [...arr1, ...arr2];
console.log(arrRight);

console.log("-----------------------");

var arr5 = [0,1,2,3,4,5,6,7,8,9];
for(var i = arr5.length; i--;) {
  console.log(arr5[i]);
}

console.log("-----------------------");

var h = arr5.length; // or 10
while(h--) {
  console.log(h);
}

console.log("-----------------------");

var set1 = new Set([1,2,3]);
var set2 = new Set([1,3,2]);

console.log(set1.size);
console.log(set1.has(1));

/*
var isSetsEqual = function(a, b) {
  var isEqual = false;
  if(a.size == b.size) {
    var out = [...a].every(function(value) {
      return b.has(value);
    });
    console.log('out', out);
  }
  return isEqual;
}
*/


function isSetsEqual(a, b) {
  if(a.size !== b.size) return false;
  for(var c of a) {
    if(!b.has(c)) return false;
  }
  return true;
}

console.log('is sets equal', isSetsEqual(set1, set2));

console.log("-----------------------");




// work
modiz.pages().get(null, 1, 'index', function(err, result) {

  if(err != null) {
    console.log("ERR > ", err);
    return;
  }

  console.log('Result for get() is:', result[0].length);

  modiz.pages().getMany(null, 1, null, null, null, null, null, function (err, result) {

    if(err != null) {
      console.log(err);
      return;
    }

    console.log('Result for getMany() is:', result[0].length);

  });

});




console.log("-----------async / await------------");



// async / await
//async modiz.pages().get(null, 1, 'index')


async function f() {
  return 1;
}

console.log(f());

f().then(function(resolve) {
  console.log("resolve", resolve);
}, function(reject) {
  console.log("reject", reject);
});

f().then(function(resolve) {
  console.log('resolve', resolve);
});

f().then((resolve) => {
  console.log('resolve 1', resolve);
});

f().then(resolve => {
  console.log('resolve 2', resolve);
});

async function f1() {
  return Promise.resolve(1);
}

console.log(f1());

f1().then(resolve => {
  console.log('f1 resolve', resolve);
  return 2 + resolve;
}).then(resolve2 => {
  console.log('f1 resolve2', resolve2);
});


async function f2() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(1);
    }, 1000);
  });

  let result = await promise; // wait till the promise resolves

  console.log('result 1', result);

}

f2();


async function f3() {

  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 1000);
  });

  let result = await promise; // wait till the promise resolves

  //console.log(promise);
  console.log('result 2', result);

  return result;

}

//f3();

f3().then(resolve => {
  console.log('result 4', resolve);
});







async function f5() {
  await Promise.reject(new Error('Woops 1'));
}

async function f6() {
  throw new Error('Woops 2')
}

/*
f5().then((resolve, reject) => {
  console.log('reject', reject);
}).catch(function(err) {
  console.log(err);
});
*/


// async makes it always return a Promise
// allows to use await in it
async function g1() {
  return 1;
}
async function g2() {
  return 2;
}
var promise1 = Promise.resolve(3);
var promise2 = 42;
var promise3 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, 'foo');
});

let results = Promise.all([
    g1(),
    g2(),
    promise1,
    promise2,
    promise3
]);

//console.log('results', results);
results.then(function(resolve) {
  console.log(resolve);
});



function foo5(x, y, callback) {
  let result = x + y;
  if(callback != undefined
      && typeof callback == 'function') {
    callback(result);
  } else {
    //return Promise.resolve(result);
    return new Promise((resolve, reject) => {
      if(result < 10) {
        resolve(result);
      } else {
        reject('ERR');
      }
    })
  }
}

// call with callback
foo5(1,2, result => {
  console.log('result of foo5', result);
});


foo5(7, 4).then(resolve => {
  console.log('result of foo5 with promise', resolve);
}, reject => {
  console.log('reject of foo5', reject);
}).catch(reject => {
  console.log('reject in catch of promise', reject);
});


/*
async function showAvatar() {

  // read json
  //let response = await fetch('/user.json');
  //let user = await response.json();

  fs.readFile('./user.json', function(err, data) {
    if (err) throw err;
    let user = JSON.parse(data);
    console.log('user', user);
  });

}

showAvatar();
*/




class Waiter {
  async wait() {
    return await Promise.resolve(10);
    //return 10;
  }
}

new Waiter()
    .wait()
    .then(resolve => {
      console.log('WAITER', resolve);
    });






console.log("-----------------------");



// routes
app.use('/', indexRouter);


app.use('/users', usersRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




/*
var con = mysql.createConnection({
  host : "localhost",
  user : "root",
  password : "glb21aas",
  database : "modiz",
  multipleStatements : true
});

con.connect((err) => {
  if(err) {
    console.log('Error connection to MySQL');
    return;
  }
  console.log('Connection established');
});
*/


// IN $id bigint, IN $portal_id bigint, IN $uri varchar(255), IN $from int,
// IN $size bigint unsigned, IN $sort_column varchar(50), IN $sort_order varchar(4)

const ID = "$id";
const PORTAL_ID = "$portal_id";
const URI = "$uri";
const FROM = "$from";
const SIZE = "$size";
const SORT_COLUMN = "$sort_column";
const SORT_ORDER = "$sort_order";



// Parent class
class Page {
  constructor(name) {
    this.name = name;
  }
  toString() {
    return this.name;
  }
}

class Page1 extends Page {
  constructor(name, id) {
    super(name);
    this.id = id;
  }
  toString() {
    return this.name + "-" + this.id;
  }
}

let p = new Page('index');
console.log(p.toString());

let p1 = new Page1('index', 1);
console.log(p1.toString());




/*
con.query('CALL get_pages(null, null, null, null, null, null, null)', (err, rows) => {
  if(err) throw err;

  console.log('Data received from MySQL\n');


  console.log(rows[0].length);
  rows[0].forEach((row) => {
    //console.log(row.uri);
  });

});
*/


/*
con.query('select * from pages', (err, rows) => {
  if(err) throw err;

  console.log('Data received from MySQL:\n');
  //console.log(rows);

  rows.forEach((row) => {
    console.log(row.name);
    //console.log(`${row.name}`);
  });

});
*/


/*
// QUIT
con.end((err) => {
  // The connection is terminated gracefully
  // Ensure all previously enqueued are still
  // before sending a COM_QUIT packet to the MySQL server
});
*/

/*
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
*/

module.exports = app;
