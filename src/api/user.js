import { service } from '../utils/request'

export default {
  post (payload) {
    return service.post('/api/user/test', payload)
  },
  postForm (payload) {
    return service.postForm('/api/user/test', payload)
  },
  testGet (payload) {
    return service.get('/api/user/test', {
      params: payload
    })
  },
  login (payload) {
    return service.post('/api/user/login', payload)
  }
}
