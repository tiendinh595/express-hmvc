/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (app, req, res, next) {
    return {
        rules: {
            getShow: ['auth.isLogin']
        },

        getIndex:  function (params) {
            res.end('index api');
        },

        getShow: function (params) {
            console.log("show")
            res.end('show api');
        }
    };
};