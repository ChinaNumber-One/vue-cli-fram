function helper (state, payload) {
  const { key, value } = payload
  const group = key.split('.')
  let index = 0
  let currState = state
  let previousState
  let currKey
  while (group[index]) {
    currKey = group[index]
    previousState = currState
    currState = currState[currKey]
    index++
  }
  previousState[currKey] = value
}

export default {
  setState (state, payload) {
    for (const key in payload) {
      helper(state, {
        key,
        value: payload[key]
      })
    }
  }
}
