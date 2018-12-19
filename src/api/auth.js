import request from '@/util/request'

export function login(data) {
  // return Promise.resolve({token:"1234567",username:'13822656180'})
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function loginByPhone(data) {
  // return Promise.resolve({token:"1234567",username:'13822656180'})
  return request({
    url: '/auth/login-by-phone-number',
    method: 'post',
    data
  })
}


export function logout() {
  // return Promise.resolve({})
  return request({
    url: '/auth/logout',
    method: 'get',
  })
}
