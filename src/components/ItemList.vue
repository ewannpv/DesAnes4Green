<template>
  <v-row>
    <v-col v-for="item in items" :key="item.name" class="mb-2 mt-2" cols="12" sm="6">
      <v-card height="100%">
        <v-card-title primary-title> {{ item.ID }} - {{ item.Recommandation }} </v-card-title>
        <v-card-subtitle>
          {{ item.Justifications }}
        </v-card-subtitle>
        <v-card-text>
          <v-divider></v-divider>
          <v-chip-group active-class="primary--text" column>
            <v-chip
              v-for="tag in getTags(item)"
              :key="tag.name"
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
      </v-card>
    </v-col>
  </v-row>
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
      return store.getters.DISPLAYED_ITEMS;
    },
  },
  methods: {
    getTags(item: Item): Tag[] {
      return getTags(item);
    },
  },
};
</script>
