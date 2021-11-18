import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { VuexState } from '@/interfaces/vuexState';
import * as api from '../api';
import { Item } from '@/interfaces/item';
import applyFilters from './filterItems';

Vue.use(Vuex);

const displayedItem = 20;

const store: StoreOptions<VuexState> = {
  state: {
    items: [],
    familySearchFilter: '',
    tagSearchFilters: [],
    identifiantFilter: '',
    difficultyFilter: 0,
    necessaryItems: [],
    selectedItems: [],
    searchDrawer: null,
    cartDrawer: null,
    cartlen: 0,
    dialogItem: null,
    dialogcart: false,
    maxDisplayedItems: displayedItem,
  },
  getters: {
    DIALOG_ITEM: (state): unknown => state.dialogItem,
    DIALOG_CART: (state): boolean => state.dialogcart,
    DISPLAYED_ITEMS: (state): Item[] => applyFilters(state),
    SELECTED_ITEMS: (state): Item[] => state.selectedItems,
    NECESSARY_ITEMS: (state): Item[] => state.necessaryItems,
    CART_LEN: (state): number => state.selectedItems.length + state.necessaryItems.length,
    ITEMS: (state): Item[] => state.items,
    SEARCH_DRAWER: (state): unknown => state.searchDrawer,
    CART_DRAWER: (state): unknown => state.cartDrawer,
  },
  mutations: {
    SET_DIALOG_ITEM: (state, item) => {
      state.dialogItem = item;
    },
    SET_DIALOG_CART: (state, value) => {
      state.dialogcart = value;
    },
    SET_ITEMS: (state, items) => {
      state.items = items;
    },
    SET_NECESSARY_ITEMS: (state, items) => {
      state.necessaryItems = items;
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
    SET_FAMILY_FILTER: (state, filter) => {
      state.familySearchFilter = filter;
      state.maxDisplayedItems = displayedItem;
    },
    SET_TAG_FILTERS: (state, filters) => {
      state.tagSearchFilters = filters;
      state.maxDisplayedItems = displayedItem;
    },
    SET_ID_FILTER: (state, filter) => {
      state.identifiantFilter = filter;
      state.maxDisplayedItems = displayedItem;
    },
    SET_DIFFICULTY_FILTER: (state, filter) => {
      state.difficultyFilter = filter;
      state.maxDisplayedItems = displayedItem;
    },
    DELETE_ITEM_TO_CART: (state, item) => {
      state.selectedItems = state.selectedItems.filter((element: Item) => element !== item);
    },
  },
  actions: {
    FETCH_ITEMS: (context): void => {
      const items = api.getAllItems();
      const necessaryItems = items.filter(
        (item: Item) => item.Incontournable && item.Famille !== 'HEBERGEMENT',
      );
      context.commit('SET_ITEMS', items);
      context.commit('SET_NECESSARY_ITEMS', necessaryItems);
    },
    ADD_ITEM_TO_CART: (context, item): void => {
      context.commit('SET_ITEM_TO_CART', item);
    },
    REMOVE_ITEM_TO_CART: (context, item): void => {
      context.commit('DELETE_ITEM_TO_CART', item);
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
    UPDATE_DIALOG_CART: (context, value): void => {
      context.commit('SET_DIALOG_CART', value);
    },
    DISPLAY_MORE_ITEM: (context): void => {
      context.commit('SET_MORE_ITEM');
    },
    UPDATE_FAMILY_SEARCH_FILTER: (context, filter): void => {
      context.commit('SET_FAMILY_FILTER', filter);
    },
    UPDATE_DIFFICULTY_SEARCH_FILTER: (context, filter): void => {
      context.commit('SET_DIFFICULTY_FILTER', filter);
    },
    UPDATE_TAG_SEARCH_FILTERS: (context, filters): void => {
      context.commit('SET_TAG_FILTERS', filters);
    },
    UPDATE_ID_SEARCH_FILTER: (context, filter): void => {
      context.commit('SET_ID_FILTER', filter);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
