<template>
  <div class="home">
    <div>Hello ! {{title}}</div>
    <div>state：{{state}}</div>
    <div>getter：{{getter}}</div>
    <div>mutation: {{mutation}}</div>
    <div>action（请求 test 接口）: {{action||'请求中'}}</div>
    <div>获取token</div>
    <div>账号：17660822280</div>
    <div>密码：54188...</div>
    <div @click='login' v-if="!token">登录</div>
    <div>token: {{token||'未登录'}}</div>
  </div>
</template>

<script>
import { user } from '../api/index'
import { mapState } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      state: '',
      getter: '',
      mutation: ''
    }
  },
  async mounted () {
    this.state = this.date
    this.getter = this.$store.getters.getDateStr()
    this.$store.commit('setState', { auther: 'Yu Jiaming' })
    this.mutation = this.auther
    this.$store.dispatch('actionA')
  },
  computed: {
    ...mapState(['title', 'date', 'auther', 'token', 'action'])
  },
  methods: {
    async login () {
      const res = await user.login({
        phone: '17660822280',
        password: '54188...'
      })
      if (res.code === 0) {
        this.$store.commit('setState', { token: res.token })
      }
      // this.token = this.$store.state.token
    }
  }
}
</script>
