const getters = {
  // sidebar: state => state.app.sidebar,
  // device: state => state.app.device,
  token: state => state.user.token,
  nickname: state => state.user.nickname,
  avatar: state => state.user.avatar,
  phoneNumber: state => state.user.phoneNumber,
  uid: state => state.user.uid,
  loading: state => state.app.loading,
  // roles: state => state.user.roles
}
export default getters
