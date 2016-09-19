/**
 * Created by Vu Tien Dinh on 9/15/2016.
 */
var express = require('express')
var router= express.Router()
var auth = require('../middleware/auth')

router.get('/about.html', function (req, res, next) {
    res.end("about.html")
})

router.get('/login.html', function (req, res, next) {
    res.end("<h1>LOGIN PAGE</h1>")
})

module.exports = router;