<template>
  <div>
    <v-list-item :to="{path: $route.path, query: { personal_settings: 'true' } }">
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
};
</script>

<style scoped>

</style>
