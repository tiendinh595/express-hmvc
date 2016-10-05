/**
 * Created by Vu Tien Dinh on 9/15/2016.
 */
module.exports = function(){
    return {
        isLogin: function (req, res, next) {
            if(!req.session.is_login) {
                return res.redirect('/admin/user/login');
            }else{
                next();
            }
        },
        isAdmin: function (req, res, next) {
            if(!req.session.is_admin) {
                res.redirect('/page/login.html');
            }
            next();
        }
    }        
};