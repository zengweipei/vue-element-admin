import request from '@/utils/request'

export function searchUser(name) {
  return request({
    url: '/vue-element-admin/search/user',
    method: 'get',
    params: { name }
  })
}

export function transactionList(query) {
  // return request({
  //   url: '/vue-element-admin/transaction/list',
  //   method: 'get',
  //   params: query
  // })
  const response = {
    data: {
      items: [
        {
          order_no: 'Bc1786BD-ef7d-4E5d-C8A3-5bbeCb',
          price: '1,699.14',
          status: 'pending'
        },
        {
          order_no: 'Bc1786BD-ef7d-4E5d-C8A3-5bbeCb',
          price: '1,699.14',
          status: 'pending'
        }
      ]
    }
  }
  return new Promise((resolve, reject) => {
    resolve(response)
  })
}
