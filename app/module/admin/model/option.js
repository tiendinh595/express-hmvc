/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */

module.exports = function(db, Promise) {
    return {
        getAll: function () {
            return new Promise(function (resolve, reject) {
                db.query("SELECT c.*, p.name as parent FROM tbl_option as c LEFT JOIN tbl_option as p ON c.parent_id = p.id", function (err, row) {
                        if (!err && row) {
                            resolve(row);
                        }
                        else
                            resolve(null);
                    });
            });
        },

        getParent: function () {
            return new Promise(function (resolve, reject) {
                db.query("SELECT * FROM tbl_option where parent_id = 0", function (err, row) {
                    if (!err && row) {
                        resolve(row);
                    }
                    else
                        resolve(null);
                });
            });
        },

        addNew: function(data) {
            $sql = "insert into tbl_option set ? , created_at = NOW()";
            return new Promise(function (resolve, reject) {
               db.query($sql, data, function (err, row) {
                  if(err)
                      reject(err);
                   else
                       resolve(row[0]);
               });
            });
        },
        update: function(data, id) {
            $sql = "update tbl_option set ? , updated_at = NOW() where id = "+id;
            return new Promise(function (resolve, reject) {
                db.query($sql, data, function (err, row) {
                    if(err)
                        resolve(false);
                    else
                        resolve(true);
                });
            });
        },
        getDetail: function (id) {
            return new Promise(function (resolve, reject) {
                db.query("select * from tbl_option where id = "+id, function (err, row) {
                    if(err && row.length > 0)
                        resolve(null);
                    else
                        resolve(row[0]);
                });
            });
        }
    };
};