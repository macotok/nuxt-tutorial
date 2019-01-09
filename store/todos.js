/* モジュールモード
export const state = () => ({
  items: []
});

// store/index.jsをmerge
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
