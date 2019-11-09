import Vue from 'vue'
import App from './App'
import http from './service/http.js'

Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$api = http

/**
 * @param {Object} redirect 携带返回的路径
 * @param {Object} backtype 打开页面的类型[1 : redirectTo 2 : switchTab]
 */
Vue.prototype.checkLogin = function(redirect, backtype){
    var token = uni.getStorageSync('token');
    if (token === ''){
        uni.redirectTo({
            url: '/pages/login/login?redirect='+redirect + '&backtype='+backtype
        })
        return false;
    }
    return true;
}

const app = new Vue({
    ...App
})
app.$mount()
