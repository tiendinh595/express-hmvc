/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */

module.exports = function(db, Promise) {
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