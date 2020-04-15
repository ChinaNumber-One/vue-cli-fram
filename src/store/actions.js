import { user } from '../api/index'
export default {
  async actionA ({ commit, state }) {
    commit('setState', { action: await getData() - state.date.getTime() + 'ms' })
  }
}
const getData = async (state) => {
  const res = await user.testGet()
  return res.data
}
