import { createStore } from "vuex";

export default createStore({
  state: {
    toggleInvoice: null,
    loading: null,
    modalActive: null,
  },
  mutations: {
    TOGGLE_INVOICE: (state) => {
      state.toggleInvoice = !state.toggleInvoice;
    },
    LOADING: (state) => {
      state.loading = !state.loading;
    },
    MODAL_TOGGLE(state) {
      state.modalActive = !state.modalActive;
    },
  },
  actions: {},
  modules: {},
});
