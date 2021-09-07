const express = require('express');
var bodyParser = require('body-parser');

var app=express();
var routers = require('./router.js');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.set("port", 3000);
app.use(routers);




app.use(express.static('public'));
app.use('/images', express.static('images'));

app.listen(app.get("port"),function () {
    console.log("Server started...");
});