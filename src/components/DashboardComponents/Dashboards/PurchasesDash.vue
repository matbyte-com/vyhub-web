<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <DataIterator
              :items="purchases"
              sort-by="date"
              :items-per-page="6"
              :sort-desc="true">
              <template v-slot:header class="d-flex">
                <v-row>
                  <v-col>
                    <div class="text-right">
                      <v-btn depressed color="success" @click="$refs.creditHistoryDialog.show()">
                        <v-icon left>mdi-circle-multiple</v-icon>
                        {{ $store.getters.shopConfig.credits_display_title }}
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </template>
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="purchase in props.items"
                    :key="purchase.id"
                    cols="12"
                    lg="6"
                    xl="4"
                    class="d-flex">
                    <v-card class="flex-grow-1 card-rounded" outlined>
                      <v-card-title class="subheading font-weight-bold">
                        # {{ purchase.id }}
                      </v-card-title>
                      <v-divider />
                      <v-card-text>
                        <v-row>
                          <v-col>
                            <div class="subtitle-1">
                              {{ $t('details') }}
                            </div>
                            <v-list dense>
                              <v-list-item>
                                <v-list-item-content>
                                  {{ $t('date') }}
                                </v-list-item-content>
                                <v-list-item-content>
                                  {{ new Date(purchase.date).toLocaleString() }}
                                </v-list-item-content>
                              </v-list-item>
                              <v-list-item>
                                <v-list-item-content>
                                  {{ $t('status') }}
                                </v-list-item-content>
                                <v-list-item-content>
                                  <PurchaseStatusChip :status="purchase.status" />
                                </v-list-item-content>
                              </v-list-item>
                            </v-list>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <div class="subtitle-1">
                              {{ $t('packets') }}
                            </div>

                            <div>
                              <div>
                                <v-chip v-for="cp in purchase.cart_packets" v-bind:key="cp.id"
                                        class="mr-1 mb-1">
                                  {{ cp.packet_title }}
                                </v-chip>
                              </div>
                            </div>
                          </v-col>
                        </v-row>

                        <v-row>
                          <v-col>
                            <div class="subtitle-1">
                              {{ $t('payments') }}
                            </div>
                            <DataTable :items="filterFinishedDebits(purchase.debits)"
                                       :headers="headers"
                                       :totalItems="purchase.debits ? purchase.debits.length : 0"
                                       :items-per-page="5"
                            >
                              <template v-slot:item.date="{ item }">
                                {{ utils.formatDate(item.date) }}
                              </template>
                              <template v-slot:item.invoice="{ item }">
                                <v-btn color="primary" outlined small
                                       :disabled="!item.invoice_available"
                                       @click="downloadInvoice(item)">
                                  <v-icon>
                                    mdi-file-download
                                  </v-icon>
                                </v-btn>
                              </template>
                              <template v-slot:item.amount="{ item }">
                                <div v-if="item.amount_total != null">
                                  {{ item.amount_total
                                  .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                                  {{ purchase.currency.symbol }}
                                </div>
                                <div v-else>
                                  {{ item.credits }}
                                  {{ $t('credits') }}
                                </div>
                              </template>
                            </DataTable>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-card-actions v-if="purchase.status === 'RECURRING'">
                        <v-btn text color="error"
                               @click="$refs.confirmSubCancelDialog.show(purchase)"
                               v-if="purchase.status === 'RECURRING'">
                          <v-icon left>mdi-cancel</v-icon>
                          {{ $t('_purchases.labels.cancelSubscription') }}
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </DataIterator>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <ConfirmationDialog
      :text="$t('_purchases.messages.cancelSubscriptionConfirm')"
      btn-icon="mdi-cancel"
      :btn-text="$t('_purchases.labels.cancelSubscription')"
      @submit="cancelSubscription"
      :width="500"
      ref="confirmSubCancelDialog"
    >
    </ConfirmationDialog>
    <Dialog ref="creditHistoryDialog" :title="$store.getters.shopConfig.credits_display_title"
            icon="mdi-circle-multiple" :max-width="1000">
      <CreditHistory :user="user"/>
    </Dialog>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import PurchaseStatusChip from '@/components/ShopComponents/PurchaseStatusChip.vue';
import Dialog from '@/components/Dialog.vue';
import CreditHistory from '@/components/DashboardComponents/CreditHistory.vue';
import DataTable from '@/components/DataTable.vue';
import DataIterator from '../../DataIterator.vue';
import ConfirmationDialog from '../../ConfirmationDialog.vue';

export default {
  name: 'UserPurchases',
  components: {
    DataTable,
    CreditHistory,
    Dialog,
    ConfirmationDialog,
    DataIterator,
    PurchaseStatusChip,
  },
  data() {
    return {
      purchases: [],
      headers: [
        { text: this.$t('date'), value: 'date' },
        { text: this.$t('gateway'), value: 'payment_gateway.name' },
        { text: this.$t('amount'), value: 'amount' },
        { text: this.$t('invoice'), value: 'invoice', sortable: false },
      ],
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    user() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.user_getPurchases({ uuid: this.user.id }).then((rsp) => {
        this.purchases = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async downloadInvoice(debit) {
      (await openapi).shop_getDebitInvoice(
        { uuid: debit.id },
        null,
        { responseType: 'blob' },
      ).then((rsp) => {
        this.utils.showFile(rsp.data, `${debit.invoice_number}.pdf`);
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    filterFinishedDebits(debits) {
      return debits.filter((debit) => debit.status === 'FINISHED');
    },
    async cancelSubscription(purchase) {
      const api = await openapi;

      api.shop_editPurchase({ uuid: purchase.id }, { status: 'FINISHED' })
        .then(() => {
          this.$notify({
            title: this.$t('_messages.cancelSuccess'),
            type: 'success',
          });
          this.fetchData();
          this.$refs.confirmSubCancelDialog.closeAndReset();
        }).catch((err) => {
          console.log(err);
          this.$refs.confirmSubCancelDialog.setError(err);
        });
    },
  },
};
</script>

<style scoped>

</style>
