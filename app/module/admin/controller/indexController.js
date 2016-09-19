/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var fs = require('fs');
var auth = require('../../../middleware/auth')
module.exports = function (app, req, res, next) {
    return {
        rules: {
            index: ['auth.isLogin']
        },

        index:  function (params) {
            console.log("admin page");
            fs.writeFile('test.txt', 'admin page', function (err) {
                if(err)
                    console.log("errrrr");
                else
                    console.log("successss")
            })
            test = this.load.loadModel(app, 'test');
            console.log(test.getAll());
            res.render('index/index');
        },

        show: function () {
            res.render('index/show')
        }
    };
};