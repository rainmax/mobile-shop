<template>
    <div>
        <!-- 图片类型选项卡 -->
        <div class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a @click="selectPhoType(item)" v-for="(item, index) in photoCat" :key="index" :class="['mui-control-item', index === 0 ? 'mui-active' : '']">
                    {{ item }}
                </a>
            </div>
        </div>
        <!-- 使用懒加载显示图片 -->
        <ul>
            <li v-for="item in photoList" :key="item._id">
                <router-link :to="'/Phodetail/' + item.phoId">
                    <img v-lazy="item.phos[0]">
                    <div class="intro">{{ item.intro }}</div>
                </router-link>
            </li>
        </ul>
        <mt-button @click.native="loadMorePhos" type="danger" size="large">加载更多</mt-button>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
/* eslint-disable */
export default {
    data() {
        return {
            type: '全部', //图片类型
            photoCat: [], //图片分类
            photoList: [],
            pageIdx: 1, //页码
        }
    },
    methods: {
        //获取并存储图片分类信息
        getPhotypes () {
            this.axios.get('/getphotypes').then((res)=>{
                if(res.data.status === 1) {
                    this.photoCat = res.data.types;
                    this.photoCat.unshift('全部');
                }
          })
        },
        getPhoList () {
            this.axios.get('/getphos').then((res) => {
                if (res.data.status === 1) {
                    this.photoList = res.data.phos
                }
            })
        },
        //加载更多图片
        loadMorePhos () {
            this.pageIdx++;
            this.axios.get(`/getphos?pageIdx=${this.pageIdx}&type=${this.type}`).then((res) => {
                if (res.data.status === 1) {
                    this.photoList = this.photoList.concat(res.data.phos);
                } else {
                    Toast({
                        message: '没有更多内容',
                        duration: 1000
                    });
                }
            });
        },
        //获取某类型的图片
        selectPhoType (type) {
            this.type = type;
            this.pageIdx = 1;
            this.axios.get(`/getphos?type=${type}`)
            .then((res) => {
                if (res.data.status === 1) {
                    console.log(res.data.phos);
                    this.photoList = res.data.phos
                }
            })
        }
    },
    created() {
       this.getPhotypes() 
       this.getPhoList()
    },
    mounted() {
        this.mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        })
    }
}
</script>

<style scoped>
* {
    touch-action: pan-y;
}

ul{
    list-style: none;
    padding: 0;
    margin: 0;
}

ul li{
    margin: 10px 20px;
}

ul li a {
    display: block;
    position: relative;
}

ul img {
    width: 100%;
    box-shadow: 2px;
    border-radius: 5px;
}

ul li .intro {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 50px;
    font-size: 14px;
    color: #fff;
    background-color:rgba(0, 0, 0, .3);
}
</style>
