import { createStore } from "vuex";

export default createStore({
  state: {
    toggleInvoice: null,
  },
  mutations: {
    TOGGLE_INVOICE: (state) => {
      state.toggleInvoice = !state.toggleInvoice;
    },
  },
  actions: {},
  modules: {},
});
