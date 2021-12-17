<template>
  <v-list-item :to="{path: $route.path, query: { personal_settings: 'true' } }">
    <v-icon left>mdi-account</v-icon>
    <v-list-item-title>
      {{ $t('personalSettings') }}
    </v-list-item-title>
    <PersonalSettings ref="userSelfSettings" :user="$store.getters.user"></PersonalSettings>
  </v-list-item>
</template>

<script>
import PersonalSettings from '@/components/PersonalSettings.vue';

export default {
  name: 'PersonalSettingsLinkItem',
  components: { PersonalSettings },
  watch: {
    $route(to) {
      console.log(to.query.personal_settings);
      if (to.query.personal_settings === 'true') {
        this.$refs.userSelfSettings.show();
      } else {
        this.$refs.userSelfSettings.close();
      }
    },
  },
};
</script>

<style scoped>

</style>
