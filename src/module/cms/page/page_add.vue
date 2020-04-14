<template>
  <div>
    <!--编写页面静态部分，即view部分-->
    新增页面。。。
    <!--测试页面显示。。。。-->
    <el-form :model="pageForm" :rules="pageFormRules" ref="pageForm" label-width="80px">
      <el-form-item label="所属站点" prop="siteId" :show-message="true">
        <el-select v-model="pageForm.siteId" placeholder="请选择">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="数据URL" prop="dataUrl">
        <el-input v-model="pageForm.dataUrl" auto-complete="off"></el-input>
      </el-form-item>

      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio-button label="0">静态</el-radio-button>
          <el-radio-button label="1">动态</el-radio-button>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="创建时间">
        <el-date-picker
          v-model="pageForm.pageCreateTime"
          type="datetime"
          placeholder="请选择日期">
        </el-date-picker>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSumbit">提交</el-button>
      <el-button type="primary" @click="goBack">返回</el-button>
    </div>

  </div>
</template>
<script>
  // 引入接口api js
  import * as cmsApi from '../api/cms'
  // 编写页面静态部分，即model及vm部分
  export default {
    data() {
      return {
        pageForm: {
          // 站点ID
          siteId: '',
          // 模版ID
          templateId: '',
          // 页面名称
          pageName: '',
          // 别名
          pageAliase: '',
          // 访问路径
          pageWebPath: '',
          // 物理路径
          pagePhysicalPath: '',
          // 数据URL
          dataUrl:'',
          // 类型
          pageType: '',
          // 创建时间
          pageCreateTime: new Date()
        },
        // 站点列表
        siteList: [],
        // 模版ID列表
        templateList: [],
        // 检验规则
        pageFormRules: {
          siteId: [
            { required: true, message: '请选择站点', trigger: 'blur' }
          ],
          templateId: [
            { required: true, message: '请选择模版', trigger: 'blur' }
          ],
          pageName: [
            { required: true, message: '请输入页面名称', trigger: 'blur' }
          ],
          pageWebPath: [
            { required: true, message: '请输入访问路径', trigger: 'blur' }
          ],
          pagePhysicalPath: [
            { required: true, message: '请输入物理路径', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      // 提交方法
      addSumbit: function () {
        // 添加校验（:rules="pageFormRules" ref="pageForm"）
        this.$refs['pageForm'].validate((valid) => {
          if (valid) {
            // 添加确认信息框
            this.$confirm('确认提交吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              // 确认成功后提交
              cmsApi.page_add(this.pageForm).then(res => {
                if (res.success) {
                  this.$message({
                    message: '提交成功',
                    type: 'success'
                  })
                  // 提交成功后，将表单清空
                  this.$refs['pageForm'].resetFields()

                } else if (res.message) {
                  // 输出自定义错误信息
                  this.$message.error(res.message)
                } else {
                  this.$message.error("提交失败")
                }
              })
            }).catch(() => {
               console.log('已取消')
            })
          }
        })
      },
      // 返回方法，取出当前路由中的参数
      goBack:function () {
        this.$router.push({
          path: '/cms/page/list',
          query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        })
      }
    },
    mounted() {
      // 站点列表静态数据
      this.siteList = [
        {siteId: '5a751fab6abb5044e0d19ea1', siteName: '门户主站'},
        {siteId: '102', siteName: '测试站点'}
      ]
      // 站点列表静态数据
      this.templateList = [
        {templateId: '5a751fab6abb5044e0d19ea1', templateName: '课程详情页面'},
        {templateId: '202', templateName: '测试模版名称'}
      ]

    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
