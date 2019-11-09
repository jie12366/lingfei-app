<template>
    <view>
        <uni-swiper-dot :info="info" :current="current" field="content">
            <swiper class="swiper-box" @change="change">
                <swiper-item v-for="(item ,index) in info" :key="index">
                    <view :class="item.colorClass" class="swiper-item">
                        <image :src="item.url" mode="aspectFill" />
                    </view>
                </swiper-item>
            </swiper>
        </uni-swiper-dot>
        <h5 style="text-align: center;margin-top: 10upx;margin-bottom: 10upx;">欢迎来到凌飞羽毛球协会</h5>
        <p style="font-size: 30upx;width: 90%;margin: auto;">羽协作为一个成立不足四年的社团，已经承办了近十起院级活动，持续代表学院派出选手参加校运会羽毛球比赛，并取得了一定的成绩，羽协正稳步向着一个中大级社团发展。</p>
    </view>
</template>

<script>
    import UniSwiperDot from "../../components/uni-swiper-dot/uni-swiper-dot.vue";
    export default {
        data() {
            return {
                info: [{
                        colorClass: 'uni-bg-red',
                        url: 'http://cdn.jie12366.xyz/back_3.png',
                    },
                    {
                        colorClass: 'uni-bg-green',
                        url: 'http://cdn.jie12366.xyz/back1.jpg',
                    },
                    {
                        colorClass: 'uni-bg-blue',
                        url: 'http://cdn.jie12366.xyz/back2.jpg',
                    }
                ],
                current: 0
            }
        },
        components: {
            UniSwiperDot
        },
        methods: {
            change(e) {
                this.current = e.detail.current;
            }
        }
    }
</script>

<style>
    .swiper-box {
        height: 400upx;
    }

    .swiper-item {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        background: #eee;
        color: #fff;
    }

    .swiper-item image {
        width: 100%;
        height: 100%;
    }
</style>
