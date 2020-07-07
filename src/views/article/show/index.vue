<template>
  <div class="index">
    <!-- 引入搜索子组件 -->
    <el-row style="margin-bottom:10px;">
      <search
        :article_typeList="article_typeList"
        @getarticletype="getarticletype"
        @getsearchresult="getsearchresult"
        @setsearchword="setsearchword"
      />
    </el-row>
    <!-- 内容区域 -->
    <el-row>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form class="demo-table-expand" inline label-position="left">
              <el-form-item label="图片:" v-show="props.row.img_path">
                <img :src="`${baseURL}${props.row.img_path}`" class="avatar"/>
              </el-form-item>
              <el-form-item label="标题:">
                <div>{{ props.row.title }}</div>
              </el-form-item>
              <el-form-item label="作者:">
                <div>{{ props.row.author }}</div>
              </el-form-item>
              <el-form-item label="文章类型:">
                <div>{{ props.row.article_typeName }}</div>
              </el-form-item>
              <el-form-item label="发布时间:">
                <div>{{ props.row.create_time }}</div>
              </el-form-item>
              <el-form-item label="更新时间:">
                <div>{{ props.row.update_time }}</div>
              </el-form-item>
              <el-form-item label="内容:">
                <div v-html="props.row.content"></div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="标题" prop="title"></el-table-column>
        <el-table-column label="作者" prop="author"></el-table-column>
        <el-table-column label="文章类型" prop="article_typeName"></el-table-column>
        <el-table-column label="发布时间" prop="create_time"></el-table-column>
        <el-table-column label="操作" width="250">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.$index, scope.row)" size="mini">编辑</el-button>
            <el-button @click="handleDelete(scope.$index, scope.row)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!-- 分页 -->
    <el-row>
      <pagination
        :limit.sync="listQuery.limit"
        :page.sync="listQuery.page"
        :total="total"
        @pagination="init"
      />
    </el-row>
  </div>
</template>

<script>
import search from './components/search'
import Pagination from '@/components/Pagination'

import { getallArticle, deleteArticle, getAllArticleType } from '@/api/article'

export default {
  components: { search, Pagination },
  data() {
    return {
      baseURL: process.env.VUE_APP_BASE_API,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20,
        // 搜索关键字
        searchword: '',
        article_type: ''
      },
      // 内容区域数据
      tableData: [],
      // 文章类型数据数组
      article_typeList: []
    }
  },
  methods: {
    // 获取搜索关键字
    setsearchword(inputvalue) {
      this.listQuery.searchword = inputvalue
    },
    // 获取文章类型
    getarticletype(articletype) {
      this.listQuery.article_type = articletype
    },
    // 获取搜索结果
    getsearchresult() {
      // console.log(this.listQuery)
      this.init()
    },
    handleEdit(index, row) {
      // console.log(index, row)
      const { id, title, author, content, article_type, img_path } = row
      this.$router.push({
        name: 'articleadd',
        params: {
          id,
          title,
          author,
          content,
          article_type,
          img_path
        }
      })
    },
    async handleDelete(index, row) {
      // console.log(index, row)
      this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await deleteArticle({ id: row.id })
        if (res.code === 200) {
          this.$notify({
            title: '成功',
            message: res.message,
            type: 'success'
          })
          this.init()
        }
      })
    },
    async init() {
      // 获取数据
      const result = (await getallArticle(this.listQuery)) || {}
      this.tableData = result.data.result[0]
      this.total = result.data.total
    }
  },
  mounted() {
    this.init()
    getAllArticleType().then(res => {
      this.article_typeList = res.data
    })
  }
}
</script>

<style scoped>
.index {
  padding: 10px;
}

.avatar {
  width: 175px;
  height: 175px;
}
</style>