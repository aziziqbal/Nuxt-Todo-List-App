export const state = () => ({
  list: [],
  total: 0
})
export const mutations = {
  update (state, data) {
    console.log('adsa')
    state.list = data
    console.log('list:', state.list)
  },
  add (state, data) {
    state.list.push({
      data
    })
  },
  add2 (state, data) {
    console.log(data)
    const name = data.name
    const disable = true
    const edit = true
    const status = false
    state.list[data.indexlist].data.list.push({
      name,
      disable,
      edit,
      status
    })
  },
  edit (state, data) {
    for (let i = 0; i < state.list.length; i++) {
      for (let y = 0; y < state.list[i].data.list.length; y++) {
        if (state.list[i].data.list[y].name === data) {
          if (state.list[i].data.list[y].status === true) {
            state.list[i].data.list[y].status = false
            if (state.list[i].data.active >= 0) {
              state.list[i].data.active = state.list[i].data.active - 1
            }
            state.total = state.total - 1
          } else {
            state.list[i].data.list[y].status = true
            if (state.list[i].data.active >= 0) {
              state.list[i].data.active = state.list[i].data.active + 1
            }
            state.total = state.total + 1
          }
        }
      }
    }
  },
  checkall (state, data) {
    for (let i = 0; i < state.list.length; i++) {
      for (let y = 0; y < state.list[i].data.list.length; y++) {
        state.list[i].data.list[y].status = true
        state.total = state.list[i].data.list.length * state.list.length
        state.list[i].data.active = state.list[i].data.list.length
      }
    }
  },

  checklistall (state, data) {
    for (let y = 0; y < state.list[data].data.list.length; y++) {
      console.log(state.list[data].data.list[y].status)
      if (state.list[data].data.list[y].status === false) {
        state.list[data].data.list[y].status = true
        state.list[data].data.active = state.list[data].data.list.length
      }
    }
  },
  checklist (state, data) {
    for (let y = 0; y < state.list[data].data.list.length; y++) {
      console.log(state.list[data].data.list[y].status)
      if (state.list[data].data.list[y].status === false) {
        state.list[data].data.list[y].status = true
        state.list[data].data.active = state.list[data].data.list.length
      }
    }
  },
  remove (state, { todo }) {
    state.list.splice(state.list.indexOf(todo), 1)
  },
  remove1 (state, todo) {
    for (let i = 0; i < state.list.length; i++) {
      for (let y = 0; y < state.list[i].data.list.length; y++) {
        if (state.list[i].data.list[y] === todo) {
          state.list[i].data.list.splice(y, 1)
          state.total = state.list[i].data.list.length * state.list.length
          state.list[i].data.active = state.list[i].data.list.length
        }
      }
    }
  },
  toggle (state, todo) {
    todo.done = !todo.done
  }
}
