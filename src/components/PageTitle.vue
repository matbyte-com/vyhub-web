<template>
  <div class="mb-3">
    <v-row justify="center">
      <v-col lg="3" md="4" sm="6">
        <v-card>
          <v-card-text class="text-center">
            <h4 class="text-h4">{{ title }}<slot></slot></h4>
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
  },
};
</script>

<style scoped>

</style>
