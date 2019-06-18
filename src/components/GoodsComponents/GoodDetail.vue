<template>
    <div class="god-detail-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="isBallShow"></div>
        </transition>
        <div class="mui-card">
            <div class="mui-card-content">
                <swiper :picList="goodPicList" />
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">{{ godInfo.name }}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <span class="oldPrice">市场价: {{ godInfo.oldPrice }}</span>
                    <span class="newPrice">销售价: ￥{{ godInfo.newPrice }}</span>
                    <div class="buy-num">
                        购买数量：<number-box :curNum="$store.getters.getCountByGodId(godId)" :maxNum="godInfo.quantity" @numChange="setPurchase" ref="inputBox"/>
                    </div>
                    <mt-button type="primary" size="small">立即购买</mt-button>
                    <mt-button type="danger" size="small" @click.native="addInShopCar">加入购物车</mt-button>
                </div>
            </div>
        </div>
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品编号: {{ godInfo.godNum }}</p>
                        <p>库存情况: {{ godInfo.quantity }}</p>
                    </div>
                </div>
            <div class="mui-card-footer">页脚</div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import swiper from '@/components/commonComponents/Swiper'
import NumberBox from '@/components/CommonComponents/NumberBox'
import { setTimeout } from 'timers';
export default {
    components: {
        swiper,
        numberBox: NumberBox
    },
    data () {
        return {
            godId: this.$route.params.id, //商品id
            godInfo: {}, //商品信息对象
            goodPicList: [], //商品图片数组
            isBallShow: false, //小球是否显现
            startPos: {x: 0, y: 0}, //小球运动开始的位置
            endPos: {x: 0, y: 0}, //小球结束运动的位置
            purchase: 1 //购买的商品数，默认为1
        }
    },
    methods: {
        //通过后台接口获取商品信息
        getGoodInfo () {
            this.axios.get(`getgoddetail?godId=${this.godId}`)
            .then((res) => {
                this.godInfo = res.data.god;
                this.goodPicList = this.godInfo.phos;
            })
        },
        setPurchase (num) {
            this.purchase = num;
        },
        //添加进购物车事件
        addInShopCar () {
            this.setBallAnimaInfo();
            //触发小球动画
            this.isBallShow = !this.isBallShow;
            //构造购物车商品数据对象
            var goodsinfo = {
                godId: parseInt(this.godId),
                count: parseInt(this.purchase),
                price: this.godInfo.newPrice,
                quantity: this.godInfo.quantity,
                selected: true,
                thumPic: this.goodPicList[0],
                name: this.godInfo.name
            }
            this.$store.commit('addToCar', goodsinfo);
        },
        //小球动画钩子函数
        beforeEnter (el) {
            console.log('beforeEnter');
            el.style.transform = `translate(${this.startPos.x}px, ${this.startPos.y}px)`;
        },
        enter (el, done) {
            console.log('Enter');
            el.offsetWidth;
            el.style.transform = `translate(${this.endPos.x}px, ${this.endPos.y}px)`;
            el.style.transition = `all 0.5s ease`;
            done();
        },
        afterEnter (el) {
            console.log('afterEnter');
            this.isBallShow = !this.isBallShow;
        },
        //设置小球运动起始位置和终点位置
        setBallAnimaInfo () {
            var inputBox = this.$refs.inputBox.$refs.input;
            var badge = document.getElementById('badge');
            this.startPos.x = inputBox.getBoundingClientRect().left;
            this.startPos.y = inputBox.getBoundingClientRect().top - 40;
            this.startPos.y += window.scrollY;
            this.endPos.x = badge.getBoundingClientRect().left;
            this.endPos.y = badge.getBoundingClientRect().top - 40;
            this.endPos.y += window.scrollY;
        }
    },
    created () {
        this.getGoodInfo();
    },
}
</script>

<style lang="">
.god-detail-container {
    overflow:hidden;
    background-color: #eee;
}

.ball {
    position: absolute;
    z-index: 99;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    background-color: red;
}

.god-detail-container .oldPrice {
    text-decoration: line-through;
}

.god-detail-container .newPrice {
    margin-left: 15px;
    color: red;
}

.god-detail-container .buy-num {
    padding: 10px 0;
    vertical-align: middle;
}

</style>
