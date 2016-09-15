/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
'use strict';
var DEF = require('./constant');
var loader = require('./loader')(DEF);

var express = require('express');
var bodyParser = require('body-parser');
var multer  = require('multer');
var cookieSession = require('cookie-session')
var path = require('path');

var app = express();
var urlEncodedParser = bodyParser.urlencoded({extended: false})

const router = express.Router()

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.use('/publics/', express.static(DEF.DIR_PUBLIC));

app.use(urlEncodedParser)
app.use(multer({
    dest: DEF.DIR_PUBLIC+'/upload/temp'
}).any());

//router
app.use(router.all('/:router([a-zA-Z-_0-9/]{0,})', function (req, res, next) {
    loader.loadRouter(app, req, res, next, req.params.router)
}));
loader.loadAllRouter(app);
//
// var server = app.listen(3000, function () {
//     console.log("server started in http://127.0.0.1:3000");
// });
module.exports = {
    run: function() {
        app.listen(DEF.PORT, function () {
            console.log("server started in http://127.0.0.1:"+DEF.PORT);
        });
    }
}