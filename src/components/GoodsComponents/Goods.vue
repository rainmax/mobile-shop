<template>
    <div class="goods-root">
        <div class="goods-list">
            <div class="goods-item" @click="goGoodDetail(item.godId)" v-for="item in godsList" :key="item.godId">
                <img :src="item.phos[0]" alt="">
                <h1 class="title">{{ item.intro }}</h1>
                <div class="info">
                    <p class="price">
                        <span class="now">￥{{ item.newPrice }}</span>
                        <span class="old">￥{{ item.oldPrice }}</span>
                    </p>
                    <p class="sell">
                        <span>热卖中</span>
                        <span>剩余{{ item.quantity }}件</span>
                    </p>
                </div>
            </div>
        </div>
        <mt-button @click.native="loadMoreGoods" type="danger" size="large">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
/* eslint-disable */
export default {
    data () {
        return {
            pageIdx: 1,
            godsList: []
        }
    },
    methods: {
        getGoodsInfo () {
            this.axios.get(`/getgod`).then((res) => {
                if (res.data.status === 1) {
                    this.godsList = res.data.gods;
                }
            });
        },
        loadMoreGoods () {
            this.pageIdx++;
            this.axios.get(`/getgod?pageIdx=${this.pageIdx}`)
            .then((res) => {
                if (res.data.status === 1) {
                    this.godsList = this.godsList.concat(res.data.gods);
                } else {
                    Toast({
                        message: '没有更多内容',
                        duration: 1000
                    });
                }
            });
        },
        goGoodDetail (godId) {
            this.$router.push({name: 'goodDetail', params: {id: godId}});
        }
    },
    created () {
        this.getGoodsInfo();
    }
}
</script>

<style scope>
* {
    margin: 0;
    padding: 0;
}

.goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 6px;
}
.goods-list .goods-item {
    display: flex;
    flex-direction:column;
    justify-content: space-between;
    margin: 3px 0;
    padding: 0 3px 3px 3px;
    border: 1px solid #ccc;
    box-shadow: 0, 0, 8px, #ccc;
    width: 49%;
} 
.goods-list .goods-item .title{
    font-size: 13px;
    line-height: 1.2em;
}

.goods-list .goods-item img{
    width: 100%;
}

.goods-list .goods-item .info {
    background-color: #eee;
}

.goods-list .goods-item .info .price .now{
    color: red;
    font-size: 18px;
}

.goods-list .goods-item .info .price .old {
    margin-left: 15px;
    text-decoration: line-through;
}

.goods-list .goods-item .info .sell{
    display: flex;
    justify-content: space-between;
}
</style>
