<template>
    <div class="new-container">
        <h1 class="title">{{ title }}</h1>
        <span>发表时间: {{ time | dataFormat }}</span>
        <span>点击:{{ clicked }}次</span>
        <div class="new-content">
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
            我是内容我是内容
        </div>
        <comment-box :cmtGetUrl="'getnewscom?newsId=' + id" :cmtSendUrl="'addnewscom?newsId=' + id" />
    </div>
</template>

<script>
/* eslint-disable */
import Comment from '@/components/CommonComponents/Comment'

export default {
    data () {
        return {
            id: this.$route.params.id,
            title: '',
            time: '',
            clicked: 0
        }
    },
    components: {
        'comment-box': Comment
    },
    created () {
        this.getNewDetail();
    },
    methods: {
        //根据id获取新闻详细数据
        getNewDetail () {
            this.axios.get(`http://localhost:8888/api/getnewdetail?newsId=${this.id}`)
            .then((res) => {
                this.title = res.data.news.title;
                this.time = res.data.news.add_time;
                this.clicked = res.data.news.clicked;
            });
        }
    }
}
</script>

<style scope>
.new-container .new-content{
    border-top: 1px solid #ccc;
    padding-top: 10px;
    padding-bottom: 10px;
    text-indent: 2em;
}

.title {
    font-size: 24px;
}
</style>
