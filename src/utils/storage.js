export default {
  /**
   * 本地存储
   * @param {String} key
   * @param {*} value
   * @param {Date} expireTime
   */
  setStorage (key, value, expireTime) {
    if (!key) throw new Error('storage: key is not defined')
    if (!value) console.warn(`storage: key [${key}] has no value`)

    window.localStorage.setItem(key, JSON.stringify(value))
    if (expireTime) window.localStorage.setItem(`${key}-expireTime`, expireTime.getTime())
  },
  getStorage (key) {
    if (!key) throw new Error('storage: key is not defined')

    const expireTime = JSON.parse(window.localStorage.getItem(`${key}-expireTime`))
    if (process.env.NODE_ENV === 'production' && expireTime && Date.now() > expireTime) {
      window.localStorage.removeItem(key)
      window.localStorage.removeItem(key + '-expireTime')
      return null
    } else {
      return JSON.parse(window.localStorage.getItem(key))
    }
  },
  removeStorage (key) {
    if (!key) throw new Error('storage: key is not defined')

    window.localStorage.removeItem(key)
    window.localStorage.removeItem(`${key}-expireTime`)
  },
  clearStorage () {
    window.localStorage.clear()
  }
}
