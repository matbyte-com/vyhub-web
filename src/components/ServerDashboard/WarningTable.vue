<template>
<div>
  <span class="text-h5">
    {{ $t('warnings') }}:
  </span>
  <DataTable
    ref="warnTable"
    :headers="headers"
    :items="warnings"
    :item-class="warningRowFormatter"
    :totalItems="totalItems"
    default-sort-by="created_on"
    :default-sort-desc="true"
  >
    <template v-slot:footer-right v-if="$checkProp('warning_edit')">
      <v-btn outlined color="success" @click="openAddWarningDialog()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t("_warning.add") }}</span>
      </v-btn>
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
  <DeleteConfirmationDialog ref="deleteWarningDialog" @submit="deleteWarning"/>
  <DialogForm ref="addWarningDialog" @submit="addWarning" :form-schema="warningAddSchema"
              :title="$t('_warning.add')" icon="mdi-account-alert"/>
</div>
</template>

<script>
import DataTable from '@/components/DataTable.vue';
import UserLink from '@/components/UserLink.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import DialogForm from '@/components/DialogForm.vue';
import warningAddForm from '@/forms/WarningAddForm';

export default {
  name: 'WarningTable',
  components: {
    DataTable, UserLink, DeleteConfirmationDialog, DialogForm,
  },
  data() {
    return {
      headers: [
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('creator'), value: 'creator', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      warningAddSchema: warningAddForm,
    };
  },
  props: ['warnings', 'totalItems', 'user', 'serverbundle'],
  methods: {
    warningRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : 'lighten-4');

      if (item.disabled) {
        return `gray ${add}`;
      }

      if (!item.active) {
        return `orange ${add}`;
      }

      return `green ${add}`;
    },
    async toggleDisable(item) {
      (await openapi).warning_toggleWarningStatus(item.id).then(() => {
        // eslint-disable-next-line no-param-reassign
        item.disabled = !item.disabled;
        this.$notify({
          title: this.$t('_warning.messages.toggledWarning'),
          type: 'success',
        });
        this.fetchData();
      });
    },
    openDeleteWarningDialog(item) {
      this.$refs.deleteWarningDialog.show(item);
    },
    async deleteWarning(item) {
      (await openapi).warning_deleteWarning(item.id).then(() => {
        this.$refs.deleteWarningDialog.closeAndReset();
        this.$notify({
          title: this.$t('_warning.messages.deletedWarning'),
          type: 'success',
        });
      }).catch((err) => this.$refs.deleteWarningDialog.setErrorMessage(err.response.data.detail));
    },
    async addWarning() {
      const form = this.$refs.addWarningDialog.getData();
      const data = {};
      data.serverbundle_id = form.serverbundle.id;
      data.user_id = form.user.id;
      data.reason = form.reason;
      (await openapi).warning_addWarning(null, data).then(() => {
        this.$refs.addWarningDialog.closeAndReset();
        this.$notify({
          title: this.$t('_warning.messages.addedWarning'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addWarningDialog.setErrorMessage(err.response.data.detail);
      });
    },
    openAddWarningDialog() {
      this.$refs.addWarningDialog.show();
      this.$refs.addWarningDialog.setData({
        user: this.user,
        serverbundle: this.serverbundle,
      });
    },
  },
};
</script>

<style scoped>

</style>
