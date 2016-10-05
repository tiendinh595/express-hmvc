/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */

module.exports = function (db, Promise) {
    return {
        getAll: function (offset, limit) {
            return new Promise(function (resolve, reject) {
                db.query("SELECT * FROM tbl_car limit "+offset+', '+limit, function (err, row) {
                    if (!err && row) {
                        resolve(row);
                    }
                    else
                        resolve(null);
                });
            });
        },
        countAll: function () {
            return new Promise(function (resolve, reject) {
                db.query("select count(*) as total from tbl_car", function (err, row) {
                    if(err)
                        resolve(0);
                    else
                        resolve(row[0]['total']);
                });
            })
        },
        getOptions: function () {
            return new Promise(function (resolve, reject) {
                db.query("SELECT c.*, p.name as parent FROM tbl_option as c JOIN tbl_option as p ON c.parent_id = p.id", function (err, row) {
                    if (!err && row) {
                        resolve(row);
                    }
                    else
                        resolve(null);
                });
            });
        },

        addNew: function (name, options) {
            $sql = "insert into tbl_car set ? , created_at = NOW()";
            return new Promise(function (resolve, reject) {
                db.query($sql, {name: name}, function (err, row) {
                    if (err)
                        resolve(err);
                    else {
                        var option_insert = [];
                        for (var option in options) {
                            key = option.split('_');
                            key = key[1];
                            if (options[option].trim() == '')
                                continue;
                            option_insert.push([row.insertId , key, options[option]]);
                        }
                        if(option_insert.length > 0)
                        {
                            var $sql_options = "insert into `tbl_option_value` (`car_id`, `option_id`, `value`) values ?";
                            db.query($sql_options, [option_insert], function (err, result) {
                                if (err)
                                    resolve(err);
                                else
                                    resolve(true);
                            })
                        }
                        resolve(true);
                    }
                });
            });
        },
        update: function (id, name, options) {
            $sql = "update tbl_car set ? , created_at = NOW() where id = "+id;
            return new Promise(function (resolve, reject) {
                db.query($sql, {name: name}, function (err, row) {
                    if (err)
                        resolve(err);
                    else {
                        var option_insert = [];
                        for (var option in options) {
                            key = option.split('_');
                            key = key[1];
                            if (options[option].trim() == '')
                                continue;
                            option_insert.push([id , key, options[option]]);
                        }
                        db.query("delete from tbl_option_value where car_id="+id, function (err, result) {
                            if(!err) {
                                var $sql_options = "insert into `tbl_option_value` (`car_id`, `option_id`, `value`) values ?";
                                db.query($sql_options, [option_insert], function (err, result) {
                                    if (err)
                                        resolve(err);
                                    else
                                        resolve(true);
                                })
                            }
                        });
                    }
                });
            });
        },
        getDetail: function (id) {
            return new Promise(function (resolve, reject) {
                db.query("select * from tbl_car where id = "+id, function (err, row) {
                    if (err && row.length == 0)
                        resolve(null);
                    else
                        resolve(row[0]);
                });
            });
        },
        getOptionsByCar: function(id) {
            return new Promise(function (resolve, reject) {
               db.query("select * from tbl_option_value where car_id="+id, function (err, data) {
                   if(err || data == null)
                       resolve(null);
                   else
                       resolve(data);
               })
            });
        }
    };
};