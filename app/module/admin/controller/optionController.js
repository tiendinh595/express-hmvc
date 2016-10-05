/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
var merge = require('merge');
module.exports = function (app, req, res, next) {
    return {
        rules: {
            '*': ['auth.isLogin']
        },
        getIndex: function (params) {
            this.model.getAll().then(function (result) {
                data = {
                    view: 'option/index',
                    title: 'Thông số xe',
                    options: result

                };
                res.render('master', data);
            });
        },

        anyAdd: function (params) {
            var $this = this;
            this.model.getParent().then(function (result) {
                data = {
                    view: 'option/form',
                    title: 'Thêm thông số xe',
                    parent: result,
                    option: merge(
                            {name:'', type: 'input', parent_id:0,},
                            {name:req.body.name, type: req.body.type, parent_id:req.body.parent_id}
                        )
                };
                if(req.method == 'POST') {
                    $this.model.addNew(data.option).then(function (result) {
                        data.msg = {
                            info: 'Thêm thông số thành công',
                            class: 'callout-success'
                        };
                        res.render('master', data);
                    }).catch(function (result) {
                        data.msg = {
                            info: 'Thêm thông số thất bại',
                            class: 'callout-danger'
                        };
                        res.render('master', data);
                    });
                } else {
                    res.render('master', data);
                }
            });
        },

        anyEdit: function (params) {
            var $this = this;

            $this.Promise.all([this.model.getParent(), $this.model.getDetail(params[0])])
                .then(function (result) {
                    var parent = result[0];
                    var option = result[1];
                    console.log(option)

                    data = {
                        view: 'option/form',
                        title: 'Chỉnh sửa thông số xe',
                        parent: parent,
                        option: option
                    };

                    if(option == null) {
                        data.msg = {
                            info: 'Thông số không tồn tại',
                            class: 'callout-danger'
                        };
                    }

                    if(option != null && req.method == 'POST') {
                        data.option = {name:req.body.name, type: req.body.type, parent_id:req.body.parent_id};
                        $this.model.update(data.option, params[0]).then(function (result) {
                            data.msg = {
                                info: 'Chỉnh sửa thông số thành công',
                                class: 'callout-success'
                            };
                            res.render('master', data);
                        }).catch(function (result) {
                            data.msg = {
                                info: 'Chỉnh sửa thông số thất bại',
                                class: 'callout-danger'
                            };
                            res.render('master', data);
                        });
                    } else {
                        res.render('master', data);
                    }
                })
                .catch(function (err) {
                    console.log(err)
                });
        },

        getShow: function () {
            res.render('index/show')
        }
    }
};