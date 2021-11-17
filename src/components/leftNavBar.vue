<template>
  <v-container fluid pt-5 mt-2>
    <v-row>
      <v-col cols="12">
        <h3>Recherche</h3>
        <v-form ref="form" class="mt-4">
          <v-text-field
            append-icon="mdi-magnify"
            v-model="nameSearch"
            label="Cours"
            dense
            outlined
          />
        </v-form>
      </v-col>
      <v-col cols="12">
        <h3>
          Période
        </h3>
        <v-chip-group column label="Semestre" multiple active-class="primary--text">
          <v-chip filter outlined v-for="period in periods" :key="period">
            {{ period }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12">
        <h3>
          Compétence
        </h3>
        <v-chip-group column label="skills" multiple active-class="primary--text">
          <v-chip filter outlined v-for="skill in skills" :key="skill">
            {{ skill }}
          </v-chip>
        </v-chip-group>
      </v-col>
      <v-col cols="12">
        <h3>
          Langage
        </h3>
        <v-chip-group column label="langage" multiple active-class="primary--text">
          <v-chip filter outlined v-for="language in languages" :key="language">
            {{ language }}
          </v-chip>
        </v-chip-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
export default {
  computed: {
    select(): string[] {
      return ['Semestre 3', 'Java'];
    },
    languages(): string[] {
      return ['C', 'C++', 'C#', '.NET', 'JAVA', 'Swift', 'Kotlin', 'JavaScript', 'Node', 'React'];
    },
    skills(): string[] {
      return ['Algorithme', 'Mathematiques', 'UML', 'Game Design', 'Marketing'];
    },
    periods(): string[] {
      return ['Semestre 1', 'Semestre 2', 'Semestre 3', 'Semestre 4', 'Semestre 5', 'Semestre 6'];
    },
  },
};
</script>
