/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (req, res, next) {
    return {
        // model: null,
        index: function () {
            res.render('index/show')
        },

        show: function () {
            res.render('index/show')
        }
    };
};