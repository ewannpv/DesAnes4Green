<template>
  <v-dialog :value="dialogItem" @click:outside="closeDialog()" max-width="70%">
    <v-card v-if="dialogItem">
      <v-card-title>
        <span class="text-h5">{{ dialogItem.ID }} - {{ dialogItem.Recommandation }}</span>
      </v-card-title>
      <v-card-text>{{ dialogItem.Justifications }}</v-card-text>
      <v-card-text> <strong>Criteres :</strong> {{ dialogItem.Criteres }} </v-card-text>
      <v-card-text> <strong>Difficulté :</strong> {{ dialogItem.Difficulte }} </v-card-text>
      <v-card-text>
        <strong>Prosperité :</strong>
        <v-chip
          :color="getPropertyForItem(dialogItem).color"
          text-color="white"
          label
          class="font-weight-bold ma-1"
          >{{ dialogItem.Prosperity }}
        </v-chip>
      </v-card-text>
      <v-card-text>
        <strong>People :</strong>
        <v-chip
          :color="getPeopleForItem(dialogItem).color"
          text-color="white"
          label
          class="font-weight-bold ma-1"
          >{{ dialogItem.People }}
        </v-chip>
      </v-card-text>
      <v-card-text>
        <strong>Planette :</strong>
        <v-chip
          :color="getPlanetForItem(dialogItem).color"
          text-color="white"
          label
          class="font-weight-bold ma-1"
          >{{ dialogItem.Planet }}
        </v-chip>
      </v-card-text>
      <v-card-text
        ><strong>Tests :</strong>
        <li class="ml-3" v-for="item in dialogItem.Tests" :key="item">{{ item }}</li>
      </v-card-text>
      <v-card-text
        ><strong>Acteurs :</strong>
        <li class="ml-3" v-for="item in dialogItem.Acteurs" :key="item">{{ item }}</li>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
        <v-btn text color="light-blue darken-3" @click="addToCart()">Ajouter au panier</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import store from '@/store';
import { getRatedTag, Item } from '@/interfaces/item';
import { Tag } from '@/interfaces/tag';

export default {
  computed: {
    dialogItem(): Item {
      console.log(store.getters.DIALOG_ITEM);
      return store.getters.DIALOG_ITEM;
    },
  },
  methods: {
    closeDialog(): void {
      store.dispatch('UPDATE_DIALOG_ITEM', null);
    },
    addToCart(): void {
      store.dispatch('ADD_ITEM_TO_CART', store.getters.DIALOG_ITEM);
      this.closeDialog();
    },
    getPropertyForItem(item: Item): Tag {
      return getRatedTag('mdi-cards-heart', item.Prosperity);
    },
    getPeopleForItem(item: Item): Tag {
      return getRatedTag('mdi-account-group', item.People);
    },
    getPlanetForItem(item: Item): Tag {
      return getRatedTag('mdi-earth', item.Planet);
    },
  },
};
</script>
