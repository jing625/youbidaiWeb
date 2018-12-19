import request from '@/util/request'

export function getUserCenterInfo(data) {
  return request({
    url: '/user-center/info',
    method: 'get',
    params: data
  })
}

export function getUserCenterSecurityInfo(data) {
  return request({
    url: '/user-center/security-info',
    method: 'get',
    params: data
  })
}
