/**
 * Created by Vu Tien Dinh on 9/19/2016.
 */
var rl = require('readline');
var cheerio = require('cheerio');
var request = require('request');
var read = rl.createInterface({
    input: process.stdin,
    output: process.stdout
});
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
            console.log($(this).find('img').attr('src'))
        })
    }
    else
    {
        data.msg = "fail";
        console.log(err)
    }
})
// read.question("What is your name? ", function (answer) {
//     read.close(); // close the instance of reading interface
//     console.log(answer);
// })