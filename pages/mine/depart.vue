<template>
    <view>
        <uni-list v-for="(item, index) in members" :key="index">
            <uni-list-item :note="item.name" :show-arrow="true" @click="toDetail(item.uuid)"></uni-list-item>
        </uni-list>
    </view>
</template>

<script>
    import uniList from "@/components/uni-list/uni-list.vue"
    import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
    export default{
        components: {
            uniList,
            uniListItem
        },
        data() {
            return {
                uid: '',
                members: null
            }
        },
        onLoad() {
            const uid = uni.getStorageSync('uid')
            this.uid = uid
            var that = this
            this.$api.get(`/depart/${uid}`, {}, function(res){
                that.members = res.data
            })
        },
        methods:{
            toDetail (uid) {
                uni.navigateTo({
                    url: '/pages/mine/information/information?uid=' + uid
                })
            }
        }
    }
</script>

<style>
</style>
