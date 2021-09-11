<template>
  <div>
    <DeleteConfirmationDialog ref="deleteWarningDialog" @submit="deleteWarning"/>
    <DialogForm ref="addWarningDialog" @submit="addWarning" :form-schema="WarningAddForm"
                :title="$t('_warning.add')"/>
    <PageTitle icon="mdi-account-alert">{{ $t('_warning.title') }}</PageTitle>
    <v-card>
      <v-card-text>
        <DataTable :headers="headers"
                   :items="warnings"
                   :item-class="warningRowFormatter"
                   :server-items-length.sync="totalItems"
                   :items-per-page.sync="itemsPerPage"
                   @update:page="newPage" @update:sort-by="newOrderBy"
                   @update:sort-desc="newSortDesc"
                   :footer-props="{
                     'disable-items-per-page': true,
                   }" :externalSearch="true" @search="newSearch">
          <template v-slot:header>
            <v-row>
              <v-col class="d-flex align-center">
                <v-menu offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      outlined
                      color="primary"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <v-icon left>
                        mdi-filter
                      </v-icon>
                      {{ $t('bundle') }}
                    </v-btn>
                  </template>
                  <v-checkbox
                    class="ml-2, mr-2"
                    dense
                    hide-details
                    v-for="(bundle, index) in bundles"
                    :key="index"
                    v-model="selectedBundle"
                    :label="bundle.name"
                    :value="bundle.id"
                    @change="newBundle"
                  ></v-checkbox>
                  <a class="ma-1" @click="selectedBundle = []; fetchData()">{{ $t('reset') }}</a>
                </v-menu>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer-right v-if="$checkProp('warning_edit')">
            <v-btn outlined color="success" @click="$refs.addWarningDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t("_warning.add") }}</span>
            </v-btn>
          </template>
          <template v-slot:item.user="{ item }">
            <UserLink :user="item.user"></UserLink>
          </template>
          <template v-slot:item.created_on="{ item }">
            <span>{{ new Date(item.created_on).toLocaleString() }}</span>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-spacer />
              <div v-if="$checkProp('warning_edit') && item.status !== 'EXPIRED'">
                <v-btn depressed small v-if="item.disabled !== true"
                       @click="toggleDisable(item)">
                  <v-icon left>
                    mdi-pause
                  </v-icon>
                  {{ $t('disable') }}
                </v-btn>
                <v-btn depressed small v-else @click="toggleDisable(item)">
                  <v-icon left>
                    mdi-play
                  </v-icon>
                  {{ $t('enable') }}
                </v-btn>
              </div>
              <v-btn outlined v-if="$checkProp('warning_delete')" color="error" small
                     @click="openDeleteWarningDialog(item)" class="ml-1">
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </template>
        </DataTable>
      </v-card-text>
    </v-card>
    {{ selectedBundle }}
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import DataTable from '@/components/DataTable.vue';
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DialogForm from '@/components/DialogForm.vue';
import WarningAddForm from '@/forms/WarningAddForm';

export default {
  name: 'Warning.vue',
  components: {
    DialogForm,
    DeleteConfirmationDialog,
    DataTable,
    PageTitle,
    UserLink,
  },
  data() {
    return {
      warnings: [],
      bundles: [],
      headers: [
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      WarningAddForm,
      page: 1,
      totalItems: 0,
      itemsPerPage: 50,
      selectedBundle: [],
      search: '',
      orderBy: '',
      sortDesc: false,
    };
  },
  beforeMount() {
    this.fetchData(this.page);
    this.fetchServerbundles();
  },
  methods: {
    async fetchData(page) {
      (await openapi).warning_getWarnings({
        page: page - 1,
        size: this.itemsPerPage,
        bundles_filter: this.selectedBundle,
        query: this.search,
        order_by: this.orderBy,
        sort_desc: this.sortDesc,
      })
        .then((rsp) => {
          this.warnings = rsp.data.items;
          this.totalItems = rsp.data.total;
        });
    },
    async fetchServerbundles() {
      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    warningRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-2' : 'lighten-4');

      if (item.disabled === true) {
        return `green ${add}`;
      }

      if (item.is_active === true) {
        return `orange ${add}`;
      }

      return '';
    },
    async toggleDisable(item) {
      (await openapi).warning_toggleWarningStatus(item.id).then(() => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = !item.disabled;
      });
    },
    openDeleteWarningDialog(item) {
      this.$refs.deleteWarningDialog.show(item);
    },
    async deleteWarning(item) {
      (await openapi).warning_deleteWarning(item.id).then(() => {
        this.$refs.deleteWarningDialog.closeAndReset();
        this.fetchData();
      }).catch((err) => this.$refs.deleteWarningDialog.setErrorMessage(err.response.data.detail));
    },
    async addWarning() {
      const form = this.$refs.addWarningDialog.getData();
      const data = {};
      data.serverbundle_id = form.serverbundle.id;
      data.user_id = form.user.id;
      data.reason = form.reason;
      (await openapi).warning_addWarning(null, data).then(() => {
        this.fetchData(1);
        this.$refs.addWarningDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.addWarningDialog.setErrorMessage(err.response.data.detail);
      });
    },
    newPage(page) {
      this.page = page;
      this.fetchData(page);
    },
    newBundle(bundles) {
      this.selectedBundle = bundles;
      this.fetchData(1);
    },
    newSearch(str) {
      this.search = str;
      this.fetchData(1);
    },
    newOrderBy(str) {
      if (str[0] !== this.orderBy && str[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.orderBy = str[0];
        this.fetchData(1);
      }
    },
    newSortDesc(val) {
      if (val[0] !== this.sortDesc && val[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.sortDesc = val[0];
        console.log(this.sortDesc);
        this.fetchData(1);
      }
    },
  },
};
</script>

<style scoped>

</style>
