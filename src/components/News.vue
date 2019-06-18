<template>
    <div>
        <ul class="mui-table-view">
            <li  v-for="(item, index) in newList" v-bind:key="index" class="mui-table-view-cell mui-media">
                <router-link :to="'/newDetail/' + item.id">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <p class='mui-ellipsis'>
                            {{ item.title }}
                        </p>
                        <p class='time-and-click'>
                            <span>发表时间:{{ item.time | dataFormat }}</span>
                            <span>点击:{{ item.clicked }}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
/* eslint-disable */
export default {
    data: function () {
        return {
            newList : [],
        }
    },
    created: function () {
        this.getNews()
    },
    methods: {
        getNews: function () {
            this.axios.get('http://localhost:8888/api/getnews').then(list => {
            this.newList = list.data.news
            })
        },
        setValue: function (dataName, value) {
            this.store.setData(dataName, value)
        }
    }
}
</script>

<style lang="">
.time-and-click{
    display:flex;
    justify-content: space-between;
}

.mui-ellipsis {
    color: black;
}
</style>
