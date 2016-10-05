/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var request = require('request');
var cheerio = require('cheerio');
module.exports = function (app, req, res, next) {
    return {
        index: function (params) {
            // console.log(this.model().getAll());
            // this.model.getAllPost().then(function (data) {
            //     console.log(data)
            // });

            request({
                uri: 'http://tiendinh.name.vn'
            }, function (err, response, body) {

                data = {
                    title: "tesst title",
                };
                if(!err)
                {
                    $ = cheerio.load(body);
                    data.data = []
                    data.msg = "ok";
                    $('.blog').each(function (index, element) {
                        data.data.push($(this).find('img').attr('src'))
                        console.log(data.data)
                    })
                }
                else
                {
                    data.msg = "fail";
                    console.log(err)
                }
                res.render('index/show', data)
            })
        },

        show: function () {
            res.render('index/show')
        }
    };
};