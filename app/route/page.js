/**
 * Created by Vu Tien Dinh on 9/15/2016.
 */
var express = require('express')
var router= express.Router()

router.get('/about.html', function (req, res, next) {
    res.end("about.html")
})

module.exports = router;