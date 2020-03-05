import { VUEX_STORE_LS } from '@/utils/constant'
import ls from '@/utils/storage'
const {
  setStorage: setItem,
  getStorage: getItem
} = ls
export default function (store) {
  const savedState = getItem(VUEX_STORE_LS)
  if (savedState) store.replaceState(compositeState(store.state, savedState))
  const listener = debounce((mutation, state) => {
    setItem(VUEX_STORE_LS, shallowClone(state))
  }, 1000)
  store.subscribe(listener)
}

function shallowClone (state) {
  return Object.create(Object.getPrototypeOf(state), Object.getOwnPropertyDescriptors(state))
}

function compositeState (target, source) {
  const result = {}

  const keys = Object.keys(target)
  keys.forEach(key => {
    if (Array.isArray(target[key])) {
      if (Array.isArray(source[key]) && source[key].length) {
        result[key] = source[key]
      } else {
        result[key] = target[key]
      }
    } else if (isObject(target[key])) {
      if (isObject(source[key])) {
        result[key] = compositeState(target[key], source[key])
      } else {
        result[key] = target[key]
      }
    } else {
      result[key] = source[key] || target[key]
    }
  })

  return result
}

function isObject (value) {
  return value && typeof value === 'object'
}

function debounce (fn, duration = 500) {
  let timer = null
  return function debouncedFn (...args) {
    if (timer) {
      clearTimeout(timer)
      timer = null
    }

    timer = setTimeout(function () {
      fn(...args)
      clearTimeout(timer)
      timer = null
    }, duration)
  }
}
