<template>
  <span>
    <v-chip v-if="!disabledLink && !simple" :small="small"
            @click="$router.push({ name: 'UserDashboard', params: {id: user.id}})"
            :outlined="isOutlined" color="primary">
      <v-icon small>mdi-account</v-icon>
      {{ user.username }}
    </v-chip>
    <v-chip v-if="disabledLink && !simple" :small="small"
            :outlined="outline" color="primary">
      <v-icon small>mdi-account</v-icon>
      {{ user.username }}
    </v-chip>
    <span v-if="simple">
      <v-icon small>mdi-account</v-icon>
      <router-link
        :to="{ name: 'UserDashboard', params: {id: user.id}}">{{ user.username }}</router-link>
    </span>
  </span>
</template>

<script>
export default {
  name: 'UserLink',
  props: {
    user: Object,
    outline: {
      type: Boolean,
      default: null,
    },
    disabledLink: {
      type: Boolean,
      default: false,
    },
    simple: {
      type: Boolean,
      default: false,
    },
    small: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isOutlined() {
      if (this.outline == null) {
        return !this.$vuetify.theme.dark;
      }
      return this.outline;
    },
  },
};
</script>

<style scoped>

</style>
