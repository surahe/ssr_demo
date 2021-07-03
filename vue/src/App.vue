<template>
  <div class="app" id="root">
    <p>页面头部</p>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      btn_text: '详情页',
    };
  },
  methods: {
    clickHanlder() {
      this.btn_text = '点我';
    },
  },
};
</script>