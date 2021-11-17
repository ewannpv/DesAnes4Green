<template>
<v-col>
  <v-card v-for="course in courses" :key="course.name" class="mb-2 mt-2">
    <v-card-title primary-title>
      {{course.name}}
    </v-card-title>
    <v-card-subtitle>
      {{course.shortDescription}}
    </v-card-subtitle>
    <v-card-text>
      <v-chip-group active-class="primary--text" column>
        <v-chip v-for="tag in getTags(course)" :key="tag.name" v-bind:color="tag.color">
          {{ tag.name }}
        </v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</v-col>
</template>

<script lang="ts">
import {
  Course,
  getTags,
} from '@/interfaces/course';
import store from '@/store';
import {
  Tag,
} from '@/interfaces/tag';

export default {
  mounted(): void {
    store.dispatch('FETCH_COURSES');
  },
  computed: {
    // List of courses.
    courses(): Course[] {
      return store.getters.COURSES;
    },
  },
  methods: {
    getTags(course: Course): Tag[] {
      return getTags(course);
    },
  },
};
</script>
