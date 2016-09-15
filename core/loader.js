/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
'use strict'
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
            if(fs.existsSync(controllerPath))
            {
                return require(controllerPath)(app, req, res, next)
            }
            return null;
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

        loadRouter: function (app, req, res, next, strRoute) {
            var route = strRoute.split('/');
            var moduleName = route[0] || DEF.DEFAULT_MODULE;
            var controllerName = route[1] || DEF.DEFAULT_CONTROLLER;
            var acionName = route[2] || DEF.DEFAULT_ACTION;
            var params = route[3] || {};

            var db = this.loadConfig('database');

            app.set('module', moduleName);
            this.setPath(app, moduleName);

            var controller = this.loadController(app, req, res, next, controllerName)

            if(controller !== null && typeof controller[acionName] !== 'undefined') {
                //add propery, function
                controller.model = this.loadModel(app, controllerName)
                controller.load = this;

                //exec request
                controller[acionName](params);
            }
            else {
                next();
                //this.showError(app, res)
            }
        },
        
        loadAllRouter: function (app) {
            fs.readdir(DEF.DIR_ROUTE, function (err, fillenames) {
                if(err)
                    return null;
                fillenames.forEach(function (filename) {
                    filename = filename.replace('.js', '');
                    var url = filename.replace(/_/g, '/');
                    console.log(url)
                    app.use('/'+url, require(DEF.DIR_ROUTE+filename))
                })
            })
        }
    };
};
