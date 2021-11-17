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
    searchDrawer: null,
    cartDrawer: null,
    cartlen: 0,
  },
  getters: {
    DISPLAYED_ITEMS: (state): Item[] => state.displayedItems,
    SELECTED_ITEMS: (state): Item[] => state.selectedItems,
    CART_LEN: (state): number => state.selectedItems.length,
    ITEMS: (state): Item[] => state.items,
    SEARCH_DRAWER: (state): unknown => state.searchDrawer,
    CART_DRAWER: (state): unknown => state.cartDrawer,
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
    },
    SET_SEARCH_DRAWER: (state, value) => {
      state.searchDrawer = value;
    },
    SET_CART_DRAWER: (state, value) => {
      state.cartDrawer = value;
    },
    SET_NEW_SELECTED_ITEM: (state, item) => {
      state.selectedItems.concat(item);
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
    UPDATE_SEARCH_DRAWER: (context, value): void => {
      context.commit('SET_SEARCH_DRAWER', value);
    },
    UPDATE_CART_DRAWER: (context, value): void => {
      context.commit('SET_CART_DRAWER', value);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
