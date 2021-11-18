<template>
  <v-app-bar
    app
    class="headerBAr"
    dark
    clipped-left
    :src="require('@/assets/images/banner-1050629_1920.jpg')"
  >
    <v-app-bar-nav-icon @click.stop="updateSearchDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h2>DesAnes4Green</h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-btn icon class="mr-1" @click.stop="updateCartDrawer">
      <v-badge color="green darken-4" :content="cartLen">
        <v-icon>mdi-cart-outline</v-icon>
      </v-badge>
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import store from '@/store';
import { Item } from '@/interfaces/item';

export default {
  computed: {
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    cartLen(): string {
      return this.items.length.toString();
    },
  },
  methods: {
    updateSearchDrawer(): void {
      console.log('oof');
      store.dispatch('UPDATE_SEARCH_DRAWER', !store.getters.SEARCH_DRAWER);
    },
    updateCartDrawer(): void {
      store.dispatch('UPDATE_CART_DRAWER', !store.getters.CART_DRAWER);
    },
  },
};
</script>

<style scoped>
.headerBAr {
  width: 100%;
}
</style>
