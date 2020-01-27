var express = require('express');

var todoController = require('./controllers/todoControllers');
var app = express();
app.set('view engine', 'ejs');
app.use(express.static('./public'));
todoController(app);
app.listen(3000);
console.log('server on on port 3000');