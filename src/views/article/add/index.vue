<template>
  <div class="components-container">
    <el-form
      :label-position="labelPosition"
      :model="ruleForm"
      :rules="rules"
      class="demo-ruleForm"
      label-width="100px"
      ref="ruleForm"
    >
      <!-- 标题 -->
      <el-form-item label="标题" prop="title">
        <el-input style="width:30%;" v-model="ruleForm.title"></el-input>
      </el-form-item>
      <!-- 标题封面图片 -->
      <el-form-item label="主题图片">
        <el-upload
          :action="baseURL+'/upload/preview'"
          :before-upload="beforeAvatarUpload"
          :data="paramsData"
          :file-list="filelist"
          :on-success="handleAvatarSuccess"
          :show-file-list="false"
          class="avatar-uploader"
        >
          <img :src="ruleForm.img_path" class="avatar" v-if="ruleForm.img_path" />
          <i class="el-icon-plus avatar-uploader-icon" v-else></i>
        </el-upload>
      </el-form-item>
      <!-- 作者名称 -->
      <el-form-item label="作者" prop="author">
        <el-input style="width:30%;" v-model="ruleForm.author"></el-input>
      </el-form-item>
      <!-- 文章类型 -->
      <el-form-item label="文章类型" prop="article_type">
        <el-select clearable placeholder="请选择" v-model="ruleForm.article_type">
          <el-option
            :key="item.article_type"
            :label="item.article_typeName"
            :value="item.article_type"
            v-for="item in article_typeList"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 内容 -->
      <el-form-item label="内容" prop="content">
        <tinymce :height="300" ref="tinymce" v-model="ruleForm.content" />
      </el-form-item>
      <!-- 添加提交/取消按钮 -->
      <el-form-item>
        <el-button @click="submitForm('ruleForm')" type="primary">{{ btnText }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import Tinymce from '@/components/Tinymce'

import { addArticle, editArticle, getAllArticleType } from '@/api/article'

export default {
  components: { Tinymce },
  data() {
    return {
      // 表单域标签的位置，right/left/top
      labelPosition: 'right',
      baseURL: process.env.VUE_APP_BASE_API,
      formData: null,
      ruleForm: {
        id: '',
        author: '',
        title: '',
        img_path: '',
        content: ``,
        article_type: ''
      },
      article_typeList: [],
      btnText: '',
      filelist: [],
      rules: {
        title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
        author: [
          { required: true, message: '请输入作者名称', trigger: 'blur' }
        ],
        article_type: [
          { required: true, message: '请选择类型', trigger: 'change' }
        ],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
      }
    }
  },
  computed: {
    paramsData: function() {
      let params = {
        file: this.formData
      }
      return params
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.$message.success('上传头像成功')
      console.log(file.raw)
      this.ruleForm.img_path = URL.createObjectURL(file.raw)
      this.formData = file.raw
    },
    // 上传组件上传图片前钩子函数
    async beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M
    },

    // 提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          // console.log(this.ruleForm)
          const bl = this.btnText === '添加'
          let res = {}
          const formData = new FormData()
          const { file } = this.paramsData
          formData.append('file', file)
          const ruleForm = this.ruleForm
          // 编辑页面已经拼接上基准路径，需要替换掉 图片路径格式: '/upload/xxx/'
          if ((ruleForm.img_path).startsWith(this.baseURL)) {
            ruleForm.img_path = ruleForm.img_path.replace(this.baseURL, '')
          }
          formData.append('data', JSON.stringify(ruleForm))
          if (bl) {
            res = await addArticle(formData)
          } else {
            res = await editArticle(formData)
          }
          if (res.code === 200) {
            this.$notify({
              title: '成功',
              message: res.message,
              type: 'success'
            })
            this.$refs[formName].resetFields()
            this.$refs.tinymce.setContent(``)
            this.btnText = '添加'
            this.ruleForm.img_path = ''
            // console.log(this.ruleForm)
          } else {
            this.$notify({
              title: '失败',
              message: res.message,
              type: 'error'
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    // 获取并判断是否是编辑信息传递过来的数据
    const data = this.$route.params
    const bl = Object.keys(data).length > 0
    // 修改页面才对ruleForm赋值
    if (bl) {
      this.ruleForm = data
      this.btnText = '修改'
      if (data.img_path) {
        this.ruleForm.img_path = this.baseURL + this.ruleForm.img_path
      }
    } else {
      this.btnText = '添加'
    }
    // 获取文章分类类型列表
    getAllArticleType().then(res => {
      this.article_typeList = res.data
    })
  }
}
</script>

<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 58px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
  border: 1px dashed #ccc;
}
.avatar {
  width: 175px;
  height: 175px;
}
</style>