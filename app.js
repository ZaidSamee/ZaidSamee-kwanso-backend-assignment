var express = require('express');
const path = require('path');
const glob = require('glob');
const mongoose = require('mongoose');

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let routers = glob.sync('./modules/*/*.routes.js');
routers.forEach(function (router) {
    require(path.resolve(router))(app);
});

var connectWithRetry = function () {
    return mongoose.connect("mongodb://127.0.0.1:27017/kwanso_db", {}, function (err) {
        if (err) {
            setTimeout(connectWithRetry, 5000);
        }
    });
};
connectWithRetry();

app.listen(8080, function () {
    console.log('Example app listening on port 8080!');
});