<template>
  <div v-if="credits !== 0">
    <v-btn text v-if="!listItem">
      {{ credits }}
      <v-icon right>mdi-circle-multiple</v-icon>
    </v-btn>
    <v-list-item v-else>
      <v-icon left>
        mdi-circle-multiple
      </v-icon>
      <v-list-item-title>
        {{ credits }}
      </v-list-item-title>
    </v-list-item>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService';

export default {
  name: 'Credits',
  props: {
    listItem: {
      type: Boolean,
      default: false,
    },
  },
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
