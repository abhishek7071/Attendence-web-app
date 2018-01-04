var express    = require("express");
var validation = require("validator");
var bodyParser = require("body-parser");
var mongodb = require('mongodb');
var path = require('path');
var dbConn = mongodb.MongoClient.connect('mongodb://localhost:27017');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',function(req,res){
    res.sendFile(__dirname + '/form.html');
});
app.get('/conta.html',function(req,res){
   res.sendFile(__dirname + '/conta.html');
});
app.get('/about.html',function(req,res){
    res.sendFile(__dirname + '/about.html');
});
app.get('/help.html.html',function(req,res){
    res.sendFile(__dirname + '/help.html');
});
app.post('/post-feedback', function (req, res) {
    dbConn.then(function(db) {
        delete req.body._id; // for safety reasons
        db.collection('feedbacks').insertOne(req.body);
    });    
    res.send('Data received:\n' + JSON.stringify(req.body));
   
});
    app.get('/view-feedbacks',  function(req, res) {
    dbConn.then(function(db) {
        db.collection('feedbacks').find({}).toArray().then(function(feedbacks) {
            res.status(200).json(feedbacks);
        });
    });
});
app.listen(4000,function(){
    console.log("Listening at PORT 4000");
});
