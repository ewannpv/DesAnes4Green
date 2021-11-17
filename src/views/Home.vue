<template>
  <v-app id="inspire">
    <v-navigation-drawer :value="searchDrawer" @input="updateSearchDrawer($event)" app clipped>
      <search-bar />
    </v-navigation-drawer>
    <v-navigation-drawer :value="cartDrawer" @input="updateCardhDrawer($event)" app clipped right>
      <cart-bar />
    </v-navigation-drawer>
    <top-nav-bar />
    <v-container align-start fill-height fluid grid-list-xs class="grey lighten-4 main_container">
      <item-list />
    </v-container>

    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemList from '@/components/ItemList.vue';
import CartBar from '@/components/CartBar.vue';

import SearchBar from '@/components/SearchBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import topNavBar from '@/components/TopNavBar.vue';
import store from '@/store';

export default Vue.extend({
  name: 'Home',

  components: {
    ItemList,
    CartBar,
    SearchBar,
    FooterBar,
    topNavBar,
  },
  computed: {
    searchDrawer(): unknown {
      return store.getters.SEARCH_DRAWER;
    },
    cartDrawer(): unknown {
      return store.getters.CART_DRAWER;
    },
  },
  methods: {
    updateSearchDrawer(value: boolean): void {
      store.dispatch('UPDATE_SEARCH_DRAWER', value);
    },
    updateCardhDrawer(value: boolean): void {
      store.dispatch('UPDATE_CART_DRAWER', value);
    },
  },
});
</script>

<style scoped>
.main_container {
  margin-bottom: 64px;
}
</style>
