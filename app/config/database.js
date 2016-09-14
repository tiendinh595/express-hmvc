/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodejs'
});

connection.connect(function (err) {
    if(err)
    {
        console.log("connect fail mysql");
        process.exitCode = 1;
        throw new Error("connect fail mysql")
    }
    else console.log("mysql connected")
});

module.exports = connection;