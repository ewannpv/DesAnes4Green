<template>
  <v-dialog :value="dialogCart" @click:outside="closeDialog()" max-width="600px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Panier</span>
      </v-card-title>
      <v-card-text>TODO</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import store from '@/store';
import { Item } from '@/interfaces/item';

export default {
  computed: {
    dialogCart(): boolean {
      return store.getters.DIALOG_CART;
    },
    items(): Item[] {
      return store.getters.SELECTED_ITEMS;
    },
    necessaryItems(): Item[] {
      return store.getters.NECESSARY_ITEMS;
    },
  },
  methods: {
    closeDialog(): void {
      store.dispatch('UPDATE_DIALOG_CART', false);
    },
  },
};
</script>
