<template>
    <v-btn text
           v-if="credits !== 0">
      {{ credits }}
      <v-icon right>mdi-circle-multiple</v-icon>
    </v-btn>
</template>

<script>
import ShopService from '@/services/ShopService';

export default {
  name: 'Credits',
  data() {
    return {
      creditAccount: null,
    };
  },
  computed: {
    credits() {
      if (this.$store.getters.creditAccount == null) {
        return 0;
      }

      return this.$store.getters.creditAccount.balance;
    },
  },
  mounted() {
    this.queryData();
  },
  methods: {
    queryData() {
      ShopService.refreshCreditAccount();
    },
  },
};
</script>

<style scoped>

</style>
