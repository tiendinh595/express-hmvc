/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
module.exports = function (req, res, next) {
    return {
        index: function () {
            console.log(this.load.moduleName)
            // res.render('index/show')
            res.end("admin page")
        },
    };
};