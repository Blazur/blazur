var express = require('express');

var app = express();
app.use(express.static('bower_components'));

if (process.env.NODE_ENV === 'development') {
  app.use(express.static('.tmp'));
  app.use(express.static('app'));

} else {
  app.use(express.static('dist'));
}


app.listen(4000);

console.log('on port 4000');
