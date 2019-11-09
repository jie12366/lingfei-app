<template>
    <view class="register">

        <view class="content">
            <!-- 头部logo -->
            <view class="header">
                <image :src="logoImage"></image>
            </view>
            <!-- 主体 -->
            <view class="main">
                <wInput v-model="phone" type="text" maxlength="11" placeholder="手机号"></wInput>
                <wInput v-model="pwd" type="password" maxlength="16" placeholder="登录密码" isShowPass></wInput>
                <wInput v-model="verCode" type="number" maxlength="6" placeholder="验证码" isShowCode ref="runCode"
                    @setCode="getVerCode()"></wInput>

            </view>

            <wButton text="注 册" :rotate="isRotate" @click.native="startReg()"></wButton>

            <!-- 底部信息 -->
            <view class="footer">
                <radio :checked="showAgree === true" @click="agree">已阅读</radio>
                <!-- 羽协章程地址 -->
                <navigator url="./rules" open-type="navigate" style="color: #369BCE;cursor: pointer;">《羽协章程》</navigator>
            </view>
        </view>
    </view>
</template>

<script>
    var _this;
    import wInput from '../../components/watch-login/watch-input.vue' //input
    import wButton from '../../components/watch-login/watch-button.vue' //button

    export default {
        data() {
            return {
                //logo图片
                logoImage: 'http://cdn.jie12366.xyz/lingfei-logo.png',
                phone: '', // 电话
                pwd: '', //密码
                verCode: "", //验证码
                showAgree: false, //协议是否选择
                isRotate: false, //是否加载旋转
            }
        },
        components: {
            wInput,
            wButton,
        },
        mounted() {
            _this = this;
        },
        methods: {
            agree() {
                //是否选择协议
                _this.showAgree = !_this.showAgree;
            },
            checkPhone() {
                // 检查手机号是否合法
                if (!/^1[34578]\d{9}$/gi.test(this.phone)) {
                    return false;
                }
                return true;
            },
            // 检查密码是否合法
            checkPwd() {
                if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(this.pwd)) {
                    return false
                }
                return true;
            },
            getVerCode() {
                // 检查手机号是否合法
                if (!this.checkPhone()) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号不合法'
                    });
                    return false;
                }
                //获取验证码
                this.$api.post('/phone', {
                    phone: this.phone
                }, function(res){
                    console.log(res)
                    if (res.code === 200){
                        uni.showToast({
                            icon: 'success',
                            title: '验证码已发送'
                        });
                    }
                })
                this.$refs.runCode.$emit('runCode'); //触发倒计时（一般用于请求成功验证码后调用）
                setTimeout(function() {
                    _this.$refs.runCode.$emit('runCode', 0); // 终止倒计时
                }, 60000)
            },
            startReg() {
                // 检查手机号和密码
                if (!this.checkPhone()) {
                    uni.showToast({
                        icon: 'none',
                        title: '手机号不合法'
                    });
                    return false;
                } else if(!this.checkPwd()){
                    uni.showToast({
                        icon: 'none',
                        title: '密码必须是6-16位且包含大小写字母以及数字'
                    });
                    return false;
                }
                //注册
                if (this.isRotate) {
                    //判断是否加载中，避免重复点击请求
                    return false;
                }
                // 检查是否已阅读羽协章程
                if (this.showAgree == false) {
                    uni.showToast({
                        icon: 'none',
                        title: '请先阅读《羽协章程》'
                    });
                    return false;
                }
                _this.isRotate = true
                this.$api.post('/register', {
                    code: this.verCode,
                    account: this.phone,
                    password: this.pwd
                }, function(res){
                    console.log(res)
                    if (res.code === 200){
                        uni.showToast({
                            icon: 'success',
                            title: '注册成功'
                        });
                        setTimeout(function() {
                            _this.isRotate = false
                            uni.redirectTo({
                                url: './login'
                            })
                        }, 1000)
                    } else if (res.code === 50002){
                        uni.showToast({
                            icon: 'none',
                            title: '验证码已过期'
                        });
                        _this.isRotate = false
                    } else if (res.code === 50003){
                        uni.showToast({
                            icon: 'none',
                            title: '验证码错误'
                        });
                        _this.isRotate = false
                    } else if (res.code === 20003){
                        uni.showToast({
                            icon: 'none',
                            title: '用户已存在'
                        });
                        _this.isRotate = false
                    } else if (res.code === 30001){
                        uni.showToast({
                            icon: 'none',
                            title: '注册失败'
                        });
                        _this.isRotate = false
                    }
                })
            }
        }
    }
</script>

<style>
    @import url("../../components/watch-login/css/icon.css");
    @import url("./css/main.css");
</style>
