/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (app, req, res, next) {
    return {
        rules: {
            '*': ['auth.isLogin']
        },
        getIndex: function (params) {
            data = {
                view: 'index/index',
                title: 'Dashboard'
            };
            res.render('master', data);
        },

        getShow: function () {
            res.render('index/show')
        }
    }
};