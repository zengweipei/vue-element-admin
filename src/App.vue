<template>
  <div id="app">
    <router-view v-if="isShow"/>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.pageReload
    };
  },
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    //刷新
    pageReload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    }
  }
};
</script>
