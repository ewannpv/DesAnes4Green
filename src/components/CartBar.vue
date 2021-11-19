<template>
  <v-container fluid pt-5 mt-2>
    <dialog-cart />
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
          <v-list-item-action>
            <v-row>
              <v-btn icon @click="displayItem(child)">
                <v-icon color="grey lighten-1">mdi-information</v-icon>
              </v-btn>
              <v-btn v-if="listItem.title == 'Autres'" icon @click="removeItem(child)">
                <v-icon color="grey lighten-1">mdi-delete-empty</v-icon>
              </v-btn>
            </v-row>
          </v-list-item-action>
        </v-list-item>
      </v-list-group>
    </v-list>
    <v-row align="center" class="mt-3" justify="space-around">
      <v-btn centered large dark color="success" @click.stop="displayCart()">
        Voir le panier
        <v-icon> mdi-cart-outline </v-icon>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Item } from '@/interfaces/item';
import DialogCart from './DialogCart.vue';

export default Vue.extend({
  components: { DialogCart },
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
  methods: {
    displayItem(item: Item): void {
      store.dispatch('UPDATE_DIALOG_ITEM', item);
    },
    removeItem(item: Item): void {
      store.dispatch('REMOVE_ITEM_TO_CART', item);
    },
    displayCart(): void {
      console.log('oof');
      store.dispatch('UPDATE_DIALOG_CART', true);
    },
  },
});
</script>
