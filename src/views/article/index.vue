<template>
  <div class="article-page">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>面经后台</el-breadcrumb-item>
      <el-breadcrumb-item>面经管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card shadow="never" border="false" class="el-card">
      <!-- 1.头部 -->
      <template #header>
        <div class="header">
          <span>共 {{ total }} 条记录</span>
          <el-button icon="el-icon-plus" size="small" type="primary" @click="showDrawer('add')" round>
            添加面经
          </el-button>
        </div>
      </template>
      <!-- 2.表格 -->
      <el-table :data="articleList" style="width: 100%" class="">
        <el-table-column label="标题">
          <template v-slot="{ row: { stem } }">
            <span>{{ stem }}</span>
          </template>
        </el-table-column>
        <el-table-column label="作者">
          <template v-slot="{ row: { creator } }">
            <span>{{ creator }}</span>
          </template>
        </el-table-column>
        <el-table-column label="点赞">
          <template v-slot="{ row: { likeCount } }">
            <span>{{ likeCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="浏览数">
          <template v-slot="{ row: { views } }">
            <span>{{ views }}</span>
          </template>
        </el-table-column>
        <el-table-column label="更新时间">
          <template v-slot="{ row: { createdAt } }">
            <span>{{ createdAt }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template>
            <div class="actions">
              <i class="el-icon-view" @click="showDrawer('view')"></i>
              <i class="el-icon-edit-outline" @click="showDrawer('edit')"></i>
              <i class="el-icon-delete"></i>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 3.分页组件 -->
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="requestObj.current" :page-size="requestObj.pageSize" :page-sizes="[10, 20, 30]"
        layout="total,sizes,prev, pager, next,jumper" :total="total">
      </el-pagination>
    </el-card>
    <el-drawer :title="updateDrawerType" :visible.sync="drawer" direction="rtl" :before-close="handleClose" size="50%">
      <el-form label-position="right" label-width="80px" :model="formData" :rules="formDataRules" ref="formDataRef">
        <el-form-item label="标题" prop="stem">
          <el-input placeholder="输入面经标题" v-model="formData.stem"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quillEditor v-model="formData.content"></quillEditor>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toConfirm">确认</el-button>
          <el-button type="info" @click="toReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
import { getArticleList } from '@/api/article'
export default {
  name: 'article-page',
  components: { quillEditor },
  data () {
    return {
      articleList: [],
      // 文章总数
      total: 0,
      requestObj: {
        current: 1,
        pageSize: 10
      },
      // 抽屉显示隐藏
      drawer: false,
      // 判断抽屉标题
      drawerType: '',
      // 表单
      formData: {
        stem: '',
        content: ''
      },
      // 表单验证规则
      formDataRules: {
        stem: [{ required: true, message: '输入面经标题', trigger: 'blur' }],
        content: [{ required: true, message: '内容不能为空', trigger: 'blur' }]
      }
    }
  },
  async created () {
    this.initList()
  },
  computed: {
    updateDrawerType () {
      if (this.drawerType === 'add') {
        return '新增面经'
      } else if (this.drawerType === 'view') {
        return '预览面经'
      } else {
        return '编辑面经'
      }
    }
  },
  methods: {
    async initList () {
      const {
        data: { rows, total }
      } = await getArticleList(this.requestObj)
      this.total = total
      this.articleList = rows
    },
    // 监听显示每页个数
    handleSizeChange (val) {
      this.requestObj.pageSize = val
      this.initList()
    },
    // 监听页数变化
    handleCurrentChange (val) {
      this.requestObj.current = val
      this.initList()
    },
    // 抽屉 相关
    showDrawer (flag) {
      this.drawer = true
      this.drawerType = flag
    },
    // 抽屉关闭
    async handleClose () {
      await this.$confirm('确认关闭？')
      this.drawer = false
    },
    // 表单提交
    toConfirm () {
      this.$refs.formDataRef.validate((valid) => {
        console.log(valid)
      })
    },
    // 表单回到上一个状态
    toReset () {
      this.$refs.formDataRef.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  margin-top: 25px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 16px;
  }

  .actions {
    font-size: 18px;
    display: flex;
    justify-content: space-around;
    color: #666;

    >i:hover {
      color: rgba(114, 124, 245, 1);
      cursor: pointer;
    }
  }
}

.el-pagination {
  margin-top: 20px;
  text-align: center;
}

.el-breadcrumb {
  margin-top: 10px;
}

.el-form {
  padding-right: 40px;
}

.quill-editor {
  ::v-deep .ql-editor {
    height: 300px;
  }
}

.el-rate {
  padding: 10px 0;
}

.article-preview {
  padding: 0 40px 40px 40px;

  >h5 {
    font-size: 20px;
    color: #666;
    border-bottom: 1px dashed #ccc;
    padding-bottom: 30px;
    margin: 0 0 20px 0;
  }
}
</style>
