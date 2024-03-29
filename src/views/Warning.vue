<template>
  <div>
    <DeleteConfirmationDialog ref="deleteWarningDialog" @submit="deleteWarning"/>
    <DialogForm ref="addWarningDialog" @submit="addWarning" :form-schema="WarningAddForm"
                :title="$t('_warning.add')" icon="mdi-account-alert"/>
    <DialogForm ref="editWarningDialog" @submit="editWarning" :form-schema="WarningEditForm"
                :title="$t('_warning.edit')" icon="mdi-account-alert"/>
    <PageTitleFlat :title="$t('_warning.title')" :hide-triangle="true"
                   :no-bottom-border-radius="$vuetify.breakpoint.smAndDown"/>
    <v-card class="vh-warns card-rounded-bottom" flat
            :class="{ 'mt-4 card-rounded-top':!$vuetify.breakpoint.smAndDown,
           'no-top-border-radius': $vuetify.breakpoint.smAndDown }">
      <v-card-text>
        <PaginatedDataTable
          ref="warnTable"
          :headers="headers"
          :items="warnings"
          :totalItems="totalItems"
          default-sort-by="created_on"
          :default-sort-desc="true"
          @reload="fetchData"
          @click:row="showDetails"
          >
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
                    v-model="selectedBundles"
                    :label="bundle.name"
                    :value="bundle.id"
                    @change="fetchData()"
                  ></v-checkbox>
                  <a class="ma-1" @click="selectedBundles = []; fetchData()">{{ $t('reset') }}</a>
                </v-menu>
                <v-alert type="info" color="primary" dense v-if="$route.query.user_id"
                         class="mt-4 ml-3">
                  {{ $t('_warning.showUserWarnings', { id: $route.query.user_id }) }}
                </v-alert>
              </v-col>
            </v-row>
          </template>
          <template v-slot:footer-right v-if="$checkProp('warning_edit')">
            <v-btn outlined color="success" @click="openAddWarningDialog()">
              <v-icon left>mdi-plus</v-icon>
              <span>{{ $t("_warning.add") }}</span>
            </v-btn>
          </template>
          <template v-slot:item.color-status="{ item }">
            <v-sheet :color="warningRowFormatter(item)"
                     height="95%" width="10px"
                     style="margin-left: -15px"/>
          </template>
          <template v-slot:item.user="{ item }">
            <span v-if="$vuetify.breakpoint.xsOnly">
              <UserLink :user="item.user"
                        :color="warningRowFormatter(item)" />
            </span>
            <span v-else>
              <UserLink :user="item.user"/>
            </span>
          </template>
          <template v-slot:item.created_on="{ item }">
            <span>{{ new Date(item.created_on).toLocaleString() }}</span>
          </template>
          <template v-slot:item.creator="{ item }">
            <UserLink :user="item.creator"></UserLink>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="d-flex">
              <v-spacer />
              <v-btn v-if="$checkProp('warning_edit')" depressed small color="error"
                     @click="showDetails(item)">
                <v-icon left>
                  mdi-eye
                </v-icon>
                {{ $t('details') }}
              </v-btn>
              <div v-if="$checkProp('warning_edit') && item.status !== 'EXPIRED'">
                <v-btn class="ml-1" depressed small v-if="item.disabled !== true"
                       @click.stop="toggleDisable(item)">
                  <v-icon left>
                    mdi-pause
                  </v-icon>
                  {{ $t('disable') }}
                </v-btn>
                <v-btn class="ml-1" depressed small v-else @click.stop="toggleDisable(item)">
                  <v-icon left>
                    mdi-play
                  </v-icon>
                  {{ $t('enable') }}
                </v-btn>
              </div>
            </div>
          </template>
        </PaginatedDataTable>
      </v-card-text>
    </v-card>
    <Dialog
      ref="warnDetailDialog"
      icon="mdi-account-cancel"
      :title="$t('_warning.labels.details')"
      :max-width="800"
      v-model="warningDetailShown">
      <template>
        <h6 class="text-h6 mb-2  mt-3">{{ $t('details') }}</h6>
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="raw in ['id', 'reason']" :key="raw">
                <td>{{ $t(raw) }}</td>
                <td>{{ currentWarning[raw] }}</td>
              </tr>
              <tr>
                <td>{{ $t('user') }}</td>
                <td><UserLink :user="currentWarning.user" /></td>
              </tr>
              <tr>
                <td>{{ $t('bundle') }}</td>
                <td>
                  {{ currentWarning.serverbundle.name }}
                </td>
              </tr>
              <tr>
                <td>{{ $t('creator') }}</td>
                <td><UserLink :user="currentWarning.creator" /></td>
              </tr>
              <tr>
                <td>{{ $t('createdOn') }}</td>
                <td>{{ new Date(currentWarning.created_on).toLocaleString() }}</td>
              </tr>
              <tr>
                <td>{{ $t('status') }}</td>
                <td v-if="currentWarning.active">
                  <v-chip color="green" text-color="white">
                    {{ $t('active') }}
                  </v-chip>
                </td>
                <td v-else>
                  <v-chip v-if="currentWarning.disabled" color="orange" text-color="white">
                    {{ $t('disabled') }}
                  </v-chip>
                  <v-chip v-else color="red" text-color="white">
                    {{ $t('expired') }}
                  </v-chip>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </template>
      <template v-slot:actions>
        <div v-if="currentWarning != null && $checkProp('warning_edit')">
          <v-btn text color="primary" @click="openEditWarningDialog(currentWarning)">
            <v-icon left>
              mdi-pencil
            </v-icon>
            {{ $t('edit') }}
          </v-btn>
          <v-btn text color="error" @click="openDeleteWarningDialog(currentWarning)">
            <v-icon left>
              mdi-delete
            </v-icon>
            {{ $t('delete') }}
          </v-btn>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script>
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DialogForm from '@/components/DialogForm.vue';
import WarningAddForm from '@/forms/WarningAddForm';
import WarningEditForm from '@/forms/WarningEditForm';
import PaginatedDataTable from '@/components/PaginatedDataTable.vue';
import PageTitleFlat from '@/components/PageTitleFlat.vue';
import Dialog from '../components/Dialog.vue';

