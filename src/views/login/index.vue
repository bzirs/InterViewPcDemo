<!--
 * @Author: bzirs
 * @Date: 2022-12-08 16:53:34
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 20:43:22
 * @FilePath: /interview-pc/src/views/login/index.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->

<template>
  <div class="login-page">
    <!-- 卡片 -->
    <el-card>
      <!-- 头部 -->
      <template #header>黑马面经运营后台</template>
      <!-- 主体 -->
      <el-form label-position="left" label-width="70px" :model="userInfo" :rules="userInfoRules" ref="userInfoRef">
        <el-form-item label="用户名:" prop="username">
          <el-input placeholder="请输入用户名" v-model="userInfo.username"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:">
          <el-input placeholder="请输入密码" v-model="userInfo.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toLogin">登录</el-button>
          <el-button @click="toReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { userLogin } from '@/api/user'
// import { setToken } from '@/utils/storage'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      // 用户登录信息
      userInfo: {
        username: '',
        password: ''
      },
      // 校验规则
      userInfoRules: {
        username: [
          {
            required: true,
            message: '用户名不能为空',
            grigger: ['blur', 'change']
          },
          {
            pattern: /^\w{5,11}$/,
            message: '用户名必须5-11位字符',
            trigger: ['blur', 'change']
          }
        ],
        password: [
          {
            required: true,
            message: '密码不能为空',
            trigger: ['blur', 'change']
          },
          {
            pattern: /^\w{5,11}$/,
            message: '密码必须5-11位字符',
            trigger: ['blur', 'change']
          }
        ]
      }
    }
  },
  async created () {},
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    toLogin () {
      this.$refs.userInfoRef.validate(async (valid) => {
        if (valid) {
          const { data: { token } } = await userLogin(this.userInfo)

          this.$message({
            showClose: true,
            message: '欢迎回来捏,master~~',
            type: 'success'
          })

          this.$store.commit('user/setToken', token)
          this.$router.push('/')
        }
      })
    },
    toReset () {
      this.$refs.userInfoRef.resetFields()
    }
  },
  computed: {},
  watch: {},
  directives: {}
}
</script>

<style lang='scss' scoped>
.login-page {
  min-height: 100vh;
  background: url(@/assets/login-bg.svg) no-repeat center / cover;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .el-card {
    width: 420px;

    // 深度选择器
    ::v-deep .el-card__header {
      background-color: #6a7cf5;
      height: 65px;
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
  }

  .el-form {
    padding: 0 20px;
  }

  .tc {
    text-align: center;
  }
}
</style>
