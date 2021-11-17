<template>
  <v-col>
    <v-card>
      <h2 class="ml-3 pt-3">Panier {{ count }}</h2>
      <v-list-item v-for="item in items" :key="item.name" class="mb-2 mt-2">
        <v-list-item-content>
          <v-list-item-title> {{ item.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-card>
  </v-col>
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
