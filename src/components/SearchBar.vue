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
        <v-chip-group column label="Semestre" multiple active-class="primary--text">
          <v-chip filter outlined v-for="family in families" :key="family">
            {{ family }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12">
        <h3>Tag</h3>
        <v-chip-group column label="skills" multiple active-class="primary--text">
          <v-chip filter outlined v-for="tag in tags" :key="tag">
            {{ tag }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  computed: {
    families(): string[] {
      return ['Fam 1', 'Fam 2'];
    },
    tags(): string[] {
      return ['Tag 1', 'Tag 2'];
    },
  },
};
</script>
