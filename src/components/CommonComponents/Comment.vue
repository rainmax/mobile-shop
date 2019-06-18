<template>
    <div class="comment-container">
        <h3>评论列表</h3>
        <textarea v-model="comContent" placeholder="请输入要评论的内容"></textarea>
        <mt-button @click.native="submitCom" type="primary" size="large">发表</mt-button>
        <div class="cmt-list">
            <div v-for="(item, index) in comments" :key="index" class="cmt-item">
                <div class="cmt-title">
                    <span>#{{ item.comId }}</span>
                    <span>用户:{{ item.username }}</span>
                    <span>发表时间: {{ item.comDate | dataFormat }}</span>
                </div>
                <div class="cmt-body">
                    {{ item.content }}
                </div>
            </div>
        </div>
        <mt-button @click.native="loadMore" type="danger" size="large">加载更多</mt-button>
    </div>
</template>

<script>
/* eslint-disable */
import {Toast} from 'mint-ui';
export default {
    props: [
        'cmtGetUrl',    //评论获取地址
        'cmtSendUrl'],  //评论提交地址
    data () {
        return {
            pageIdx: 1,    //评论页数索引
            comments: [],   //存放异步获取的评论内容
            comContent: '', //存放用户输入的评论文本
        }
    },
    methods: {
        getComments () {
            this.axios(`${this.cmtGetUrl}&pageIdx=${this.pageIdx}`)
            .then((res) => {
                this.comments = res.data.comments;
            });
        },
        loadMore () {
            this.pageIdx++;
            this.axios(`${this.cmtGetUrl}&pageIdx=${this.pageIdx}`)
            .then((res) => {
                if (res.data.status === -1) {
                    Toast({
                        message: '没有更多内容',
                        duration: 1000
                    });
                } else {
                    this.comments = this.comments.concat(res.data.comments);

                } 
            });

        },
        submitCom () {
            this.axios.post(`${this.cmtSendUrl}`, {
                username: '匿名',
                content: this.comContent
            })
            .then((res) => {
                if (res.data.status === 1) {
                    this.comContent = '';
                    Toast({
                        message: '提交成功',
                        duration: 1000
                    })
                }
            })
            .then(() => {
                this.getComments();
            })
        }
    },
    created() {
        this.getComments();
    },
}
</script>

<style lang="">
.comment-container textarea{
    height: 5em;
    margin-bottom: 0;
}

.cmt-list{
    margin-top: 5px;
}

.cmt-list .cmt-item .cmt-title{
    display:flex;
    justify-content: space-between;
    background-color: #ccc;
    font-size: 16px;
}

.cmt-list .cmt-item .cmt-body {
    margin: 5px 2px;
}
</style>
