export const types = {
  ADD: 'ADD',
  REMOVE: 'REMOVE',
}

export const actionCreators = {
  add: (item) => {
    return {type: types.ADD, payload: item}
  },
  remove: (index) => {
    return {type: types.REMOVE, payload: index}
  }
}
