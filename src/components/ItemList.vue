<template>
  <v-col>
    <v-card v-for="item in items" :key="item.name" class="mb-2 mt-2">
      <v-card-title primary-title>
        {{ item.name }}
      </v-card-title>
      <v-card-subtitle>
        {{ item.shortDescription }}
      </v-card-subtitle>
      <v-card-text>
        <v-chip-group active-class="primary--text" column>
          <v-chip v-for="tag in getTags(item)" :key="tag.name" v-bind:color="tag.color">
            {{ tag.name }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script lang="ts">
import store from '@/store';
import { getTags, Item } from '@/interfaces/item';
import { Tag } from '@/interfaces/tag';

export default {
  mounted(): void {
    store.dispatch('FETCH_ITEMS');
  },
  computed: {
    // List of items.
    items(): Item[] {
      return store.getters.ITEMS;
    },
  },
  methods: {
    getTags(item: Item): Tag[] {
      return getTags(item);
    },
  },
};
</script>
