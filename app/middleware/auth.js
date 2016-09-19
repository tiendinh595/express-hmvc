/**
 * Created by Vu Tien Dinh on 9/15/2016.
 */
var Promise = require('promise');
module.exports = {
    isLogin: function (req, res, next) {
        console.log("aaaaaaaaa")
        if(!req.session.is_login) {
            res.redirect('/page/login.html');
        }
        next();
    },

    isAdmin: function (req, res, next) {
        if(!req.session.is_admin) {
            res.redirect('/page/login.html');
        }
        next();
    }
}