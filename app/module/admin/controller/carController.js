/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var array = require('../../../library/array');
var pagination = require('../../../library/pagination');
module.exports = function (app, req, res, next) {
    return {
        rules: {
            '*': ['auth.isLogin']
        },
        getIndex: function (params) {
            var $this = this;
            var current_page = parseInt(req.query.page) || 1;
            var limit = 15;
            var offset = (current_page - 1)*limit;

            this.Promise.all([$this.model.countAll(), this.model.getAll(offset, limit)])
                .then(function (result) {
                    data = {
                        view: 'car/index',
                        title: 'Danh sách xe',
                        cars: result[1]
                    };
                    config = {
                        current_page: current_page,
                        total_page: Math.round(result[0]/limit)
                    };
                    data.page_link = pagination(config).render();
                    res.render('master', data);
                })
                .catch(function (err) {
                    console.log(err)
                });
        },

        getAdd: function (params) {
            this.model.getOptions().then(function (options) {
                data = {
                    view: 'car/form',
                    title: 'Thêm xe',
                    car: {name: ''},
                    options: array.group(options, 'parent')
                };
                res.render('master', data);
            });
        },
        postAdd: function (params) {
            var $this = this;
            $this.model.addNew(req.body.name, req.body.options)
                .then(function (result) {
                    var  data = {
                        view: 'car/form',
                        title: 'Thêm xe',
                        car: {name: ''}
                    };
                    console.log(result)
                    if (result == true) {
                        data.msg = {
                            info: 'Thêm thành công',
                            class: 'callout-success'
                        }
                    } else {
                        data.msg = {
                            info: 'Thêm thất bại',
                            class: 'callout-danger'
                        }
                    }

                    $this.model.getOptions().then(function (options) {
                        data.options = array.group(options, 'parent');
                        res.render('master', data);
                    });
                });
        },
        
        getEdit: function (params) {
            var $this = this;
            this.Promise.all([$this.model.getOptions(), $this.model.getDetail(params[0]), $this.model.getOptionsByCar(params[0])])
                .then(function (result) {
                    var  data = {
                        view: 'car/form_edit',
                        title: 'Cập nhật thông tin xe',
                        car: result[1],
                        options: array.group(result[0], 'parent'),
                        option: result[2]
                    };

                    res.render('master', data);
                });
        },
        postEdit: function (params) {
            var $this = this;
            this.Promise.all([$this.model.update(params[0], req.body.name, req.body.options), $this.model.getOptions(), $this.model.getDetail(params[0]), $this.model.getOptionsByCar(params[0])])
                .then(function (result) {
                    var  data = {
                        view: 'car/form_edit',
                        title: 'Cập nhật thông tin xe',
                        car: result[2],
                        options: array.group(result[1], 'parent'),
                        option: result[3]
                    };
                    if(result[0] == true) {
                        data.msg = {
                            info: 'Cập nhật thành công',
                            class: 'callout-success'
                        }
                    } else {
                        data.msg = {
                            info: 'Cập nhật thất bại',
                            class: 'callout-danger'
                        }
                    }
                    res.render('master', data);
                });
        }
    }
};