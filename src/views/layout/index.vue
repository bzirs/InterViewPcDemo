<!--
 * @Author: bzirs
 * @Date: 2022-12-08 16:55:46
 * @LastEditors: bzirs
 * @LastEditTime: 2022-12-08 22:15:21
 * @FilePath: /interview-pc/src/views/layout/index.vue
 * @Description:
 *
 * Copyright (c) 2022 by bzirs, All Rights Reserved.
-->
<template>
  <el-container class="layout-page">
    <!-- 左侧 -->
    <el-aside width="200px" class="el-aside">
      <h1 class="logo">黑马面经</h1>
      <!-- 导航父盒子 -->
      <el-menu background-color="#313A46" text-color="#fff" router default-active="/layout/dashboard">
        <el-menu-item index="/layout/dashboard">
          <i class="el-icon-menu"></i>
          <span slot="title">数据看板</span>
        </el-menu-item>
        <el-menu-item index="/layout/article">
          <i class="el-icon-menu"></i>
          <span slot="title">面经管理</span>
        </el-menu-item>

      </el-menu>
    </el-aside>
    <!-- 右侧 -->
    <el-container>
      <!-- 右侧顶部 -->
      <el-header>
        <el-popconfirm title="主人~您真滴要离开我嘛~~" @confirm="toLogout">
          <i slot="reference" title="logout" class="el-icon-switch-button"></i>
        </el-popconfirm>
      </el-header>
      <!-- 右侧主体 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// import { delToken } from '@/utils/storage'
export default {
  name: 'LayoutPage',
  components: {},
  props: {},
  data () {
    return {}
  },
  async created () {},
  mounted () {},
  activated () {},
  updated () {},
  methods: {
    toLogout () {
      this.$message.success('退出成功了捏~马上跳转登录页')
      setTimeout(() => {
        // delToken()
        this.$store.commit('user/removeToken')
        this.$router.push('/login')
      }, 500)
    }
  },
  computed: {},
  watch: {},
  directives: {}
}
</script>

<style scoped lang='scss'>
.layout-page {
  height: 100vh;

  .el-aside {
    background: #313a46;

    .logo {
      color: #fff;
      font-size: 20px;
      height: 60px;
      line-height: 60px;
      text-align: center;
    }

    .el-menu {
      border-right: none;
      margin-top: 20px;

      &-item {
        background-color: transparent !important;

        >span,
        i {
          padding-left: 5px;
        }
      }
    }
  }

  .el-header {
    box-shadow: 0px 0px 35px 0px rgba(154, 161, 171, 0.15);
    background: #fff;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    z-index: 999;

    .user {
      display: flex;
      align-items: center;
      background: #fafbfd;
      height: 60px;
      border: 1px solid #f1f3fa;
      padding: 0 15px;

      .el-avatar {
        margin-right: 15px;
      }
    }

    .logout {
      font-size: 20px;
      color: #999;
      cursor: pointer;
      padding: 0 15px;
    }
  }

  .el-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #aaa;
    border-top: 1px solid rgba(152, 166, 173, 0.2);
    font-size: 14px;
  }
}
</style>
