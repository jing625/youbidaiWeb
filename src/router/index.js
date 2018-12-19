import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/layout/Layout'
import LayoutUser from '@/layout/Layout-user'
import LayoutLoan from '@/layout/Layout-loan'
import LayoutAsset from '@/layout/Layout-asset'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/pages/Index')
        },
      ]
    },
    {
      path: '/auth',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: 'login',
          component: () => import('@/pages/Login')
        },
        {
          path: 'register',
          component: () => import('@/pages/Register')
        },
        {
          path: 'forget-password',
          component: () => import('@/pages/ForgetPassword')
        }
      ]
    },
    {
      path: '/loan',
      name: '借款',
      component: LayoutLoan,
      children: [
        {
          name:'借款',
          path: '',
          component: () => import('@/pages/loan/Loan')
        },
        {
          name: '借款记录',
          path: 'record',
          component: () => import('@/pages/loan/LoanRecord'),
          children:[
            {
              name: '借款详情',
              path:'detail',
              component: () => import('@/pages/loan/loan-record/LoanDetail'),
            },
            {
              name: '补保证金',
              path:'bail',
              component: () => import('@/pages/loan/loan-record/LoanBail'),
            },
            {
              name: '还款赎回',
              path:'repay',
              component: () => import('@/pages/loan/loan-record/LoanRepayment'),
            }
          ]
        },
        {
          name: '质押充币',
          path: 'pledge',
          component: () => import('@/pages/loan/LoanPledge'),
          children:[
            {
              name: '放款',
              path: 'make',
              component: () => import('@/pages/loan/loan-pledge/MakeLoan')
            }
          ]
        }
      ]
    },
    {
      path: '/asset',
      name: '资产',
      component: LayoutAsset,
      children: [
        {
          name: '资产',
          path: '',
          component: () => import('@/pages/Asset/Asset')
        },
        {
          name: '财务记录',
          path: 'record',
          component: () => import('@/pages/Asset/asset-record/AssetRecord')
        },
        {
          name: '财务记录',
          path: 'balance',
          component: () => import('@/pages/Asset/asset-record/BalanceRecord')
        },
        {
          name: '提币',
          path: 'withdrawCoin',
          component: () => import('@/pages/Asset/WithdrawCoin')
        },
        {
          name: '提现',
          path: 'withdrawMoney',
          component: () => import('@/pages/Asset/WithdrawMoney')
        },
      ]
    },
    {
      path: '/download',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/pages/Download')
        }
      ]
    },
    {
      path: '/notice',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/pages/Notice')
        }
      ]
    },
    {
      path: '/help',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '',
          component: () => import('@/pages/Help-center')
        }
      ]
    },
    {
      path: '/user',
      name: '个人中心',
      redirect: '/user/security',
      component: LayoutUser,
      children: [
        {
          name: '账号安全',
          path: 'security',
          component: () => import('@/pages/user/User'),
          children: [
            {
              name: '修改登录密码',
              path: 'password1',
              component: () => import('@/pages/user/user-security/UserPassword')
            },
            {
              name: '设置资金密码',
              path: 'password2',
              component: () => import('@/pages/user/user-security/WalletPassword')
            },
            {
              name: '认证中心',
              path: 'verification',
              component: () => import('@/pages/user/user-security/Verification')
            }
          ]
        },
        {
          name: '邀请好友',
          path: 'invite',
          component: () => import('@/pages/user/Invite'),
        }
      ]
    }
  ]
})
