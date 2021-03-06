<template>
  <v-container fluid pt-5 mt-2>
    <v-row>
      <v-col cols="12">
        <h3>Recherche</h3>
        <v-form ref="form" class="mt-4" @submit.prevent>
          <v-text-field
            append-icon="mdi-magnify"
            v-model="identifiantFilter"
            label="Identifiant"
            dense
            outlined
          />
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
        <h3>Difficulté</h3>
        <v-chip-group column label="Family" active-class="primary--text" v-model="difficultyFilter">
          <v-chip
            outlined
            v-for="difficulty in difficulties"
            :key="difficulty"
            @input="updateDifficultyFilter(family)"
          >
            {{ difficulty }}
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
import Vue from 'vue';
import store from '@/store';
import { SearchBarData } from '@/interfaces/searchBarData';
import * as api from '../api';

export default Vue.extend({
  data(): SearchBarData {
    return {
      identifiantFilter: '',
      familyFilter: -1,
      difficultyFilter: -1,
      tagFilters: [],
      families: api.getFamilyNames(),
      tags: api.getAllItemTags(),
      difficulties: ['★', '★★', '★★★'],
    };
  },
  watch: {
    familyFilter: 'updateFamilyFilter',
    tagFilters: 'updateTagFilters',
    identifiantFilter: 'updateIdentifiantFilter',
    difficultyFilter: 'updateDifficultyFilter',
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
    updateIdentifiantFilter(): void {
      store.dispatch('UPDATE_ID_SEARCH_FILTER', this.identifiantFilter);
    },
    updateDifficultyFilter(): void {
      store.dispatch(
        'UPDATE_DIFFICULTY_SEARCH_FILTER',
        this.difficultyFilter !== undefined ? this.difficulties[this.difficultyFilter].length : 0,
      );
    },
  },
});
</script>
