<template>
  <v-app id="inspire">
    <top-nav-bar />
    <v-container align-start fill-height fluid grid-list-xs class="grey lighten-4 main_container">
      TODO
    </v-container>
    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import store from '@/store';

export default Vue.extend({
  name: 'Carte',

  components: {},
  computed: {
    drawer(): unknown {
      return store.getters.DRAWER;
    },
  },
  methods: {
    updateDrawer(value: boolean): void {
      store.dispatch('UPDATE_DRAWER', value);
    },
  },
});
</script>

<style scoped>
.main_container {
  margin-bottom: 32px;
}
</style>
