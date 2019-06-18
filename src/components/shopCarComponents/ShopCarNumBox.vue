<template>
    <div class="mui-numbox" :class="'index'+index" data-numbox-min="1">
        <!-- "-"按钮，点击可减小当前数值 -->
        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" ref="input" @change="numChange" />
        <!-- "+"按钮，点击可增大当前数值 -->
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
</div>
</template>

<script>
/* eslint-disable */
import mui from '../../../static/js/mui.min.js'
export default {
    props: ['maxNum', 'curNum', 'index', 'godId'],
    mounted () {
        //通过自己添加类名类区分不同的numbox
        mui(`.index${this.index}`).numbox().setOption({step: 1});
        mui(`.index${this.index}`).numbox().setValue(this.curNum);
        mui(`.index${this.index}`).numbox().setOption('max', this.maxNum);
    },
    methods: {
        numChange () {
            this.$store.commit('addToCar', {
                godId: this.godId,
                count: parseInt(this.$refs.input.value)
            })
        }
    },
}
</script>

<style scope>
</style>