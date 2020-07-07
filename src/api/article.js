import request from '@/utils/request'

// 获取所有宋词
export function getallArticle(data) {
  return request({
    url: '/getallArticle',
    method: 'post',
    data
  })
}

// 添加宋词
export function addArticle(data) {
  return request({
    url: '/addArticle',
    method: 'post',
    data
  })
}

// 修改宋词
export function editArticle(data) {
  return request({
    url: '/editArticle',
    method: 'post',
    data
  })
}

// 删除宋词
export function deleteArticle(data) {
  return request({
    url: '/deleteArticle',
    method: 'post',
    data
  })
}

// 获取所有文章类型
export function getAllArticleType() {
  return request({
    url: '/getAllArticleType',
    method: 'get'
  })
}
