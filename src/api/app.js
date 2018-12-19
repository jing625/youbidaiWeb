import request from '@/util/request'



export function appIos(data) {
  return request({
    url: '/app/current-ios-version',
    method: 'get',
    params: data
  })
}


export function appAndroid(data) {
  return request({
    url: '/app/current-android-version',
    method: 'get',
    params: data
  })
}
