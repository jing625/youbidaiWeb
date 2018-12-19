import request from '@/util/request'

//提币信息
export function rechargeCoin(data) {
  return request({
    url: '/recharge/coin-info',
    method: 'get',
    params: data
  })
}

//提钱信息
export function rechargeMoney(data) {
  return request({
    url: '/recharge/money-info',
    method: 'get',
    params: data
  })
}

//人民币转账明细
export function rechargeMoneyDetail(data) {
  return request({
    url: '/recharge/money-detail',
    method: 'get',
    params: data
  })
}

//币种转账明细
export function rechargeCoinDetail(data) {
  return request({
    url: '/recharge/coin-detail',
    method: 'get',
    params: data
  })
}

//计算实际到账
export function realCoinQuantity(data) {
  return request({
    url: '/recharge/real-coin-quantity',
    method: 'get',
    params: data
  })
}


//充币
export function rechargeCoinAddress(data) {
  return request({
    url: '/recharge/coin',
    method: 'post',
    data
  })
}

//交保证金
export function rechargeBail(data) {
  return request({
    url: '/recharge/loan-bail',
    method: 'post',
    data
  })
}

//提币
export function postWithdrawCoin(data) {
  return request({
    url: '/recharge/withdraw-coin',
    method: 'post',
    data
  })
}

//提现
export function postWithdrawMoney(data) {
  return request({
    url: '/recharge/withdraw-money',
    method: 'post',
    data
  })
}
