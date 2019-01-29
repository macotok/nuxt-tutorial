/* クラシックモード
import Vuex from 'vuex';

export default () => {
  return new Vuex.Store({
    state() {
      return {
        counter: 0,
      }
    }
  });
}
*/

/* モジュールモード
export const state = () => ({
  counter: 0,
});

// store/todos.jsをmerge
new Vuex.Store({
  state: () => ({
    counter: 0
  }),
  modules: {
    namespaced: true,
    todos: {
      state: () => ({
        items: []
      })
    }
  }
});
*/

export const state = () => ({
  user: null,
});

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
