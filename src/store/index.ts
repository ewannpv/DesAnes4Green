import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { VuexState } from '@/interfaces/vuexState';
import * as api from '../api';
import { Item } from '@/interfaces/item';

Vue.use(Vuex);

const store: StoreOptions<VuexState> = {
  state: {
    items: [],
    selectedItems: [],
    drawer: null,
  },
  getters: {
    ITEMS: (state): Item[] => state.items,
    ADMIN_HOME_INDEX: (state): number => state.adminHomeIndex,
    DRAWER: (state): unknown => state.drawer,
  },
  mutations: {
    SET_COURSES: (state, courses) => {
      state.courses = courses;
    },
    SET_SORTED_COURSES: (state, courses) => {
      state.sortedCourses = courses;
    },
    SET_ADMIN_HOME_INDEX: (state, index) => {
      state.adminHomeIndex = index;
    },
    SET_DRAWER: (state, value) => {
      state.drawer = value;
    },
  },
  actions: {
    FETCH_COURSES: (context): void => {
      const courses = api.getAllCourses();
      context.commit('SET_COURSES', courses);
      context.commit('SET_SORTED_COURSES', courses);
    },
    UPDATE_ADMIN_HOME_INDEX: (context, index): void => {
      context.commit('SET_ADMIN_HOME_INDEX', index);
    },
    UPDATE_DRAWER: (context, value): void => {
      context.commit('SET_DRAWER', value);
    },
  },
  modules: {},
};

export default new Vuex.Store<VuexState>(store);
