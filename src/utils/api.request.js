import service from '@/utils/request'

export const request = ({
  ...params
}) => {
  return new Promise((resolve, reject) => {
    service.request({
      ...params
    }).then(res => {
      resolve(res)
    })
  })
}
