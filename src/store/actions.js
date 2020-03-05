export default {
  actions: {
    async actionA ({ commit }) {
      commit('gotData', await getData())
    }
  }
}
const getData = () => {
  return this.$http.get('/api/text')
}
