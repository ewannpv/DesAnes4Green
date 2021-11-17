<template>
  <v-app-bar
    app
    class="headerBAr"
    dark
    clipped-left
    :src="require('@/assets/images/banner-1050629_1920.jpg')"
  >
    <v-app-bar-nav-icon @click.stop="updateDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h2>DesAnesForGreen</h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on" class="mr-1" @click="openCart()">
          <v-badge color="green darken-4" :content="cartLen">
            <v-icon>mdi-cart-outline</v-icon>
          </v-badge>
        </v-btn>
      </template>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import store from '@/store';
import router from '@/router';
import { Item } from '@/interfaces/item';

export default {
  computed: {
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    cartLen(): number {
      return store.getters.CART_LEN;
    },
  },
  methods: {
    updateDrawer(): void {
      store.dispatch('UPDATE_DRAWER', !store.getters.DRAWER);
    },
    openCart(): void {
      router.push({ path: '/cart' });
    },
  },
};
</script>
