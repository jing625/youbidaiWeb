import request from '@/util/request'

export function register(data) {
  return request({
    url: '/user',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get',
  })
}

export function resetPassword(data) {
  return request({
    url: '/user/reset-password',
    method: 'post',
    data
  })
}

export function resetPasswordForget(data) {
  return request({
    url: '/user/reset-password-for-forget',
    method: 'post',
    data
  })
}
