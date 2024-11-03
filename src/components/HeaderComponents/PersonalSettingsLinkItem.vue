<template>
  <div>
    <v-list-item @click="openPersonalSettings">
      <v-list-item-title>
        <v-icon start>
          mdi-account
        </v-icon>
        {{ $t('personalSettings') }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'PersonalSettingsLinkItem',
  methods: {
    openPersonalSettings() {
      if (this.$store.getters.generalConfig.shop_only) {
        this.$router.push({ name: 'StorePersonalSettings'});
      } else {
        this.$router.push({ path: this.$route.path, query: { personal_settings: 'true' } });
      }
    },
  }
};
</script>

<style scoped>

</style>
