<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>About me</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="baseURL+user.avatar" :height="'100px'" :width="'100px'" @isShow="isShow" :hoverable="false">
          <div>Hello</div>
          {{ user.role }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
        <div class="user-role text-center text-muted">{{ user.role | uppercaseFirst }}</div>
      </div>
    </div>

    <el-dialog
      title="上传头像"
      :visible.sync="dialogVisible"
      width="35%">
      <el-upload
        class="avatar-uploader"
        :action="baseURL+'/upload'"
        :data="paramsData"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="img_path" :src="img_path" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="upLoadAvatar">确 定</el-button>
      </span>
    </el-dialog>

    <div class="user-bio">
      <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div>

      <div class="user-skills user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="skill" /><span>Skills</span></div>
        <div class="user-bio-section-body">
          <div class="progress-item">
            <span>Vue</span>
            <el-progress :percentage="70" />
          </div>
          <div class="progress-item">
            <span>JavaScript</span>
            <el-progress :percentage="18" />
          </div>
          <div class="progress-item">
            <span>Css</span>
            <el-progress :percentage="12" />
          </div>
          <div class="progress-item">
            <span>ESLint</span>
            <el-progress :percentage="100" status="success" />
          </div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script>
import { mapActions } from 'vuex'
import PanThumb from '@/components/PanThumb'
import { request } from '@/utils/api.request'

export default {
  components: { PanThumb },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          id: '',
          name: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      img_path: (process.env.VUE_APP_BASE_API) + this.user.avatar, //预览图
      baseURL: process.env.VUE_APP_BASE_API,
      formData: null
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
    ...mapActions('user',[
      'getInfo'
    ]),
    isShow(val) {
      this.dialogVisible = val
    },
    handleAvatarSuccess(res, file) {
      this.$message.success('上传头像成功')
      console.log(file.raw)
      this.img_path = URL.createObjectURL(file.raw)
      this.formData = file.raw
    },
    //上传组件上传图片前钩子函数
    async  beforeAvatarUpload(file) {
      const isImage = file.type === 'image/jpeg' || 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImage) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isImage && isLt2M;
    },
    // 点击上传图片
    async upLoadAvatar() {
      const { file } = this.paramsData
      let formData = new FormData()
      formData.append('file', file)
      formData.append('id', this.user.id)
      formData.append('name', this.user.name)
      const res = await  request({
        url: '/upload',
        method: 'post',
        data: formData
      })
      console.log(res)
      if (res.code === 200) {
        this.$notify({
          title: 'Success',
          message: res.message,
          type: 'success',
          duration: 2000
        })
        this.dialogVisible = false
        //更新头像
        await this.getInfo()
        this.$emit('getUser')
      } else {
        this.$notify({
          title: 'Error',
          message: res.message,
          type: 'error',
          duration: 2000
        })
      }
    },
    cancel() {
      this.dialogVisible = false
      this.img_path = this.baseURL + this.user.avatar
      this.formData = null
    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  }
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
