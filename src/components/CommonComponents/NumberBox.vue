<template>
    <div class="mui-numbox" data-numbox-min="1">
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
    props: ['maxNum', 'curNum'],
    mounted () {
        mui('.mui-numbox').numbox().setOption({step: 1});
        mui('.mui-numbox').numbox().setValue(this.curNum);
    },
    methods: {
        numChange () {
            this.$emit('numChange', this.$refs.input.value);
        }
    },
    watch: {
        maxNum (newVal, oldVal) {
            mui('.mui-numbox').numbox().setOption('max', newVal);
        },
    }
}
</script>

<style scope>
</style>