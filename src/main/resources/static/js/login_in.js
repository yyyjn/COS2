var btn_login = $("#btn_login");
var user = $("#user");
var pwd = $("#password")

btn_login.addEventListener('click', function() {
    ajax({
        url: '/login_in', //接口地址
        type: 'post', // 类型， post 或者 get,
        data: {
            admin_id: user.value,
            password: pwd.value
        },
        success: function(ret) {
            console.log(ret);
            var result=JSON.parse(ret);
            if(result.message=="011"){
                alert("获取信息不完整");
            }
            else if(result.message=="012"){
                alert("用户不存在");
            }
            else if(result.message=="013"){
                alert("对不起，您无管理员权限");
            }
            else if(result.message=="014"){
                window.location.href = '#';
            }
            else{
                alert("密码错误");
            }
        },
        error: function() {
            console.error("post error!")
        }
    })
});

function $(str) {
    return document.querySelector(str);
}

function ajax(opts) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200 || xhr.status === 304) {
                var result = xhr.responseText;
                opts.success(result);
            } else {
                opts.error();
            }
        }
    }
    var query = "?";
    for (var key in opts.data) {
        query += key + "=" + opts.data[key] + "&"
    }
    // query = query.slice(0, -1)
    xhr.open(opts.type, opts.url + query, true)
    xhr.send()
}
