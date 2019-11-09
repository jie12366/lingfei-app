import base_url from './base_url.js'

let token = ''; // token信息

uni.getStorage({
    key: 'token',
    success: function(res) {
        token = res.data;
    }
});

function request(url, data, cb, method) {
    uni.request({
        url: base_url + url,
        data: data,
        method: method,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': token
        },
        success: function(res) {
            if (res.statusCode === 401){
                uni.showToast({
                    title:'未登录',
                    icon:'none'
                })
                uni.redirectTo({
                    url: '/pages/login/login'
                })
            }else if (res.statusCode === 403){
                uni.showToast({
                    title:'登录过期',
                    icon:'none'
                })
                uni.redirectTo({
                    url: '/pages/login/login'
                })
            }
            return typeof cb == "function" && cb(res.data)
        },
        fail: function() {
            return typeof cb == "function" && cb(false)
        }
    })
}

function post(url, data, cb) {
    request(url, data, cb, 'post')
}

function put(url, data, cb) {
    request(url, data, cb, 'put')
}

function get(url, data, cb) {
    request(url, data, cb, 'get')
}

export default {
    post,
    get,
    put
}
