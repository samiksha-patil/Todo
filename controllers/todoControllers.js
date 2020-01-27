var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//Connect to the database
mongoose.connect('mongodb://Todo:<password>@cluster0-shard-00-00-kp7km.mongodb.net:27017,cluster0-shard-00-01-kp7km.mongodb.net:27017,cluster0-shard-00-02-kp7km.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true }).catch(err => {
   console.log(err);
});


//Create a schema - this is a like a blueprint
var toDoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', toDoSchema);
var urlencodedParser = bodyParser.urlencoded({ extended: false });


module.exports = function (app) {

    app.get('/todo', function (req, res) {
        //get data from mongodb and pass it to the view
        Todo.find({}, function (err, data) {
            if (err) {
                throw err;
            }
            res.render('todo', { todos: data });
            //in case you want to use as rest API, uncomment the line bellow, an comment the line above
            //res.json(data);
        });
    });

    app.post('/todo', urlencodedParser, function (req, res) {
        //console.log(req.body);
        //get data from the view and add it to the mongodb
        var newTodo = Todo(req.body).save(function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

    app.delete('/todo/:item', function (req, res) {
        //delete the requested item from mongodb
        Todo.find({ item: req.params.item.replace(/\-/g, " ") }).remove(function (err, data) {
            if (err) {
                throw err;
            }
            res.json(data);
        });
    });

};
/*
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Todo:sak16sam16@cluster0-kp7km.mongodb.net/test?retryWrites=true&w=majority');


//schema
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({ item: 'buy flowers' }).save(function (err) {
    if (err) throw err;
    console.log('item saved');
});
var data = [{ item: 'get milk' }, { item: 'buy clothes' }, { item: 'kick some coding ass' }];
var urlencodedParser = bodyParser.urlencoded({extended: false});
module.exports = function (app) {
    app.get('/todo', function (req, res) {
        res.render('todo', {todos:  data});
    });
    app.post('/todo', urlencodedParser, function (req, res) {
        data.push(req.body);
        res.json(data);
    });
    app.delete('/todo/:item', function (req, res) {
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g, '-') !== req.params.item;
        });
        res.json(data);
    });

}
*/