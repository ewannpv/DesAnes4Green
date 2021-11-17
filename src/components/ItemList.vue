<template>
  <div>
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
            <v-chip-group active-class="primary--text" column>
              <v-chip
                v-for="(tag, index) in getTags(item)"
                :key="tagKey(item.ID, tag.name, index)"
                v-bind:color="tag.color"
                text-color="white"
                label
                class="font-weight-bold"
              >
                <v-icon left v-if="tag.icon"> {{ tag.icon }} </v-icon>
                {{ tag.name }}
              </v-chip>
            </v-chip-group>
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
    <v-row align="center" justify="space-around">
      <v-btn centered x-large class="mb-3" rounded dark color="success" @click="loadMoreItem()">
        Afficher
        <v-icon> mdi-plus </v-icon>
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts">
import store from '@/store';
import { getTags, Item } from '@/interfaces/item';
import { Tag } from '@/interfaces/tag';
import DialogItem from '@/components/DialogItem.vue';

export default {
  components: {
    DialogItem,
  },
  data(): unknown {
    return {
      dialogShowed: false,
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
      store.dispatch('ADD_ITEM_TO_CART', item);
    },
    loadMoreItem(): void {
      store.dispatch('DISPLAY_MORE_ITEM');
    },
    tagKey(item: string, tag: string, index: string): string {
      return `${item}_${tag}_${index}`;
    },
  },
};
</script>
