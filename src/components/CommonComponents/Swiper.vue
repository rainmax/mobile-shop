<template>
    <mt-swipe :auto="3000">
       <mt-swipe-item v-for="item in picList" :key="item"><img :class="{'width-full': isWidthFull}" :src="item"></mt-swipe-item>
    </mt-swipe>
</template>

<script>
/* eslint-disable */
export default {
    props: ['picList', 'isWidthFull']   
}
</script>

<style scope>
.mint-swipe {
  height: 240px;
}

.mint-swipe-item {
    text-align: center;
}

.mint-swipe-item img{
    height: 100%;
}

.width-full {
    width: 100%;
}

</style>
