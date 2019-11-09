<template>
    <view style="width: 95%;margin: auto;">
        <view style="text-align:center;margin-top: 20upx;">{{info.title}}</view>
        <view style="text-align:left;margin-top: 20upx;font-size: 30upx;color: #888888;">时间: {{info.date}}</view>
        <view style="text-align:right;margin-top: -43upx;font-size: 30upx;color: #888888;">地点: {{info.zone}}</view>
        <view style="text-align:left;margin-top: 20upx;font-size: 30upx;color: #444;">{{info.content}}</view>
        <image style="margin-top: 30upx;width: 100%;" :src="info.picture"></image>
        <button type="primary" style="margin-top: 50upx;" @click="toEnter">报名</button>
    </view>
</template>

<script>
    export default{
        onLoad(options) {
            this.id = options.id
        },
        onShow() {
            var that = this
            // 获取活动详情
            this.$api.get(`/activity/${this.id}`, {}, function(res) {
                console.log(res)
                that.info = res.data
            })
        },
        data () {
            return {
                info: '',
                id: null
            }
        },
        methods: {
            toEnter () {
                uni.navigateTo({
                    url: '/pages/competition/apply?aid=' + this.id
                })
            }
        }
    }
</script>

<style>
</style>
