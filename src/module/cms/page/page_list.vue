<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    <!--测试页面显示。。。。-->
    <el-form :model="params">
      <el-select v-model="params.siteId" placeholder="请选择">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      <el-input v-model="params.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <!--新增页面路由,将当前页的page和siteId带到新增页面，并返回时回传过来-->
      <router-link :to="{path:'/cms/page/add', query:{
        page: this.params.page,
        siteId: this.params.siteId
      }}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="tableData"
      stripe
      highlight-current-row
      style="width: 100%">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="别名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageType"
        label="页面类型"
        width="50">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="物理路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="访问路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="dataUrl"
        label="数据URL"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pageCreateTime"
        label="创建时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作"
        width="220">
        <template slot-scope="page">
          <!--slot-scope 插槽交互每一行的数据-->
          <el-button size="small" type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button size="small" type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button size="small" type="text" @click="preview(page.row.pageId)">页面预览</el-button>
          <el-button size="small" type="text" @click="postPage(page.row.pageId)">发布页面</el-button>

        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="params.page"
      :page-size="params.size"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
  // 引入接口api js
  import * as cmsApi from '../api/cms'
  // 编写页面静态部分，即model及vm部分
  export default {
    data() {
      return {
        // 站点列表
        siteList: [],
        tableData: [],
        // 页面总记录数
        total: 0,
        // 分页数据
        params: {
          // 当前页
          page: 1,
          // 页面件数
          size: 10,
          // 查询项: 站点ID
          siteId: '',
          // 查询项: 别名
          pageAliase: ''
        }
      }
    },
    methods: {
      // 查询方法
      query: function () {
        // 调用服务端的接口
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          // 将res的结果数据赋值给数据模型对象
          this.tableData = res.queryResult.list
          // 总件数
          this.total = res.queryResult.total
          }

        )
      },
      // 页面改变方法
      changePage:function (page) {
        // 将形参当前页赋值于当前页参数
        this.params.page = page
        // 调用query方法
        this.query()
      },
      // 页面编辑
      edit: function (pageId) {
        // 打开修改页面
        this.$router.push({
          path: '/cms/page/edit/' + pageId
        })
      },
      // 页面删除
      del:function (pageId) {
        // 提示删除确认
        this.$confirm('确认删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 删除操作
          cmsApi.page_del(pageId).then((res) => {
            if (res.success) {
              this.$message.success("删除成功")
              // 删除查询列表
              this.query()
            } else {
              this.$message.error("删除失败")
            }
          })
        }).catch(() => {
          console.log('已取消')
        })
      },
      // 页面预览
      preview:function (pageId) {
        // 打开浏览器窗口
        window.open("http://www.xuecheng.com:8083/cms/previews/" + pageId)
      },
      // 发布页面
      postPage:function (pageId) {
        // 提示发布确认
        this.$confirm('确认发布该页面吗', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 发布操作
          cmsApi.page_postPage(pageId).then((res) => {
            if (res.success) {
              console.log('发布页面ID：' + pageId)
              this.$message.success('发布成功，请稍后查看结果')
            } else {
              this.$message.error('发布失败')
            }
          })
        }).catch(() => {
          console.log('已取消')
        })
      }
    },
    // created函数在mounted函数之前
    created() {
      // 取出路由中的参数，赋值给数据对象
      // 小技巧：从URL中取出的数据是个字符串，要记得转换类型
      // this.$route.query.page || 1 取第一个是真的值，没有时取后一项（$route，不是$router）
      this.params.page = Number.parseInt(this.$route.query.page || 1)
      this.params.siteId = this.$route.query.siteId || ''
    },
    mounted() {
      // 画面渲染结束后，立即调用勾子函数mounted
      this.query()
      // 站点列表静态数据
      this.siteList = [
        {siteId: '5a751fab6abb5044e0d19ea1', siteName: '门户主站'},
        {siteId: '102', siteName: '测试站点'}
      ]
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
