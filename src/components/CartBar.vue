<template>
  <v-container fluid pt-5 mt-2>
    <h2 class="ml-3 pt-3">Panier {{ count }}</h2>
    <v-list-item v-for="item in items" :key="item.ID" class="mb-2 mt-2">
      <v-list-item-content>
        <v-list-item-title> {{ item.ID }}</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-btn icon>
          <v-icon color="grey lighten-1">mdi-delete</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-container>
</template>

<script lang="ts">
import store from '@/store';
import { Item } from '@/interfaces/item';

export default {
  computed: {
    // List of selected items.
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    count(): string {
      return store.getters.CART_LEN ? ` (${this.items.length})` : ' (vide)';
    },
  },
};
</script>
