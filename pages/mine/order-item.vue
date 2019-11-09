<template>
    <view>
        <view v-for="(item,index) in info" :key="index">
            <view class="item">
                <text class="item_1">{{item.date}}</text>
                <text class="item_2">{{item.msg}}</text>
            </view>
        </view>
    </view>
</template>

<script>
    import { parseTime } from '../../utils/index.js'
    export default {
        data() {
            return {
                uid: '',
                info: null
            }
        },
        onLoad() {
            const uid = uni.getStorageSync('uid')
            this.uid = uid
            var that = this
            this.$api.get(`/orderItem/${uid}`, {}, function(res) {
                that.info = res.data
                for (var i = 0; i < that.info.length; i++) {
                    that.info[i].date = parseTime(that.info[i].date, '{y}-{m}-{d} {h}:{i}:{s}')
                }
            })
        },
        methods: {
        }
    }
</script>

<style>
    .item{
        font-size: 30upx;
        color: #666666;
        border-bottom: #CCCCCC 1upx solid;
        padding-top: 10upx;
        padding-bottom: 10upx;
    }
    .item_1{
        margin-left: 20upx;
    }
    .item_2{
        position: absolute;
        right: 20upx;
    }
</style>
