import {login, loginByPhone, logout} from '@/api/auth'
import {getToken, setToken, removeToken} from '@/util/cookie'
import {getUserInfo,register} from "@/api/user";

const user = {
  state: {
    token: getToken(),
    nickname: '',
    avatar: '',
    phoneNumber:'',
    uid: '',
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, nickname) => {
      state.nickname = nickname
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_PHONE: (state, phoneNumber) => {
      state.phoneNumber = phoneNumber
    },
    SET_UID: (state,uid) =>{
      state.uid = uid
    }
  },

  actions: {
    // 注册
    Register({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        register({phoneNumber: username, captcha: userInfo.captcha, inviteCode:userInfo.inviteCode}).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.nickname)
          resolve('啦啦啦')
        })
      })
    },
    // 登录
    Login({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login({phoneNumber: username, password: userInfo.password}).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.nickname)
          resolve('啦啦啦')

        })
      })
    },

    // 验证码登录
    LoginByPhone({commit}, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByPhone({phoneNumber: username, captcha: userInfo.captcha}).then(data => {
          setToken(data.token)
          commit('SET_TOKEN', data.token)
          commit('SET_NAME', data.user.nickname)
          resolve(data)

        })
      })
    },

    // 获取用户信息
    GetUserInfo({commit,state}) {
      return new Promise((resolve, reject) => {
        if (state.token) {
          getUserInfo().then((res) => {
            commit('SET_NAME', res.nickname)
            commit('SET_AVATAR', res.avatarUrl)
            commit('SET_PHONE', res.phoneNumber)
            commit('SET_UID', res.id.substr(0,6))
            console.log(res)
            resolve(res)
          })
        }
      })
    },

    // 登出
    LogOut({commit, state}) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('SET_TOKEN', '')
          removeToken()
          commit('SET_NAME', '')
          resolve()
        })
      })
    },

    // 前端 登出
    FedLogOut({commit}) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        commit('SET_NAME', '')
        resolve()
      })
    }
  }

}

export default user
