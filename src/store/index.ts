import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { VuexState } from '@/interfaces/vuexState';
import * as api from '../api';
import { Item } from '@/interfaces/item';

Vue.use(Vuex);

const store: StoreOptions<VuexState> = {
  state: {
    items: [],
    displayedItems: [],
    selectedItems: [],
    drawer: null,
    cartlen: 0,
  },
  getters: {
    DISPLAYED_ITEMS: (state): Item[] => state.displayedItems,
    SELECTED_ITEMS: (state): Item[] => state.selectedItems,
    CART_LEN: (state): number => state.cartlen,
    ITEMS: (state): Item[] => state.items,
    DRAWER: (state): unknown => state.drawer,
  },
  mutations: {
    SET_DISPLAYED_ITEMS: (state, items) => {
      state.displayedItems = items;
    },
    SET_ITEMS: (state, items) => {
      state.items = items;
    },
    SET_SELECTED_ITEMS: (state, items) => {
      state.selectedItems = items;
      state.cartlen = state.selectedItems.length;
    },
    SET_DRAWER: (state, value) => {
      state.drawer = value;
    },
    SET_NEW_SELECTED_ITEM: (state, item) => {
      state.selectedItems.concat(item);
      state.cartlen = state.selectedItems.length;
    },
  },
  actions: {
    FETCH_ITEMS: (context): void => {
      const items = api.getAllItems();
      context.commit('SET_DISPLAYED_ITEMS', items);
      context.commit('SET_SELECTED_ITEMS', items);
      context.commit('SET_ITEMS', items);
    },
    ADD_SELECTED_ITEMS: (context, item): void => {
      context.commit('SET_NEW_SELECTED_ITEM', item);
    },
    UPDATE_SELECTED_ITEMS: (context, items): void => {
      context.commit('SET_NEW_SELECTED_ITEM', items);
    },
    UPDATE_DRAWER: (context, value): void => {
      context.commit('SET_DRAWER', value);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
