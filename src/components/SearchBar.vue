<template>
  <v-container fluid pt-5 mt-2>
    <v-row>
      <v-col cols="12">
        <h3>Recherche</h3>
        <v-form ref="form" class="mt-4">
          <v-text-field append-icon="mdi-magnify" v-model="nameSearch" label="Nom" dense outlined />
        </v-form>
      </v-col>
      <v-col cols="12">
        <h3>Famille</h3>
        <v-chip-group column label="Family" active-class="primary--text" v-model="familyFilter">
          <v-chip
            outlined
            v-for="family in families"
            :key="family"
            @input="updateFamilyFilter(family)"
          >
            {{ family }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12">
        <h3>Tag</h3>
        <v-chip-group
          column
          v-model="tagFilters"
          label="tags"
          multiple
          active-class="primary--text"
        >
          <v-chip outlined v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import store from '@/store';
import { SearchBarData } from '@/interfaces/searchBarData';

export default {
  data(): SearchBarData {
    return {
      nameSearch: undefined,
      familyFilter: -1,
      tagFilters: [],
      families: ['STRATEGIE', 'FRONTEND', 'BACKEND'],
      tags: ['#USE', '#VALUE', '#METH'],
    };
  },
  watch: {
    familyFilter: 'updateFamilyFilter',
    tagFilters: 'updateTagFilters',
  },
  computed: {},
  methods: {
    updateFamilyFilter(): void {
      store.dispatch(
        'UPDATE_FAMILY_SEARCH_FILTER',
        this.familyFilter !== undefined ? this.families[this.familyFilter] : '',
      );
    },
    updateTagFilters(): void {
      const filters: string[] = [];
      this.tagFilters.forEach((e: number) => filters.push(this.tags[e]));
      store.dispatch('UPDATE_TAG_SEARCH_FILTERS', filters);
    },
  },
};
</script>
