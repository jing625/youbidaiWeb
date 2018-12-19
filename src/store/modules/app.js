import Cookies from 'js-cookie'

const app = {
  state: {
    loading: false
  }
    ,
  mutations: {
    setLoading: (state, loading) => {
      state.loading = loading
    },
  },
  actions: {

  }
}

export default app
