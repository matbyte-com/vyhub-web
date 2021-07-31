<template>
  <div class="mb-3">
    <v-row>
      <v-col cols="12" class="d-flex">
        <v-card class="">
          <v-card-text class="text-left text-h4 d-flex align-center pa-3">
            <v-icon color="primary" x-large v-if="icon != null" class="mr-1">{{ icon }}</v-icon>
            <v-sheet vertical color="primary" width="5" :height="dividerHeight" class="">
            </v-sheet>
            <span class="ml-4">
              <h1 class="text-h4">{{ title }}<slot></slot></h1>
              <div class="subtitle-1" v-if="subtitle != null">{{ subtitle }}</div>
            </span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',
  props: {
    title: String,
    icon: String,
    subtitle: String,
  },
  computed: {
    dividerHeight() {
      if (this.subtitle == null) {
        return 45;
      }

      return 58;
    },
  },
};
</script>

<style scoped>

</style>
