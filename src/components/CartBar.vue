<template>
  <v-container fluid pt-5 mt-2>
    <h2 class="ml-3 pt-3">Panier {{ count }}</h2>
    <v-list>
      <v-list-group
        v-for="listItem in listGroup"
        :key="listItem.title"
        v-model="listItem.active"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="listItem.title"></v-list-item-title>
            <v-list-item-subtitle v-text="listItem.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
        </template>
        <v-list-item v-for="child in listItem.items" :key="child.title">
          <v-list-item-content>
            <v-list-item-title v-text="child.ID"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Item } from '@/interfaces/item';

export default Vue.extend({
  computed: {
    // List of selected items.
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    necessaryItems(): Item[] {
      return store.getters.NECESSARY_ITEMS;
    },
    count(): string {
      return ` (${store.getters.CART_LEN})`;
    },
    listGroup() {
      return [
        {
          items: store.getters.NECESSARY_ITEMS,
          title: 'Incontournables',
          subtitle: `Elements: ${store.getters.NECESSARY_ITEMS.length}`,
        },
        {
          items: store.getters.SELECTED_ITEMS,
          title: 'Autres',
          subtitle: `Elements: ${store.getters.SELECTED_ITEMS.length}`,
        },
      ];
    },
  },
});
</script>
