/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var Promise = require('promise');
module.exports = function(db) {
    return {
        getAll: function () {
            return "gell all data"
        },

        getAllPost: function () {
            console.log(db)
            return new Promise(function (resolve, reject) {
                db.query('SELECT * from posts', function(err, rows, fields) {
                    if(err)
                        reject(err)
                    resolve(rows);
                });
            })
        }
    }
}