<template>
    <view>
        <view>
            <button style="width:200upx;margin-left: 275upx;margin-top: 50upx;background-color:#56ABC5;color: #fff;"
                size="mini" @click="order">约球</button>
            <button style="width:200upx;margin-left: 275upx;margin-top: 20upx;background-color:#56ABC5;color: #fff;"
                size="mini" @click="cancel">取消约球</button>
        </view>
        <view class="box">
            <view style="font-size: 32upx;margin-bottom: 15upx;margin-top: 15upx;">当前约球列表(不分先后)</view>
            <t-table @change="change">
                <t-tr>
                    <t-th>头像</t-th>
                    <t-th>姓名</t-th>
                    <t-th>部门</t-th>
                </t-tr>
                <t-tr v-for="item in orderList" :key="item.id">
                    <t-td><image style="width: 70upx;height:70upx;border-radius: 50%;" :src="item.headPath"></image></t-td>
                    <t-td>{{ item.name }}</t-td>
                    <t-td>{{ item.depart }}</t-td>
                </t-tr>
            </t-table>
        </view>
    </view>
</template>

<script>
    import tTable from '@/components/t-table/t-table.vue';
    import tTh from '@/components/t-table/t-th.vue';
    import tTr from '@/components/t-table/t-tr.vue';
    import tTd from '@/components/t-table/t-td.vue';
    export default {
        data() {
            return {
                orderList: null,
                uid: ''
            }
        },
        components: {
            tTable,
            tTh,
            tTr,
            tTd
        },
        onLoad() {
            const uid = uni.getStorageSync('uid')
            this.uid = uid
            // 判断当前路由是否登录
            var token = this.checkLogin('pages/mine/mine', 2)
        },
        onShow() {
          this.getList()  
        },
        methods: {
            change(e) {
                console.log(e.detail);
            },
            getList() {
                var that = this
                this.$api.get('/order/list', {}, function(res) {
                    console.log(res.data)
                    that.orderList = res.data
                })
            },
            order() {
                var that = this
                this.$api.post('/order/ball', {
                    uid: that.uid
                }, function(res) {
                    console.log(that.uid)
                    if (res.code === 200) {
                        uni.showToast({
                            title: '约球成功',
                            icon: 'none'
                        })
                        that.getList()
                    } else if (res.code === 30004) {
                        uni.showToast({
                            title: '约球失败',
                            icon: 'none'
                        })
                    } else if (res.code === 30005) {
                        uni.showToast({
                            title: '已经约球了',
                            icon: 'none'
                        })
                    } else if (res.code === 30006) {
                        uni.showToast({
                            title: '约球还没开始',
                            icon: 'none'
                        })
                    }
                })
            },
            cancel() {
                var that = this
                this.$api.post('/cancel/ball', {
                    uid: that.uid
                }, function(res) {
                    console.log(res)
                    if (res.code === 200) {
                        uni.showToast({
                            title: '取消成功',
                            icon: 'none'
                        })
                        that.getList()
                    } else if (res.code === 30004) {
                        uni.showToast({
                            title: '取消失败',
                            icon: 'none'
                        })
                    } else if (res.code === 30005) {
                        uni.showToast({
                            title: '还没约球呢',
                            icon: 'none'
                        })
                    } else if (res.code === 30006) {
                        uni.showToast({
                            title: '约球还没开始',
                            icon: 'none'
                        })
                    }
                })
            }
        }
    }
</script>

<style>

</style>
