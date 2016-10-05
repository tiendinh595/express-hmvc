/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */

module.exports = function(db, Promise) {
    return {
        login: function (username, password) {
            return new Promise(function (resolve, reject) {
                db.query("select name, username from tbl_users where username = ? and password = ?",
                    [username, password], function (err, row) {
                        if (!err && row[0]) {
                            resolve(row[0]);
                        }
                        else
                            reject(err);
                    });
            });
        }
    };
};