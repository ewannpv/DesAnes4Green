<template>
  <v-footer padless absolute fluid>
    <v-card flat tile class="full-width grey lighten-5 text-center">
      <v-card-text> {{ new Date().getFullYear() }} — <strong>EPITA</strong> </v-card-text>
    </v-card>
  </v-footer>
</template>

<script lang="ts">
export default {
  computed: {},
};
</script>
