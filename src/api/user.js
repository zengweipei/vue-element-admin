import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data: {
      username: data.username,
      password: data.password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/getUserInfo',
    method: 'post',
    data: { token }
  })
}

export function editUser(data) {
  return request({
    url: '/editUser',
    method: 'post',
    data: data
  })
}

export function logout(token) {
  return request({
    url: '/logout',
    method: 'post',
    data: { token }
  })
}
