import request from '@/util/request'

export function resetWalletPassword(data) {
  return request({
    url: '/wallet/reset-password',
    method: 'post',
    data
  })
}

export function walletInfo(data) {
  return request({
    url: '/wallet/info',
    method: 'get',
    params: data
  })
}

