import http from './../../../base/api/public'
import querystring from 'querystring'
let sysConfig = require('@/../config/sysConfig')
let apiUrl = sysConfig.xcApiUrlPre;

// 请求服务端的页面查询接口
export const page_list = (page, size, params) => {
  // return http.requestQuickGet('http://localhost:31001/cms/page/list/' + page + '/' + size)
  // 解决跨域问题，通过proxyTable，http代理中间件来实现

  // 将查询项进行拼接成key/value串：?xxx&xxx形式
  // 死方法
  // let queryString = 'siteId=' + params.siteId + '&pageAliase=' + params.pageAliase
  // 通过querystring工具类来实现
  let queryString = querystring.stringify(params)

  return http.requestQuickGet(apiUrl + '/cms/page/list/' + page + '/' + size + '?' + queryString)
}
// 新增页面接口
export const page_add = params => {
  return http.requestPost(apiUrl + '/cms/page/add', params)
}
// 根据pageId查询接口
export const page_get = pageId => {
  return http.requestQuickGet(apiUrl + '/cms/page/get/' + pageId)
}
// 修改页面提交接口
export const page_edit = (id, params) => {
  return http.requestPut(apiUrl + '/cms/page/edit/' + id, params)
}
// 删除页面接口
export const page_del = id => {
  return http.requestDelete(apiUrl + '/cms/page/del/' + id)
}
// 发布页面
export const page_postPage = id => {
  return http.requestPost(apiUrl + '/cms/page/postPage/' + id)
}
