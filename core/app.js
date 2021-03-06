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
var urlEncodedParser = bodyParser.urlencoded({extended: true});

var router = express.Router();

app.set('trust proxy', 1);
app.set('view engine', 'ejs');

app.locals.base_url = DEF.base_url;
app.locals.public_url = DEF.public_url;
app.locals.asset_url = DEF.asset_url;



app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}));

app.use(function (req, res, next) {
    if(typeof req.session.user !== 'undefined') {
        app.locals.user = req.session.user;
    }
    next();
});

app.use('/publics/', express.static(DEF.DIR_PUBLIC));

app.use(urlEncodedParser);
app.use(bodyParser.json())
app.use(multer({
    dest: DEF.DIR_PUBLIC+'/upload/temp'
}).any());
var auth = require('../app/middleware/auth');

global.app = app;
global.router = router;

//router
app.use('/:router([a-zA-Z-_0-9/]{0,})', function (req, res, next) {
    loader.loadRouter(req, res, next, req.params.router, app, router)
});
loader.loadAllRouter(app);

module.exports = {
    run: function() {
        app.listen(DEF.PORT, function () {
            console.log("server started in port: "+DEF.PORT);
        });
    }
}