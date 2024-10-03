<template>
  <div>
    <v-list-item
      :to="{path: $route.path,
            query: { login: 'true', return_url: getReturnUrl() } }"
    >
      <v-list-item-title>
        <v-icon start>
          mdi-account-plus
        </v-icon>
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
