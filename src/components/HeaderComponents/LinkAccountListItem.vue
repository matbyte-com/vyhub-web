<template>
  <v-tooltip left :disabled="checkIfCentralAccount()" offset-overflow>
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on" >
        <v-list-item :to="{path: $route.path,
     query: { login: 'true', return_url: getReturnUrl() } }"
                     :disabled="!checkIfCentralAccount()">
          <v-icon left>
            mdi-account-plus
          </v-icon>
          <v-list-item-title>
            {{ $t('link_account') }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </template>
    <span>{{ $t('header.labels.linkAccountTooltip') }}</span>
  </v-tooltip>
</template>

<script>
import UtilService from '@/services/UtilService';

export default {
  name: 'LinkAccountListItem',
  methods: {
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
    checkIfCentralAccount() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.type === 'CENTRAL';
      }
      return false;
    },
  },
};
</script>

<style scoped>

</style>
