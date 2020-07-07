<template>
  <div class="dashboard-editor-container">
    <div class="welcomemessage">欢迎登录后台管理系统！</div>
  </div>
</template>

<script>
export default {
  name: 'DashboardElse',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;
  .welcomemessage {
    text-align: center;
    font-size: 30px;
    color: #399ef4;
    padding: 10px;
  }
}
</style>
