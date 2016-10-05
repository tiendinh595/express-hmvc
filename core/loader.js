/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
'use strict';
var fs = require('fs');
var util = require('util');
var db = require('../app/config/database')
var Promise = require('promise');
module.exports = function (DEF) {
    return {
        moduleName : DEF.DEFAULT_MODULE,
        controllerName : DEF.DEFAULT_CONTROLLER,
        acionName : DEF.DEFAULT_ACTION,
        params : {},

        loadController: function (app, req, res, next, controllerName) {
            controllerName = controllerName+'Controller';
            var controllerPath = DEF.DIR_MODULE + app.get('module') + '/controller/' + controllerName + '.js';
            if(fs.existsSync(controllerPath) && typeof contr)
            {
                try {
                    var obj = require(controllerPath)(app, req, res, next);
                    return obj;
                }catch (e) {
                    return null;
                }
            } else {
                return null;
            }
        },

        loadModel: function (app, modelName) {
            var modelPath = DEF.DIR_MODULE + app.get('module') + '/model/' + modelName + '.js';
            if(fs.existsSync(modelPath))
                return require(modelPath)(db, Promise);
            return null;
        },

        loadConfig: function(config) {
            var pathConfig = DEF.DIR_CONFIG + config + '.js';
            if(fs.existsSync(pathConfig))
                return require(DEF.DIR_CONFIG + config);
            return null;
        },

        showError: function (app, res, code) {
            this.setPath(app, DEF.DEFAULT_MODULE);
            switch (code){
                case 404:
                default:
                    res.render('error/404');
                    break;
            }
        },

        setPath: function (app, module) {
            app.set('views', DEF.DIR_MODULE + module + '/views/');
        },

        checkMiddleware: function (controller, acionName, app, req, res, next) {
            var rules = controller.rules || {};
            if (typeof rules[acionName] !== 'undefined' || typeof rules['*'] !== 'undefined') {
                var list_rules = rules[acionName] || rules['*'];
                for (var middleware in list_rules) {
                    var middleware_arr = list_rules[middleware].split('.');
                    var middleware_obj = require('../app/middleware/' + middleware_arr[0])();
                    middleware_obj[middleware_arr[1]](req, res, next)
                }
            } else {
                next();
            }
        },

        genAction: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        loadRouter: function (req, res, next, strRoute, app, router) {
            var route = strRoute.split('/');
            var moduleName = route[0] || DEF.DEFAULT_MODULE;
            var controllerName = route[1] || DEF.DEFAULT_CONTROLLER;
            var acionNameOrigin = route[2] || DEF.DEFAULT_ACTION;
            acionNameOrigin = this.genAction(acionNameOrigin);
            var acionName =  req.method.toLocaleLowerCase() + acionNameOrigin;
            var params = [];
            if(typeof  route[3] != 'undefined')
                params = route.splice(3);

            var db = this.loadConfig('database');
            app.set('module', moduleName);
            this.setPath(app, moduleName);

            var controller = this.loadController(app, req, res, next, controllerName);
            var auth = require('../app/middleware/auth');

            if(controller !== null) {
                if(typeof controller[acionName] !== 'undefined')
                    acionName = acionName;
                else if(typeof controller['any'+acionNameOrigin] !== 'undefined')
                    acionName = 'any'+acionNameOrigin;
                else {
                    next();
                    return;
                }
                controller.model = this.loadModel(app, controllerName);
                controller.load = this;
                controller.Promise = Promise;
                this.checkMiddleware(controller, acionName, app, req, res, function(){
                    controller[acionName](params);
                });
            }
            else {
                next();
            }
        },
        
        loadAllRouter: function (app) {
            fs.readdir(DEF.DIR_ROUTE, function (err, fillenames) {
                if(err)
                    return null;
                fillenames.forEach(function (filename) {
                    filename = filename.replace('.js', '');
                    var url = filename.replace(/_/g, '/');
                    app.use('/'+url, require(DEF.DIR_ROUTE+filename))
                })
            })
        }
    };
};
