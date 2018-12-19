import request from '@/util/request'

export function submitVerification(data) {
  // return Promise.resolve({username:'13800000000'})
  return request({
    url: '/information-verification',
    method: 'post',
    data
  })
}
