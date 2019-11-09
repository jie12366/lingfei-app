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
            <bjx-form-item label="学号" label-right="right" prop='number'>
                <input v-model="form.number" class="input" name="input" placeholder="学号" type="number" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="QQ" label-right="right" prop='qq'>
                <input v-model="form.qq" class="input" name="input" placeholder="QQ" type="number" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="电话" label-right="right" prop='phone'>
                <input v-model="form.phone" class="input" name="input" placeholder="电话" type="number" />
            </bjx-form-item>
        </view>
        <view>
            <bjx-form-item label="项目" label-right="right" prop='item'>
                <radio-group @change="radioChange" v-model="form.item" style="vertical-align: middle;">
                    <label class="radio">
                        <radio value="男单" />男单
                    </label>
                    <label class="radio" style="margin-left: 20upx;">
                        <radio value="女单" />女单
                    </label>
                </radio-group>
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
                    name: '',
                    stuClass: '',
                    item: '',
                    number: '',
                    phone: '',
                    qq: ''
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
                    item: {
                        required: true,
                        msg: '请选择项目'
                    },
                    number: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    },
                    phone: {
                        required: true,
                        rule: ['type:string', 'length:~,11', 'reg:^1[34578]\\d{9}$']
                    },
                    qq: {
                        required: true,
                        rule: 'type:string|length:~,10'
                    }
                },
                isRight: false,
                aid: ''
            }
        },
        onLoad(options) {
            this.aid = options.aid
        },
        components: {
            bjxForm,
            bjxFormItem
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
                if (this.isRight) {
                    this.$api.post('/competition', {
                        aid: that.aid,
                        name: that.form.name,
                        stuClass: that.form.stuClass,
                        item: that.form.item,
                        number: that.form.number,
                        qq: that.form.qq,
                        phone: that.form.phone
                    }, function(res) {
                        if (res.code === 200) {
                            uni.showModal({
                                title: '提示',
                                content: '报名成功',
                                success: function(res) {
                                    if (res.confirm) {
                                        uni.switchTab({
                                            url: './competition'
                                        })
                                    } else if (res.cancel) {
                                        console.log('用户点击取消');
                                    }
                                }
                            });
                        } else if (res.code === 20003){
                            uni.showToast({
                                title: '你已经报名啦',
                                icon: 'none'
                            })
                        } else {
                            uni.showToast({
                                title: '报名失败',
                                icon: 'none'
                            })
                        }
                    })
                }
            },
            radioChange(e) {
                this.form.item = e.detail.value
            }
        }
    }
</script>

<style>
</style>
