<template>
  <v-app id="inspire">
    <v-navigation-drawer :value="drawer" @input="updateDrawer($event)" app clipped>
      <left-nav-bar />
    </v-navigation-drawer>
    <top-nav-bar />
    <v-container align-start fill-height fluid grid-list-xs class="grey lighten-4 main_container">
      <v-row>
        <v-col cols="12" sm="9"> <item-list /> </v-col>

        <v-col cols="12" sm="3" class="divider">
          <cart-list />
        </v-col>
      </v-row>
    </v-container>
    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import ItemList from '@/components/ItemList.vue';
import CartList from '@/components/CartList.vue';

import LeftNavBar from '@/components/LeftNavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
import topNavBar from '@/components/TopNavBar.vue';
import store from '@/store';

export default Vue.extend({
  name: 'Home',

  components: {
    ItemList,
    CartList,
    LeftNavBar,
    FooterBar,
    topNavBar,
  },
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
