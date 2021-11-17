<template>
  <v-app-bar
    app
    class="headerBAr"
    dark
    clipped-left
    :src="require('@/assets/images/banner-1050629_1920.jpg')"
  >
    <v-app-bar-nav-icon @click.stop="updateDrawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <h2>Atlas</h2>
    </v-toolbar-title>
    <v-spacer></v-spacer>

    <v-menu bottom left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" @click="updateSelectedItem(item.id)">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import TopNavBarEnum from '@/models/topNavBarEnum';
import router from '@/router';
import store from '@/store';

export default {
  computed: {
    items(): {
      title: string;
      id: number;
    }[] {
      return [
        { title: 'Acceuil', id: TopNavBarEnum.HOME },

        { title: 'Panel Admin', id: TopNavBarEnum.ADMIN_PANEL },
        { title: 'Se Deconnecter', id: TopNavBarEnum.LOGOUT },
      ];
    },
  },
  methods: {
    updateDrawer(): void {
      store.dispatch('UPDATE_DRAWER', !store.getters.DRAWER);
    },
    updateSelectedItem(id: number): void {
      if (id === TopNavBarEnum.HOME) {
        router.push({ path: '/' });
      } else if (id === TopNavBarEnum.ADMIN_PANEL) {
        router.push({ path: 'admin' });
      } else if (id === TopNavBarEnum.LOGOUT) {
        router.push({ path: 'login' });
      }
    },
  },
};
</script>
