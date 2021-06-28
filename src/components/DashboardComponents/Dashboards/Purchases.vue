<template>
  <div>
    <v-card>
      <v-card-text>
        <v-row>
          <v-col>
            <DataIterator
              :items="purchases"
              sort-by="date"
              :sort-desc="true"
            >
              <template v-slot:default="props">
                <v-row>
                  <v-col
                    v-for="purchase in props.items"
                    :key="purchase.id"
                    cols="12"
                    lg="6"
                    xl="4"
                    class="d-flex"
                  >
                    <v-card class="flex-grow-1">
                      <v-card-title class="subheading font-weight-bold">
                        # {{ purchase.id }}
                      </v-card-title>

                      <v-divider></v-divider>

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
                            <v-simple-table>
                              <template>
                                <thead>
                                <tr>
                                  <th>
                                    {{ $t('date') }}
                                  </th>
                                  <th>
                                    {{ $t('gateway') }}
                                  </th>
                                  <th >
                                    {{ $t('amount') }}
                                  </th>
                                  <th>
                                    {{ $t('invoice') }}
                                  </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr
                                  v-for="debit in filterFinishedDebits(purchase.debits)"
                                  :key="debit.id"
                                >
                                  <td>{{ new Date(debit.date).toLocaleString() }}</td>
                                  <td>{{ debit.payment_gateway.name }}</td>
                                  <td v-if="debit.amount_total != null">
                                    {{ debit.amount_total
                                    .toLocaleString(undefined, {minimumFractionDigits: 2}) }}
                                    {{ purchase.currency.symbol }}
                                  </td>
                                  <td v-else>
                                    {{ debit.credits }}
                                    {{ $t('credits') }}
                                  </td>
                                  <td>
                                    <v-btn color="primary" outlined small
                                           :disabled="!debit.invoice_available"
                                           @click="downloadInvoice(debit)">
                                      <v-icon>
                                        mdi-file-download
                                      </v-icon>
                                    </v-btn>
                                  </td>
                                </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-col>
                        </v-row>

                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </template>
            </DataIterator>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import PurchaseStatusChip from '@/components/ShopComponents/PurchaseStatusChip.vue';
import DataIterator from '../../DataIterator.vue';

export default {
  name: 'UserPurchases',
  components: { DataIterator, PurchaseStatusChip },
  data() {
    return {
      purchases: [],
    };
  },
  props: {
    user: Object,
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
  methods: {
    async queryData() {
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
  },
};
</script>

<style scoped>

</style>
