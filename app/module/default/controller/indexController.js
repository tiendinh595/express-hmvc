/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (app, req, res, next) {
    return {
        index: function () {
            // console.log(this.model().getAll());
            // this.model.getAllPost().then(function (data) {
            //     console.log(data)
            // });
            console.log(this.load.moduleName)
            res.render('index/show')
        },

        show: function () {
            res.render('index/show')
        }
    };
};