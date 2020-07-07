<template>
  <el-form :model="user" :rules="rules" ref="dataForm">
    <el-form-item label="Name" prop="name">
      <el-input v-model.trim="user.name" />
    </el-form-item>
    <el-form-item label="Password" prop="password">
      <el-input type="password" v-model.trim="user.password" />
    </el-form-item>
    <el-form-item label="Email" prop="email">
      <el-input v-model.trim="user.email" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Update</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { editUser } from '@/api/user'

export default {
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          password: '',
          email: ''
        }
      }
    }
  },
  data() {
    return {
      rules: {
        name: [
          { required: true, message: 'name is required', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'password is required', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'email is required', trigger: 'blur' }
        ]
      }}
  },
  mounted() {
   
  },
  methods: {
    submit() {
      this.$refs['dataForm'].validate(async valid => {
        if (valid) {
          const { name, password, email } = this.user
          const data = {
            name, password: this.$md5(password), email
          }
          console.log(data)
          const res = await editUser(data)
          if (res.code === 200) {
            this.$message({
              message: res.message,
              type: 'success',
              duration: 2 * 1000
            })
          }
        }
      })
    }
  }
}
</script>
