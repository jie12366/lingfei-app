<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phone"
					type="text"
					maxlength="11"
					placeholder="手机号"
				></wInput>
				<wInput
					v-model="pwd"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				text="登 录"
				:rotate="isRotate" 
				@click.native="startLogin()"
			></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="iconfont qq" @tap="login_qq"></view>
				</view>
				<view class="login_icon">
					<view class="iconfont github" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="iconfont gitee" @tap="login_github"></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
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
				//logo图片 base64
				logoImage: 'http://cdn.jie12366.xyz/lingfei-logo.png',
				phone:'', //用户/电话
				pwd:'', //密码
				isRotate: false, //是否加载旋转
                redirect: null,
                backtype: null
			};
		},
        onLoad(options) {
            console.log(options.redirect)
            if (options.redirect != null){
                this.redirect = options.redirect
                this.backtype = options.backtype
            }
        },
		components:{
			wInput,
			wButton,
		},
		mounted() {
			_this= this;
			//this.isLogin();
		},
		methods: {
            checkPhone() {
                // 检查手机号是否合法
                if (!/^1[34578]\d{9}$/gi.test(this.phone)) {
                    return false;
                }
                return true;
            },
		    startLogin(){
				//登录
				if(this.isRotate){
					//判断是否加载中，避免重复点击请求
					return false;
				}
				if (!this.checkPhone()) {
				     uni.showToast({
				        icon: 'none',
				        title: '手机号不合法'
				    });
				    return;
				}
                _this.isRotate=true // 开始加载旋转
                var that = this
				this.$api.post('/login', {
                    account: this.phone,
                    password: this.pwd
                }, function(res){
                    console.log(res)
                    if (res === false) {
                        uni.showToast({
                            icon: 'none',
                            title: '网络没有连接哦'
                        })
                    }
                    if (res.code === 200){
                        try{
                            // 缓存token和用户id
                            uni.setStorageSync('token', res.data.token)
                            uni.setStorageSync('uid', res.data.uid)
                            setTimeout(function(){
                            	_this.isRotate=false
                                uni.showToast({
                                    icon: 'none',
                                    title: '登录成功'
                                })
                            },1000)
                        }catch(e){
                            console.log("设置缓存失败");
                        }
                        console.log(that.redirect)
                        // 如果有参数，说明是携路径跳转来的
                        if (that.redirect !== null){
                            // 跳转类型为redirectTo
                            if (that.backtype === 1){
                                uni.redirectTo({
                                    url: that.redirect
                                })
                            } else if (that.backtype === 2){ // 跳转类型为switchTab
                                uni.switchTab({
                                    url: that.redirect
                                })
                            }
                        } else {
                            console.log('我进来了')
                            uni.switchTab({
                                url: '/pages/mine/mine'
                            })
                        }
                    } else if (res.code === 20001){
                        _this.isRotate=false
                        uni.showToast({
                            icon: 'none',
                            title: '账号或密码错误'
                        })
                    } else if (res.code === 20002){
                        _this.isRotate=false
                        uni.showToast({
                            icon: 'none',
                            title: '账号不存在'
                        })
                    }
                })
		    }
			,
			login_qq() {
				//qq登录
				window.location.href = 'http://jie12366.xyz:88/oauth/login/qq'
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
	@import url("../../components/watch-login/css/icon.css");
	@import url("./css/main.css");
</style>
