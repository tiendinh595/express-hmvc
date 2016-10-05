/**
 * Created by Vu Tien Dinh on 10/5/2016.
 */
module.exports = function (config) {
    return {
        render: function () {
            if(config.total_page <= 1)
                return '';
            $html = '<ul class="pagination pagination-sm inline center-block">';
            $html += '<li><a href="?page=1">«</a></li>';

            for(var i=config.current_page-3; i<config.current_page+3; i++) {
                if(i<=0 || i>config.total_page)
                    continue;
                if(i==config.current_page)
                    $html += '<li class="active"><a href="?page='+i+'">'+i+'</a></li>';
                else
                    $html += '<li><a href="?page='+i+'">'+i+'</a></li>';
            }

            $html += '<li><a href="?page='+config.total_page+'">»</a></li>';
            $html += '</ul>';
            return $html;
        }
    }
};