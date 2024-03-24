import { createStore } from "vuex";
import db from "../firebase/firebaseInit";
// import { collection } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

export default createStore({
  state: {
    invoicesData: [],
    toggleInvoice: null,
    loading: null,
    modalActive: null,
    invoicesLoaded: null,
    currentInvoiceArray: null,
    editInvoice: null,
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
    SET_INVOICE_DATA(state, payload) {
      state.invoicesData.push(payload);
      // console.log(state.invoicesData);
    },
    INVOICES_LOADED(state) {
      state.invoicesLoaded = true;
    },
    SET_CURRENT_INVOICE(state, payload) {
      state.currentInvoiceArray = state.invoicesData.filter(
        (invoice) => invoice.invoiceId === payload
      );
    },
    TOGGLE_EDIT_INVOICE(state) {
      state.editInvoice = !state.editInvoice;
    },
    DELETE_INVOICE(state, payload) {
      state.invoicesData = state.invoicesData.filter(
        (invoice) => invoice.docId !== payload
      );
    },
  },
  actions: {
    async GET_INVOICES({ commit, state }) {
      const getData = await getDocs(collection(db, "invoices"));

      getData.forEach((doc) => {
        if (!state.invoicesData.some((invoice) => invoice.docId === doc.id)) {
          const data = {
            docId: doc.id,
            invoiceId: doc.data().invoiceId,
            billerStreetAddress: doc.data().billerStreetAddress,
            billerCity: doc.data().billerCity,
            billerZipCode: doc.data().billerZipCode,
            billerCountry: doc.data().billerCountry,
            clientName: doc.data().clientName,
            clientEmail: doc.data().clientEmail,
            clientStreetAddress: doc.data().clientStreetAddress,
            clientCity: doc.data().clientCity,
            clientZipCode: doc.data().clientZipCode,
            clientCountry: doc.data().clientCountry,
            invoiceDateUnix: doc.data().invoiceDateUnix,
            invoiceDate: doc.data().invoiceDate,
            paymentTerms: doc.data().paymentTerms,
            paymentDueDateUnix: doc.data().paymentDueDateUnix,
            paymentDueDate: doc.data().paymentDueDate,
            productDescription: doc.data().productDescription,
            invoiceItemList: doc.data().invoiceItemList,
            invoiceTotal: doc.data().invoiceTotal,
            invoicePending: doc.data().invoicePending,
            invoiceDraft: doc.data().invoiceDraft,
            invoicePaid: doc.data().invoicePaid,
          };
          commit("SET_INVOICE_DATA", data);
        }
      });
      commit("INVOICES_LOADED");
    },
    async UPDATE_INVOICE({ commit, dispatch }, { docId, routeId }) {
      commit("DELETE_INVOICE", docId);
      await dispatch("GET_INVOICES");

      commit("TOGGLE_EDIT_INVOICE");
      commit("TOGGLE_INVOICE");
      commit("SET_CURRENT_INVOICE", routeId);
    },
  },
  modules: {},
});
