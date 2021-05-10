<template>
  <div>
    <v-row>
      <v-col>
        <v-data-iterator
          :items="purchases"
          :items-per-page.sync="itemsPerPage"
          :page.sync="page"
          :search="search"
          sort-by="date"
          :sort-desc="true"
          hide-default-footer
        >
          <template v-slot:header>
            <v-row justify="end">
              <v-col lg="3" md="6" sm="12" >
                <v-text-field
                  v-model="search"
                  :label="$t('search')"
                  hide-details
                  outlined
                  dense
                >
                  <template v-slot:prepend-inner>
                    <v-icon>
                      mdi-magnify
                    </v-icon>
                  </template>
                </v-text-field>
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
                              <PurchaseStatusChip :status="purchase.status"></PurchaseStatusChip>
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
                              <td v-if="debit.amount_total != 0">
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

          <template v-slot:footer>
            <v-row
              class="mt-2"
              align="center"
              justify="center"
            >
              <v-col>
                <span class="grey--text">Items per page</span>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                      {{ itemsPerPage }}
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item
                      v-for="(number, index) in itemsPerPageArray"
                      :key="index"
                      @click="updateItemsPerPage(number)"
                    >
                      <v-list-item-title>{{ number }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

              </v-col>
              <v-spacer></v-spacer>
              <v-col class="text-right">
                <span class="mr-4 grey--text">
                  Page {{ page }} of {{ numberOfPages }}
                </span>
                <v-btn small fab dark color="blue darken-3" class="mr-1" @click="formerPage">
                  <v-icon>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn small fab dark color="blue darken-3" class="ml-1" @click="nextPage" >
                  <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '../../../api/openapi';
import UtilService from '../../../services/UtilService';
import PurchaseStatusChip from '../PurchaseStatusChip.vue';

export default {
  name: 'MyPurchases',
  components: { PurchaseStatusChip },
  data() {
    return {
      itemsPerPageArray: [6, 12, 18, 24],
      search: '',
      filter: {},
      page: 1,
      itemsPerPage: 6,
      purchases: [],
    };
  },
  computed: {
    numberOfPages() {
      return Math.ceil(this.purchases.length / this.itemsPerPage);
    },
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

      api.user_getPurchases({ uuid: this.$store.getters.user.id }).then((rsp) => {
        this.purchases = rsp.data;
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    async downloadInvoice(debit) {
      (await openapi).shop_getDebitInvoice(
        { uuid: debit.id },
        null,
        { responseType: 'blob' },
      ).then((rsp) => {
        UtilService.showFile(rsp.data, `${debit.invoice_number}.pdf`);
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
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
