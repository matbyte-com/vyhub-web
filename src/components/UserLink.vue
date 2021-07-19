<template>
  <div>
    <v-chip v-if="!disabledLink"
            @click="$router.push({ name: 'UserDashboard', params: {id: user.id}})"
            :outlined="outline" color="primary">
      <v-icon small>mdi-account</v-icon>
      {{ user.username }}
    </v-chip>
    <v-chip v-else
            :outlined="outline" color="primary">
      <v-icon small>mdi-account</v-icon>
      {{ user.username }}
    </v-chip>
  </div>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    user: Object,
    outline: {
      type: Boolean,
      default: true,
    },
    disabledLink: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>

</style>
