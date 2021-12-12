<template>
  <div>
    <v-list-item :to="{path: $route.path,
 query: { login: 'true', return_url: getReturnUrl() } }"
                 >
      <v-icon left>
        mdi-account-plus
      </v-icon>
      <v-list-item-title>
        {{ $t('link_account') }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import UtilService from '@/services/UtilService';

export default {
  name: 'LinkAccountListItem',
  methods: {
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
  },
};
</script>

<style scoped>

</style>
