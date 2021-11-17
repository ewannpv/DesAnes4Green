<template>
  <v-app id="inspire">
    <v-navigation-drawer :value="drawer" @input="updateDrawer($event)" app clipped>
      <left-nav-bar />
    </v-navigation-drawer>
    <top-nav-bar />
    <v-container align-start fill-height fluid grid-list-xs class="grey lighten-4">
      <course-list />
    </v-container>
    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import CourseList from '@/components/courseList.vue';
import LeftNavBar from '@/components/leftNavBar.vue';
import FooterBar from '@/components/footerBar.vue';
import topNavBar from '@/components/topNavBar.vue';
import store from '@/store';

export default Vue.extend({
  name: 'Home',

  components: {
    CourseList,
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
