/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var fs = require('fs');
var util = require('util');
module.exports = function (DEF) {
    return {

        moduleName : DEF.DEFAULT_MODULE,
        controllerName : DEF.DEFAULT_CONTROLLER,
        acionName : DEF.DEFAULT_ACTION,
        params : {},

        loadController: function (app, req, res, next, controllerName) {
            controllerName = controllerName+'Controller';
            controllerPath = DEF.DIR_MODULE + app.get('module') + '/controller/' + controllerName + '.js';
            if(fs.existsSync(controllerPath))
            {
                return require(controllerPath)(req, res, next)
            }
            else
            {
                this.showError(app, res);
            }
        },

        loadModel: function (app, db, modelName) {
            modelPath = DEF.DIR_MODULE + app.get('module') + '/model/' + modelName + '.js';
            if(fs.existsSync(modelPath))
                return require(modelPath)(db);
            return null;
        },

        loadConfig: function(config) {
            pathConfig = DEF.DIR_CONFIG + config + '.js';
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
            app.set('views', DEF.DIR_MODULE + app.get('module') + '/views/');
        },

        loadRouter: function (app, req, res, next, strRoute) {
            route = strRoute.split('/');
            moduleName = route[0] || DEF.DEFAULT_MODULE;
            controllerName = route[1] || DEF.DEFAULT_CONTROLLER;
            acionName = route[2] || DEF.DEFAULT_ACTION;
            params = route[3] || {};

            var db = this.loadConfig('database');

            app.set('module', moduleName);
            this.setPath(app, moduleName);

            controller = this.loadController(app, req, res, next, controllerName)
            if(typeof controller[acionName] !== 'undefined') {
                //add propery, function
                controller.model = this.loadModel(app, db, controllerName)
                controller.load = this;

                //exec request
                controller[acionName](params);
            }
            else
                this.showError(app, res)
        }
    };
};
