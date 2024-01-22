<template>
  <div v-if="credits !== 0">
    <v-btn text v-if="!listItem" @click="$refs.creditHistoryDialog.show()">
      {{ credits }}
      <v-icon right>mdi-circle-multiple</v-icon>
    </v-btn>
    <v-list-item v-else @click="$refs.creditHistoryDialog.show()">
      <v-icon left>
        mdi-circle-multiple
      </v-icon>
      <v-list-item-title>
        {{ credits }}
      </v-list-item-title>
    </v-list-item>
    <Dialog ref="creditHistoryDialog" :title="$store.getters.shopConfig.credits_display_title"
            icon="mdi-circle-multiple" :max-width="1000" v-if="$store.getters.isLoggedIn">
      <CreditHistory :user="$store.getters.user"/>
    </Dialog>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService';
import CreditHistory from '@/components/DashboardComponents/CreditHistory.vue';
import Dialog from '@/components/Dialog.vue';

export default {
  name: 'Credits',
  components: {
    CreditHistory,
    Dialog,
  },
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
    this.fetchData();
  },
  methods: {
    fetchData() {
      ShopService.refreshCreditAccount();
    },
  },
};
</script>

<style scoped>

</style>
