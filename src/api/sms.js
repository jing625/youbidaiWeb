import request from '@/util/request'

export function register(data) {
  return request({
    url: '/sms/register',
    method: 'get',
    params: data
  })
}

export function login(data) {
  return request({
    url: '/sms/login',
    method: 'get',
    params: data
  })
}

export function resetPass(data) {
  return request({
    url: '/sms/reset-password',
    method: 'get',
    params: data
  })
}

export function resetPassForget(data) {
  return request({
    url: 'sms/forget-password',
    method: 'get',
    params: data
  })
}

export function resetWalletPass(data) {
  return request({
    url: '/sms/reset-wallet-password',
    method: 'get',
    params: data
  })
}

//实名认证
export function verification(data) {
  return request({
    url: '/sms/iv',
    method: 'get',
    params: data
  })
}

//提币
export function withdrawCoin(data) {
  return request({
    url: '/sms/withdraw-coin',
    method: 'get',
    params: data
  })
}

//提现
export function withdrawMoney(data) {
  return request({
    url: '/sms/withdraw-money',
    method: 'get',
    params: data
  })
}
