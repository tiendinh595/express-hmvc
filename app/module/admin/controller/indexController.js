/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (app, req, res, next) {
    return {
        index: function () {
            test = this.load.loadModel(app, 'test')
            console.log(test.getAll())
            res.render('index/index')
        },
    };
};