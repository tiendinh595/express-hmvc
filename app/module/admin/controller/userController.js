/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var md5 = require('md5');
module.exports = function (app, req, res, next) {
    return {
        getIndex: function (params) {
            data = {
                view: 'index/index',
                title: 'Dashboard'
            };
            res.render('master', data);
        },

        getLogin: function (params) {
            data = {
                title: 'Login'
            };
            res.render('user/login', data);
        },
        postLogin: function (params) {
            if(!req.body.username || !req.body.password) {
                data = {
                    title: 'Login',
                    msg: 'Chưa nhập username hoặc password'
                }
                res.render('user/login', data);
            } else {
                this.model
                    .login(req.body.username, md5(req.body.password))
                    .then(function (result) {
                        req.session.is_login = true;
                        req.session.user = result;
                        return res.redirect('/admin/');
                    })
                    .catch(function (result) {
                        data = {
                            title: 'Login',
                            msg: 'Sai username hoặc password'
                        }
                        res.render('user/login', data);
                    });
            }
        },
        getLogout: function (params) {
            req.session = null;
            return res.redirect('/admin/user/login');
        },
        getProfile: function (params) {
            data = {
                view: 'user/profile',
                title: 'Dashboard'
            };
            res.render('master', data);
        }
    }
};