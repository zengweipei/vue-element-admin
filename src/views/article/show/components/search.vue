<template>
  <div class="index">
    <el-row>
      <el-col :span="6">
        <el-input @change="setsearchword" clearable placeholder="请输入标题或作者" v-model="inputvalue"></el-input>
      </el-col>
      <el-col :offset="1" :span="4">
        <div>
          <el-select clearable placeholder="选择文章类型" v-model="article_type" @change="getarticletype">
            <el-option
              :key="item.article_type"
              :label="item.article_typeName"
              :value="item.article_type"
              v-for="item in article_typeList"
            ></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :offset="1" :span="12">
        <el-button @click="getsearchresult" icon="el-icon-search" type="primary">搜索</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    article_typeList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      // 搜索关键字
      inputvalue: '',
      // 选择的类型
      article_type: ''
    }
  },
  methods: {
    // 调用方法传递数据
    setsearchword() {
      this.$emit('setsearchword', this.inputvalue)
    },
    // 点击按钮触发事件
    getsearchresult() {
      this.$emit('getsearchresult')
    },
    // 点击按钮触发事件
    getarticletype(){
      this.$emit('getarticletype',this.article_type)
    }
  }
}
</script>

<style scoped>
</style>