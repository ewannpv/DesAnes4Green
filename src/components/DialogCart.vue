<template>
  <v-dialog :value="dialogCart" @click:outside="closeDialog()" max-width="70%">
    <v-card>
      <v-card-title>
        <span class="text-h3">Panier</span>
      </v-card-title>
      <v-col cols="12">
        <span class="text-h4 mt-3">Etapes</span>
        <v-row>
          <dialog-item />
          <v-col v-for="item in itemList" :key="item[0]" class="mb-2 mt-2" cols="12" sm="12">
            <v-card color="green lighten-4">
              <v-card-title primary-title> {{ item[0] }} </v-card-title>
              <v-col v-for="child in item[1]" :key="child.ID" class="mb-2 mt-2" cols="12" sm="12">
                <v-card>
                  <v-col class="ma-3">
                    <v-row>ID: {{ child.ID }}</v-row>
                    <v-row>Critère: {{ child.Criteres }}</v-row>
                    <v-row>Tests:</v-row>
                    <v-row
                      ><ul>
                        <li v-for="(test, index) in child.Tests" :key="index">
                          {{ test }}
                        </li>
                      </ul></v-row
                    >
                    <v-row>Indicateurs: {{ child.Indicateurs ? child.Indicateurs : 'N/A' }}</v-row>
                    <v-row
                      ><ul>
                        <li>X: {{ child.Xindicateur ? child.Xindicateur : 'N/A' }}</li>
                        <li>Y: {{ child.Xindicateur ? child.Yindicateur : 'N/A' }}</li>
                      </ul></v-row
                    >
                  </v-col>
                </v-card>
              </v-col>
            </v-card>
          </v-col>
        </v-row>
        <v-row align="center" justify="space-around" v-if="items.length">
          <v-btn centered x-large class="mb-3" rounded dark color="success" @click="loadMoreItem()">
            Afficher
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-row>
      </v-col>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text color="green darken-2" @click="closeDialog()">Fermer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { Item } from '@/interfaces/item';
import * as api from '../api';

export default Vue.extend({
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
    stages(): string[] {
      return api.getAllStages();
    },
    itemList(): unknown[][] {
      const sortedItems: unknown[][] = [];
      const cartItems = this.items.concat(this.necessaryItems);
      this.stages.forEach((stage: string) => {
        const items = cartItems.filter((item: Item) => item.Etape === stage);
        sortedItems.push([stage, items]);
      });
      return sortedItems;
    },
  },
  methods: {
    closeDialog(): void {
      store.dispatch('UPDATE_DIALOG_CART', false);
    },
  },
});
</script>
