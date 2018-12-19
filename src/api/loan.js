import request from '@/util/request'

//借款记录
export function getList(data) {
  return request({
    url: '/loan/',
    method: 'get',
    params: data
  })
}

//借款详情
export function getLoanDetail(loanId,data) {
  return request({
    url: `/loan/${loanId}`,
    method: 'get',
    params: data
  })
}

export function preview(data) {
  return request({
    url: '/loan/preview',
    method: 'get',
    params: data
  })
}

//用户借款信息（是否实名，借款次数）
export function getLoanInfo(data) {
  return request({
    url: '/loan/info',
    method: 'get',
    params: data
  })
}

//用户借款信息（是否实名，借款次数)--未登录
export function getLoanInfoNotLogin(data) {
  return request({
    url: '/loan/info-not-login',
    method: 'get',
    params: data
  })
}

//用户最近地址
export function confirmLoanInfo(data) {
  return request({
    url: '/loan/confirm-info',
    method: 'get',
    params: data
  })
}



export function countCoin(data) {
  return request({
    url: '/loan/count-coin-quantity',
    method: 'get',
    params: data
  })
}


 //充币地址
export function getAddress(loanId,data) {
  return request({
    url: `/loan/${loanId}/recharge-coin-info`,
    method: 'get',
    params: data
  })
}


//提交
export function postLoan(data) {
  return request({
    url: '/loan',
    method: 'post',
    data
  })
}

//取消订单
export function cancel(loanId,data) {
  return request({
    url: `/loan/${loanId}/cancel`,
    method: 'get',
    params: data
  })
}

//保证金页面信息
export function bailInfo(loanId,data) {
  return request({
    url: `/loan/${loanId}/bail-info`,
    method: 'get',
    params: data
  })
}

//还款页面信息
export function repayInfo(loanId,data) {
  return request({
    url: `/loan/${loanId}/repayment-info`,
    method: 'get',
    params: data
  })
}

//还款
export function repayment(loanId,data) {
  return request({
    url: `/loan/${loanId}/repayment`,
    method: 'post',
    data
  })
}
