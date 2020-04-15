<template>
  <div class="home">
    <div>Hello ! {{title}}</div>
    <div>state：{{state}}</div>
    <div>getter：{{getter}}</div>
    <div>mutation: {{mutation}}</div>
    <div>action: {{action}}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      state: '',
      getter: '',
      mutation: '',
      action: '请求中....'
    }
  },
  async mounted () {
    this.$store.dispatch('actionA')
    this.state = this.date
    this.getter = this.$store.getters.getDateStr()
    this.$store.commit('setState', { auther: 'Yu Jiaming' })
    this.mutation = this.auther
    setTimeout(() => {
      this.action = this.$store.state.action
    }, 3000)
  },
  computed: {
    ...mapState(['title', 'date', 'auther'])
  },
  methods: {
    ...mapMutations(['setState'])
  }
}
</script>
