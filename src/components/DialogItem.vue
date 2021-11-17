<template>
  <v-dialog :value="dialogItem" @click:outside="closeDialog()" max-width="600px">
    <v-card v-if="dialogItem">
      <v-card-title>
        <span class="text-h5">{{ dialogItem.ID }} - {{ dialogItem.Recommandation }}</span>
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
        <v-btn text color="light-blue darken-3" @click="AddToCart()">Ajouter au panier</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import store from '@/store';
import { Item } from '@/interfaces/item';

export default {
  computed: {
    dialogItem(): Item {
      return store.getters.DIALOG_ITEM;
    },
  },
  methods: {
    closeDialog(): void {
      store.dispatch('UPDATE_DIALOG_ITEM', null);
    },
    AddToCart(): void {
      store.dispatch('ADD_ITEM_TO_CART', store.getters.DIALOG_ITEM);
      this.closeDialog();
    },
  },
};
</script>
