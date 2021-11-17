import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { VuexState } from '@/interfaces/vuexState';
import * as api from '../api';
import { Item } from '@/interfaces/item';

Vue.use(Vuex);

const store: StoreOptions<VuexState> = {
  state: {
    items: [],
    familySearchFilter: '',
    tagSearchFilters: [],
    selectedItems: [],
    searchDrawer: null,
    cartDrawer: null,
    cartlen: 0,
    dialogItem: null,
    maxDisplayedItems: 20,
  },
  getters: {
    DIALOG_ITEM: (state): unknown => state.dialogItem,
    DISPLAYED_ITEMS: (state): Item[] => {
      const items = state.items.filter((item) => {
        // Apply family filter.
        if (state.familySearchFilter.length && state.familySearchFilter !== item.Famille) {
          return false;
        }

        // Apply tag filter.
        for (let index = 0; index < state.tagSearchFilters.length; index += 1) {
          if (!item.Tags.includes(state.tagSearchFilters[index])) {
            return false;
          }
        }

        return true;
      });
      console.log(items.length);
      return items.slice(0, state.maxDisplayedItems);
    },
    SELECTED_ITEMS: (state): Item[] => state.selectedItems,
    CART_LEN: (state): number => state.selectedItems.length,
    ITEMS: (state): Item[] => state.items,
    SEARCH_DRAWER: (state): unknown => state.searchDrawer,
    CART_DRAWER: (state): unknown => state.cartDrawer,
  },
  mutations: {
    SET_DIALOG_ITEM: (state, item) => {
      state.dialogItem = item;
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
    SET_MORE_ITEM: (state) => {
      state.maxDisplayedItems += 20;
    },
    SET_ITEM_TO_CART: (state, item) => {
      if (!state.selectedItems.includes(item)) {
        state.selectedItems.push(item);
      }
    },
    SET_FAMILY_FILTER: (state, filtrer) => {
      state.familySearchFilter = filtrer;
    },
    SET_TAG_FILTERS: (state, filtrers) => {
      state.tagSearchFilters = filtrers;
    },
  },
  actions: {
    FETCH_ITEMS: (context): void => {
      const items = api.getAllItems();
      context.commit('SET_ITEMS', items);
    },
    ADD_ITEM_TO_CART: (context, item): void => {
      context.commit('SET_ITEM_TO_CART', item);
    },
    UPDATE_SEARCH_DRAWER: (context, value): void => {
      context.commit('SET_SEARCH_DRAWER', value);
    },
    UPDATE_CART_DRAWER: (context, value): void => {
      context.commit('SET_CART_DRAWER', value);
    },
    UPDATE_DIALOG_ITEM: (context, item): void => {
      context.commit('SET_DIALOG_ITEM', item);
    },
    DISPLAY_MORE_ITEM: (context): void => {
      context.commit('SET_MORE_ITEM');
    },

    UPDATE_FAMILY_SEARCH_FILTER: (context, filtrer): void => {
      context.commit('SET_FAMILY_FILTER', filtrer);
    },
    UPDATE_TAG_SEARCH_FILTERS: (context, filtrers): void => {
      context.commit('SET_TAG_FILTERS', filtrers);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
