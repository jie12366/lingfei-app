<template>
    <bjx-form labelType="inline" :rules="rules" labelWidth="100" :form="form" ref="form">
        <view>
            <bjx-form-item label="姓名" label-right="right" prop='name'>
                <input v-model="form.name" class="input" name="input" placeholder="姓名" type="text" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="班级" label-right="right" prop='stuClass'>
                <input v-model="form.stuClass" class="input" name="input" placeholder="班级" type="text" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="性别" label-right="right" prop='sex'>
                <radio-group @change="radioChange" v-model="form.sex" style="vertical-align: middle;">
                    <label class="radio">
                        <radio value="男" />男
                    </label>
                    <label class="radio" style="margin-left: 20upx;">
                        <radio value="女" />女
                    </label>
                </radio-group>
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="学号" label-right="right" prop='number'>
                <input v-model="form.number" class="input" name="input" placeholder="学号" type="number" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="职位" label-right="right" prop='depart'>
                <input v-model="form.depart" class="input" name="input" placeholder="职位" type="text" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="QQ" label-right="right" prop='qq'>
                <input v-model="form.qq" class="input" name="input" placeholder="QQ" type="number" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="邮箱" label-right="right" prop='email'>
                <input v-model="form.email" class="input" name="input" placeholder="邮箱" type="text" />
            </bjx-form-item>
        </view>
        <button style="width:150upx;margin-left: 300upx;margin-top: 50upx;background-color:#56ABC5;color: #fff;" size="mini"
            @tap="submit">提交</button>
    </bjx-form>
</template>

<script>
    import bjxForm from '@/components/bjx-form/bjx-form.vue'
    import bjxFormItem from '@/components/bjx-form/bjx-form-item.vue'
    export default {
        data() {
            return {
                form: {
                    uid: '',
                    name: '',
                    stuClass: '',
                    sex: '',
                    number: '',
                    depart: '',
                    qq: '',
                    email: ''
                },
                rules: {
                    name: {
                        required: true,
                        rule: 'type:string|length:~,5'
                    },
                    stuClass: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    },
                    sex: {
                        required: true,
                        msg: '请选择性别'
                    },
                    number: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    },
                    depart: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    },
                    qq: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    },
                    email: {
                        required: true,
                        rule: ['type:string','length:6,18','reg:^([A-Za-z0-9_\\-\\.])+\\@([A-Za-z0-9_\\-\\.])+\\.([A-Za-z]{2,4})$']
                    }
                },
                isRight: false
            }
        },
        components: {
            bjxForm,
            bjxFormItem
        },
        onLoad() {
            const uid = uni.getStorageSync('uid')
            this.form.uid = uid
            var that = this
            this.$api.get(`/userInfo/${uid}`, {}, function(res){
                that.form.name = res.data.name
                that.form.stuClass = res.data.stuClass
                that.form.sex = res.data.sex
                that.form.number = res.data.number
                that.form.qq = res.data.qq
                that.form.email = res.data.email
                that.form.depart = res.data.depart
            })
        },
        methods: {
            submit() {
                var that = this
                const data = that.form
                console.log(data)
                this.$refs.form.validate(val => {
                    that.isRight = val
                })
                // 如果js验证通过，则发起请求
                if (this.isRight){
                    this.$api.put('/userInfo', {
                        uid: that.form.uid,
                        name: that.form.name,
                        stuClass: that.form.stuClass,
                        sex: that.form.sex,
                        number: that.form.number,
                        qq: that.form.qq,
                        email: that.form.email,
                        depart: that.form.depart
                    }, function(res){
                        if (res.code === 200){
                            uni.showToast({
                                title: '更新成功',
                                icon: 'none'
                            })
                            uni.redirectTo({
                                url: './information'
                            })
                        }
                    })
                }
            },
            radioChange(e) {
                this.form.sex = e.detail.value
            }
        }
    }
</script>

<style>
</style>
