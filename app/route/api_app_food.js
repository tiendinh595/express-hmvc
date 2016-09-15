/**
 * Created by Vu Tien Dinh on 9/15/2016.
 */
var express = require('express')
var router= express.Router()
var controller = require('../module/api/controller/indexController')

router.get('/list', function (req, res, next) {
    controller.index(req, res, next)
})

module.exports = router;
