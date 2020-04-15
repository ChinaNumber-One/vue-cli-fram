import { user } from '../api/index'
export default {
  async actionA ({ commit }) {
    commit('setState', { action: await getData() })
  }
}
const getData = async () => {
  const res = await user.testGet()
  return res.data
}
