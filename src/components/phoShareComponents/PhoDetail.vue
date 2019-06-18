<template>
    <div class="pic-detail-wrap">
        <div class="header">
            <h1>我是标题</h1>
            <div class="info">
                <span class="time">发表时间: 2012年12月12日 12:12:12</span>
                <span>点击: 12次</span>
            </div>
        </div>
        <div class="pho-preview">
            <vue-preview :slides="phoList" @close="handleClose"></vue-preview>
        </div>
        <cmt-box :cmtGetUrl="'/getphocom?phoId=' + phoId"></cmt-box>
    </div>
</template>

<script>
/* eslint-disable */
import Comment from '@/components/CommonComponents/Comment'
export default {
    data () {
        return {
            phoId: this.$route.params.phoId,  //图片集的id
            pho: {}, //请求返回的图片JSON数据
            phoList: [] //图片集中图片的链接列表
        }
    },
    components: {
        'cmt-box': Comment
    },
    mounted () {
        this.getPhoDetail();
    },
    methods: {
        //获取图片集
        getPhoDetail () {
            this.axios.get(`/getphodetail?phoId=${this.phoId}`)
            .then((res) => {
                if (res.data.status === 1) {
                    this.pho = res.data.pho
                    this.formatPho();
                }
            })
        },
        //对请求回来的图片数据做进一步的处理，使他符合vue-preview的使用格式
        formatPho () {
            this.pho.phos.forEach((item, index) => {
                var tempObj = {
                    src: item,
                    msrc: item,
                    w: 400,
                    h: 600
                };
                this.phoList.push(tempObj);
            })
        },
        handleClose () {
        console.log('close event')
      }
    },
}
</script>

<style scope>
.pic-detail-wrap .pho-preview .my-gallery {
    display: flex;
    flex-wrap: wrap;
}

.pic-detail-wrap .pho-preview .my-gallery figure {
    width: 30%;
    margin: 5px;
}

.pic-detail-wrap .pho-preview .my-gallery figure img {
    width: 100%;
}
</style>

