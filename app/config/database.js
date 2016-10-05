/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
'use strict';
var mysql      = require('mysql');
var connection = mysql.createPool({
    host     : '192.168.1.101',
    user     : 'carsuser',
    password : '123456',
    database : 'carsdb',
});
connection.getConnection(function (err, connect) {
    if(err)
    {
        console.log("connect fail mysql");
        process.exitCode = 1;
        throw new Error("connect fail mysql")
    }
});
module.exports = connection;