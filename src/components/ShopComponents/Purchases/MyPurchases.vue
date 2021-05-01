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
                <v-text-field v-model="search" clearable flat solo-inverted hide-details
                              prepend-inner-icon="mdi-magnify" label="Search"
                ></v-text-field>
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
              >
                <v-card>
                  <v-card-title class="subheading font-weight-bold">
                    # {{ purchase.id }}
                  </v-card-title>

                  <v-divider></v-divider>

                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>
                        {{ $t('date') }}
                      </v-list-item-content>
                      <v-list-item-content>
                        {{ Date(purchase.date).toLocaleString() }}
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        {{ $t('status') }}
                      </v-list-item-content>
                      <v-list-item-content>
                        {{ purchase.status }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
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

export default {
  name: 'MyPurchases',
  data() {
    return {
      itemsPerPageArray: [4, 8, 12],
      search: '',
      filter: {},
      page: 1,
      itemsPerPage: 4,
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
  },
};
</script>

<style scoped>

</style>
