<template>
  <v-app id="inspire">
    <v-navigation-drawer :value="drawer" @input="updateDrawer($event)" app clipped>
      <admin-left-nav-bar />
    </v-navigation-drawer>
    <top-nav-bar />
    <v-container align-start fill-height fluid grid-list-xs class="grey lighten-4">
      <div class="full-width" v-if="shouldDisplayHome">
        <admin-home />
      </div>
      <div class="full-width" v-if="shouldDisplayAddCourse">
        <admin-add-course />
      </div>
    </v-container>
    <footer-bar />
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import AdminLeftNavBar from '@/components/admin/adminLeftNavBar.vue';
import AdminAddCourse from '@/components/admin/adminAddCourse.vue';
import AdminHome from '@/components/admin/adminHome.vue';
import FooterBar from '@/components/footerBar.vue';
import topNavBar from '@/components/topNavBar.vue';
import store from '@/store';
import AdminLeftPanelEnum from '@/models/AdminLeftPanelEnum';

export default Vue.extend({
  name: 'Admin',

  components: {
    AdminLeftNavBar,
    FooterBar,
    topNavBar,
    AdminHome,
    AdminAddCourse,
  },
  computed: {
    drawer(): unknown {
      console.log('admin drawer update', store.getters.DRAWER);
      return store.getters.DRAWER;
    },
    // List of courses.
    adminHomeIndex(): number {
      return store.getters.ADMIN_HOME_INDEX;
    },
    shouldDisplayHome(): boolean {
      return this.adminHomeIndex === AdminLeftPanelEnum.HOME;
    },
    shouldDisplayAddCourse(): boolean {
      return this.adminHomeIndex === AdminLeftPanelEnum.ADD_COURSE;
    },
  },
  methods: {
    updateDrawer(value: boolean): void {
      console.log('oof');
      store.dispatch('UPDATE_DRAWER', value);
    },
  },
});
</script>
