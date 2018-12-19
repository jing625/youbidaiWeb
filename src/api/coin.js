import request from '@/util/request'

export function coin(data) {
  return request({
    url: '/coin',
    method: 'get',
    params: data
  })
}
