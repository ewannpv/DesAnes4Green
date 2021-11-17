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
  },
  getters: {
    DISPLAYED_ITEMS: (state): Item[] => state.displayedItems,
    SELECTED_ITEMS: (state): Item[] => state.selectedItems,
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
    },
    SET_DRAWER: (state, value) => {
      state.drawer = value;
    },
  },
  actions: {
    FETCH_ITEMS: (context): void => {
      const items = api.getAllItems();
      context.commit('SET_DISPLAYED_ITEMS', items);
      context.commit('SET_SELECTED_ITEMS', items);
      context.commit('SET_ITEMS', items);
    },
    UPDATE_DRAWER: (context, value): void => {
      context.commit('SET_DRAWER', value);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
