<template>
  <v-col cols="12">
    <v-row>
      <dialog-item />
      <v-col v-for="item in items" :key="item.name" class="mb-2 mt-2" cols="12" sm="6">
        <v-card>
          <v-card-title primary-title> {{ item.ID }} - {{ item.Recommandation }} </v-card-title>
          <v-card-subtitle>
            {{ item.Justifications }}
          </v-card-subtitle>
          <v-card-text>
            <v-divider></v-divider>
            <v-chip
              v-for="(tag, index) in getTags(item)"
              :key="tagKey(item.ID, tag.name, index)"
              :color="tag.color"
              text-color="white"
              label
              class="font-weight-bold ma-1"
            >
              <v-icon left v-if="tag.icon"> {{ tag.icon }} </v-icon>
              {{ tag.name }}
            </v-chip>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="green darken-2" @click="displayItem(item)">Details</v-btn>
            <v-btn text color="light-blue darken-3" @click="addToCart(item)"
              >Ajouter au panier</v-btn
            >
          </v-card-actions>
          <v-spacer></v-spacer>
        </v-card>
      </v-col>
    </v-row>
    <v-row align="center" justify="space-around" v-if="items.length">
      <v-btn centered x-large class="mb-3" rounded dark color="success" @click="loadMoreItem()">
        Afficher
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-snackbar v-if="succed" v-model="snackbar" :timeout="timeout" dark color="green lighten-1">
      <b>{{ text }}</b>
    </v-snackbar>
    <v-snackbar
      v-else
      v-model="snackbar"
      :timeout="timeout"
      dark
      color="orange darken-2
"
    >
      <b>{{ text }}</b>
    </v-snackbar>
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';
import { getTags, Item } from '@/interfaces/item';
import { Tag } from '@/interfaces/tag';
import DialogItem from '@/components/DialogItem.vue';

export default Vue.extend({
  components: {
    DialogItem,
  },
  data(): {
    dialogShowed: boolean;
    snackbar: boolean;
    text: string;
    succed: boolean;
    timeout: number;
    } {
    return {
      dialogShowed: false,
      snackbar: false,
      text: '',
      succed: false,
      timeout: 1500,
    };
  },
  mounted(): void {
    store.dispatch('FETCH_ITEMS');
  },
  computed: {
    // List of items.
    items(): Item[] {
      return store.getters.DISPLAYED_ITEMS;
    },
  },
  methods: {
    getTags(item: Item): Tag[] {
      return getTags(item);
    },
    displayItem(item: Item): void {
      store.dispatch('UPDATE_DIALOG_ITEM', item);
    },
    addToCart(item: Item): void {
      if (
        store.getters.NECESSARY_ITEMS.includes(item)
        || store.getters.SELECTED_ITEMS.includes(item)
      ) {
        this.text = 'Cet élément est déjà dans votre panier';
        this.succed = false;
        this.snackbar = true;
        return;
      }
      store.dispatch('ADD_ITEM_TO_CART', item);
      this.text = "Cet élément vient d'être ajouté dans votre panier";
      this.succed = true;
      this.snackbar = true;
    },
    loadMoreItem(): void {
      store.dispatch('DISPLAY_MORE_ITEM');
    },
    tagKey(item: string, tag: string, index: string): string {
      return `${item}_${tag}_${index}`;
    },
  },
});
</script>
