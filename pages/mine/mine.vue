<template>
	<view>
		<view class="header">
			<view class="bg">
				<view class="box">
					<view class="box-hd">
						<view class="avator" @click="changeImage">
							<img :src="headPath">
						</view>
						<view class="phone-number">{{name}}</view>
					</view>
					<view class="box-bd">
						<view class="item" @click="toOrderItem">
							<view class="icon"><img src="../../static/ball_2.png"></view>
							<view class="text">我的约球</view>
						</view>
						<view class="item">
							<view class="icon"><img src="../../static/competition_3.png"></view>
							<view class="text">我的比赛</view>
						</view>
						<view class="item" @click="toDepart">
							<view class="icon"><img src="../../static/depart.png"></view>
							<view class="text">我的部门</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="list-content">
			<view class="list">
				<view class="li noborder" @click="toInformation">
					<view class="icon"><image src="../../static/user/card.png"></image></view>
					<view class="text">个人信息</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li " @click="changeSkin">
					<view class="icon"><image src="../../static/user/skin.png"></image></view>
					<view class="text">主题切换</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="icon"><image src="../../static/user/about.png"></image></view>
					<view class="text" @click="toAbout">关于作者</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
				<view class="li " >
					<view class="icon"><image src="../../static/user/opinion.png"></image></view>
					<view class="text" @click="toOpinion">意见反馈</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
			<view class="list">
				<view class="li noborder" >
					<view class="icon"><image src="../../static/user/set.png"></image></view>
					<view class="text" @click="toSetting">系统设置</view>
					<image class="to" src="../../static/user/to.png"></image>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
    import base_url from '../../service/base_url.js'
	export default {
		data() {
			return {
                headPath: '',
                uid: '',
                name: ''
			};
		},
        onLoad() {
            const uid = uni.getStorageSync('uid')
            this.uid = uid
            var that = this
            this.$api.get(`/userInfo/${uid}`, {}, function(res){
                that.headPath = res.data.headPath
                if (res.data.name != null){
                    that.name = res.data.name
                }
            })
        },
		onShow() {
            var that = this
            // 判断当前路由是否登录
            var token = this.checkLogin('/pages/mine/mine', 2)
            // 刷新个人信息
            this.$api.get(`/userInfo/${this.uid}`, {}, function(res){
                that.headPath = res.data.headPath
                if (res.data.name != null){
                    that.name = res.data.name
                }
            })
		},
		methods: {
            changeImage () {
              var that = this
              var token = uni.getStorageSync('token')
              uni.chooseImage({
                  count:1,
                  sizeType: ['original', 'compressed'],
                  sourceType: ['album'],
                  success:function(res){
                      that.headPath = res.tempFilePaths[0]
                      uni.uploadFile({
                          url: base_url + '/headPath',
                          filePath: res.tempFilePaths[0],
                          name: 'image',
                          formData: {
                              uid: that.uid
                          },
                          header: {
                              Authorization: token
                          },
                          success(res) {
                              console.log(res)
                          }
                      })
                  }
              })  
            },
            toOrderItem() {
                uni.navigateTo({
                		url:'./order-item'
                });
            },
            toDepart() {
                uni.navigateTo({
                		url:'./depart'
                });
            },
            toInformation () {
                uni.navigateTo({
                		url: './information/information'
                });
            },
			changeSkin(){
				uni.navigateTo({
						url: '../skin-change/skin-change'
				});
			},
            toAbout () {
                window.location.href = "https://github.com/jie12366"
            },
            toOpinion () {
                uni.showToast({
                    title:'有意见直接去群里反馈啦',
                    icon:'none'
                })
            },
            toSetting () {
                uni.showToast({
                    title:'这是个占位按钮哈哈哈',
                    icon:'none'
                })
            }
		}
	}
</script>

<style lang="scss">
page{
	background-color:#f1f1f1;
	font-size: 30upx;
}
.header{
	background: #fff;
	height: 290upx;
	padding-bottom: 110upx;
	.bg{
		width: 100%;
		height:200upx;
		padding-top:100upx;
		background-color:#56ABC5;
	}
}
.box{
	width: 650upx;
	height: 280upx;
	border-radius: 20upx;
	margin: 0 auto;
	background: #fff;
	box-shadow: 0 5upx 20upx 0upx rgba(0, 0, 150, .2); 
	.box-hd{
		display: flex;
		flex-wrap: wrap;
		flex-direction: row;
		justify-content: center;
		.avator{
			width: 160upx;
			height: 160upx;
			background: #fff;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-top: -80upx;
			overflow: hidden;
			img{
				width: 100%;
				height: 100%;
			}
		}
		.phone-number{
			width: 100%;
			text-align: center;
		}
	}
	.box-bd{
		display: flex;
		flex-wrap: nowrap;
		flex-direction: row;
		justify-content: center;
		.item{
			flex: 1 1 auto;
			display: flex;
			flex-wrap: wrap;
			flex-direction: row;
			justify-content: center;
			border-right: 1px solid #f1f1f1;
			margin: 15upx 0;
			&:last-child{
				border: none;
			}
			.icon{
				width: 40upx;
				height: 40upx;
				img{
					width: 100%;
					height: 100%;
				}
			}
			.text{
				width: 100%;
				text-align: center;
				margin-top: 10upx;
			}
		}
	}
}
.list-content{
	background: #fff;
}
.list{
	width:100%;
	border-bottom:15upx solid  #f1f1f1;
	background: #fff;
	&:last-child{
		border: none;
	}
	.li{
		width:92%;
		height:100upx;
		padding:0 4%;
		border-bottom:1px solid rgb(243,243,243);
		display:flex;
		align-items:center;
	&.noborder{
		border-bottom:0
		}
		.icon{
			flex-shrink:0;
			width:40upx;
			height:40upx;
			image{
				width:40upx;
				height:40upx;
			}
		}
		.text{
			padding-left:20upx;
			width:100%;
			color:#666;
		}
		.to{
			flex-shrink:0;
			width:40upx;
			height:40upx;
		}
	}
}
</style>
