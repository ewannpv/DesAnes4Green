<template>
  <v-container fluid pt-5 mt-2>
    <h2 class="ml-3 pt-3">Panier {{ count }}</h2>

    <v-list dense>
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-content>
          <v-list-item-title v-text="item.ID"></v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
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
