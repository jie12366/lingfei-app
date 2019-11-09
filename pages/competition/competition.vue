<template>
    <view>
        <view class="item" v-for="(item,index) in activityList" :key="index" @click="toItem(item.id)">
            <image class="img" :src="item.picture" mode="scaleToFill"></image>
            <text class="title">{{item.title}}</text>
            <text class="content">{{item.content}}</text>
            <text>{{item.date}}</text>
        </view>
    </view>
</template>

<script>
    export default {
        data() {
            return {
                activityList: []
            }
        },
        onShow() {
            var that = this
            // 刷新个人信息
            this.$api.get(`/activity`, {}, function(res) {
                that.activityList = res.data
                for (var i = 0; i < that.activityList.length; i++) {
                    if (that.activityList[i].content.length > 70){
                        that.activityList[i].content = that.activityList[i].content.substring(0, 70)
                    }
                }
            })
        },
        methods: {
            toItem(id) {
                uni.navigateTo({
                    url:'/pages/competition/detail?id=' + id
                })
            }
        }
    }
</script>

<style>
    .item {
        font-size: 30upx;
        width: 90%;
        margin: auto;
        margin-top: 20upx;
        padding-bottom: 20upx;
        border-bottom: #999999 1upx solid;
    }

    .img {
        width: 300upx;
        height: 200upx;
        display: inline-block;
    }

    .title {
        position: relative;
        top: -170upx;
        left: 30upx;
        text-align: center;
        font-family: blod;
    }

    .content {
        position: relative;
        color: #666666;
        font-size: 28upx;
        top: -110upx;
    }
</style>
