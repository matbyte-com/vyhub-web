<template>
  <div v-if="credits !== 0">
    <v-btn
      v-if="!listItem"
      variant="text"
      @click="$refs.creditHistoryDialog.show()"
    >
      {{ credits }}
      <v-icon end>
        mdi-circle-multiple
      </v-icon>
    </v-btn>
    <v-list-item
      v-else
      @click="$refs.creditHistoryDialog.show()"
    >
      <v-list-item-title>
        <v-icon
          icon="mdi-circle-multiple"
          start
        />
        {{ credits }}
      </v-list-item-title>
    </v-list-item>
    <Dialog
      v-if="$store.getters.isLoggedIn"
      ref="creditHistoryDialog"
      :title="$store.getters.shopConfig.credits_display_title"
      icon="mdi-circle-multiple"
      :max-width="1000"
    >
      <CreditHistory :user="$store.getters.user" />
    </Dialog>
  </div>
</template>

<script>
import ShopService from '@/services/ShopService';

export default {
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