export default {
  name: 'Warning.vue',
  components: {
    PageTitleFlat,
    PaginatedDataTable,
    DialogForm,
    DeleteConfirmationDialog,
    UserLink,
    Dialog,
  },
  data() {
    return {
      warnings: null,
      warningDetailShown: false,
      currentWarning: null,
      bundles: [],
      headers: [
        { value: 'color-status', sortable: false, width: '1px' },
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('creator'), value: 'creator', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      WarningAddForm,
      WarningEditForm,
      selectedBundles: [],
      totalItems: 0,
    };
  },
  beforeMount() {
    this.fetchServerbundles();
  },
  methods: {
    async fetchData(queryParams = null) {
      (await openapi).warning_getWarnings({
        serverbundle_id: this.selectedBundles,
        user_id: this.$route.query.user_id,
        ...(queryParams != null ? queryParams : this.$refs.warnTable.getQueryParameters()),
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
      const add = (this.$vuetify.theme.dark ? 'darken-4' : '');

      if (item.disabled) {
        return `orange ${add}`;
      }

      if (!item.active) {
        return `red ${add}`;
      }

      return `green ${add}`;
    },
    async toggleDisable(item) {
      (await openapi).warning_toggleWarningStatus(item.id).then(() => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = !item.disabled;
        this.$notify({
          title: this.$t('_messages.toggleSuccess'),
          type: 'success',
        });
        this.fetchData();
      });
    },
    openEditWarningDialog(item) {
      this.$refs.editWarningDialog.setData(item);
      this.$refs.editWarningDialog.show();
    },
    async editWarning() {
      const dialogData = this.$refs.editWarningDialog.getData();
      const data = {};
      data.serverbundle_id = this.currentWarning.serverbundle.id;
      data.user_id = this.currentWarning.user.id;
      data.reason = dialogData.reason;
      (await openapi).warning_editWarning(this.currentWarning.id, data).then(() => {
        this.$refs.editWarningDialog.closeAndReset();
        this.fetchData();
        this.warningDetailShown = false;
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => this.$refs.editWarningDialog.setError(err));
    },
    openAddWarningDialog() {
      const { user_id } = this.$route.query;
      if (user_id) {
        this.$refs.addWarningDialog.setData({ user: { id: user_id } });
      }
      this.$refs.addWarningDialog.show();
    },
    openDeleteWarningDialog(item) {
      this.$refs.deleteWarningDialog.show(item);
    },
    async deleteWarning(item) {
      (await openapi).warning_deleteWarning(item.id).then(() => {
        this.$refs.deleteWarningDialog.closeAndReset();
        this.fetchData();
        this.warningDetailShown = false;
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => this.$refs.deleteWarningDialog.setError(err));
    },
    async addWarning() {
      const form = this.$refs.addWarningDialog.getData();
      const data = {};
      data.serverbundle_id = form.serverbundle.id;
      data.user_id = form.user.id;
      data.reason = form.reason;
      (await openapi).warning_addWarning(null, data).then(() => {
        this.fetchData();
        this.$refs.addWarningDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addWarningDialog.setError(err);
      });
    },
    showDetails(item) {
      this.$router.push({ name: 'Warnings', params: { warningId: item.id } });
      this.currentWarning = item;
      this.warningDetailShown = true;
    },
  },
};
</script>

<style scoped>

</style>
