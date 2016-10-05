/**
 * Created by Vu Tien Dinh on 9/14/2016.
 */
'use strict'
module.exports = {
    //dir
    ROOT: __dirname.replace('core', ''),
    DIR_APP: __dirname.replace('core', '') + 'app/',
    DIR_MODULE: __dirname.replace('core', '') + 'app/module/',
    DIR_CONFIG: __dirname.replace('core', '') + 'app/config/',
    DIR_PUBLIC: __dirname.replace('core', '') + 'publics/',
    DIR_ROUTE: __dirname.replace('core', '') + 'app/route/',
    DIR_MIDDLEWARE: __dirname.replace('core', '') + 'app/middleware/',

    //module
    DEFAULT_MODULE: 'default',
    DEFAULT_CONTROLLER: 'index',
    DEFAULT_ACTION: 'index',

    //url
    base_url: 'http://192.168.1.101:3000',
    public_url: 'http://192.168.1.101:3000/publics',
    asset_url: 'http://192.168.1.101:3000/publics/assets',

    //aplication
    PORT: 3000,
    ENV: 'developer'
};