<template>
    <view>
        <uni-list>
            <uni-list-item title="姓名" :note="info.name" :show-arrow="false"></uni-list-item>
            <uni-list-item title="班级" :note="info.stuClass" :show-arrow="false"></uni-list-item>
            <uni-list-item title="性别" :note="info.sex" :show-arrow="false"></uni-list-item>
            <uni-list-item title="学号" :note="info.number" :show-arrow="false"></uni-list-item>
            <uni-list-item title="职位" :note="info.depart" :show-arrow="false"></uni-list-item>
            <uni-list-item title="QQ" :note="info.qq" :show-arrow="false"></uni-list-item>
            <uni-list-item title="邮箱" :note="info.email" :show-arrow="false"></uni-list-item>
        </uni-list>
        <button style="width:150upx;margin-left: 300upx;margin-top: 50upx;background-color:#56ABC5;color: #fff;" size="mini" @click="edit" v-if="!disabled">
            编辑</button>
    </view>
</template>

<script>
    import uniList from "@/components/uni-list/uni-list.vue"
    import uniListItem from "@/components/uni-list-item/uni-list-item.vue"
    export default {
        components: {
            uniList,
            uniListItem
        },
        data() {
            return {
                uid: '',
                info: null,
                disabled: false
            }
        },
        onLoad(options) {
            const uid = uni.getStorageSync('uid')
            if (options != null){
                this.uid = options.uid
            } else{
                this.uid = uid
            }
            if (uid !== this.uid) {
                this.disabled = true
            }
            var that = this
            this.$api.get(`/userInfo/${this.uid}`, {}, function(res){
                that.info = res.data
            })
        },
        methods:{
            edit () {
                uni.navigateTo({
                    url: './edit'
                })
            }
        }
    }
</script>

<style>
</style>
