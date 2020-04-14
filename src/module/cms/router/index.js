// 导入文件
import Home from '@/module/home/page/home.vue'
import PageList from '@/module/cms/page/page_list.vue'
import PageAdd from '@/module/cms/page/page_add.vue'
import PageEdit from '@/module/cms/page/page_edit.vue'

export default [{
    path: '/',
    component: Home,
    name: 'CMS',
    hidden: false,
    children: [
      {path: '/cms/page/list', name: '页面列表', component: PageList, hidden: false},
      {path: '/cms/page/add', name: '新增页面', component: PageAdd, hidden: true},
      {path: '/cms/page/edit/:pageId', name: '修改页面', component: PageEdit, hidden: true}
    ]
  }
]
