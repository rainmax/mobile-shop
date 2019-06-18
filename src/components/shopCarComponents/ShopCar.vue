<template>
    <div class="shop-car-container">
        <div class="shop-car-list">
            <div class="mui-card" v-for=" (item, index) in shopCar" :key="item.thumPic">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <mt-switch v-model="item.selected" @change="selectChanged(item.godId, item.selected)"></mt-switch>
                        <img :src="item.thumPic" alt="">
                        <div class="info">
                            <p class="name">{{ item.name }}</p>
                            <span class="price">￥{{ item.price }}</span>
                            <numbox :godId="item.godId" :maxNum="item.quantity" :curNum="item.count" :index="index"></numbox>
                            <a @click.prevent="deleteGood(item.godId)">删除</a>
                        </div>
                    </div>
                </div>
            </div>
       </div>

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="sum">
                        <p>
                            总计(不含运费)<br/>
                            已勾选商品<span>{{ $store.getters.getSelGodCount.selCount }}</span>件，总价: <span>￥{{ $store.getters.getSelGodCount.selSum }}</span>
                        </p>
                        <mt-button type="danger" size="small">结算</mt-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import numbox from '@/components/shopCarComponents/shopCarNumBox'
export default {
    components: {
        numbox,
    },
    data () {
        return {
            shopCar: [],
        }
    },
    created () {
        this.getShopCarInfo();
        console.log(this.$store.getters.getSelGodCount);
    },
    methods: {
        getShopCarInfo () {
            this.shopCar = JSON.parse(localStorage.getItem('shopCar') || '[]');
        },
        //删除某个商品
        deleteGood (godId) {
            //删除本地存储的商品数据
            this.$store.commit('removeGood', godId);

            this.shopCar.some((item, i) => {
                if (item.godId === godId) {
                    this.shopCar.splice(i, 1);
                }
            })
        },

        //商品选择事件
        selectChanged (godId, selected) {
            this.$store.commit('updateSelected', {godId, selected});
        }

    }
}
</script>

<style scope>
.shop-car-container .shop-car-list .mui-card-content-inner {
    display: flex;
    justify-content: space-between;
}

.shop-car-container .shop-car-list .price {
    font-weight: bold;
    color: red;
}

.shop-car-container .shop-car-list .name {
    font-size: 18px;
}

.shop-car-container .shop-car-list img {
    width: 60px;
    height: 60px;
}

.shop-car-container .mui-card-content-inner .sum {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.shop-car-container .mui-card-content-inner .sum p {
    margin: 0;
    padding: 0;
}

</style>
