<template>
<div>
  <span class="text-h5">
    <v-icon start>
      mdi-account-alert
    </v-icon>
    {{ $t('warnings') }}
  </span>
  <DataTable
    ref="warnTable"
    :headers="headers"
    :items="warnings"
    :totalItems="totalItems"
    default-sort-by="created_on"
    :default-sort-desc="true"
  >
    <template v-slot:footer-right v-if="$checkProp('warning_edit')">
      <v-btn variant="outlined" color="success" @click="openAddWarningDialog()">
        <v-icon start>mdi-plus</v-icon>
        <span>{{ $t("_warning.add") }}</span>
      </v-btn>
    </template>
    <template v-slot:item.color-status="{ item }">
      <v-sheet :color="warningRowFormatter(item)"
               height="95%" width="10px"
               style="margin-left: -15px"/>
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
          <v-btn variant="flat" size="small" v-if="item.disabled !== true"
                 @click="toggleDisable(item)">
            <v-icon start>
              mdi-pause
            </v-icon>
            {{ $t('disable') }}
          </v-btn>
          <v-btn variant="flat" size="small" v-else @click="toggleDisable(item)">
            <v-icon start>
              mdi-play
            </v-icon>
            {{ $t('enable') }}
          </v-btn>
        </div>
        <v-btn variant="outlined" v-if="$checkProp('warning_delete')" color="error" size="small"
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
        { value: 'color-status', sortable: false, width: '1px' },
        { text: this.$t('reason'), value: 'reason' },
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
      const add = (this.$vuetify.theme.dark ? 'darken-4' : '');

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
          title: this.$t('_messages.toggleSuccess'),
          type: 'success',
        });
        this.$emit('edit');
      });
    },
    openDeleteWarningDialog(item) {
      this.$refs.deleteWarningDialog.show(item);
    },
    async deleteWarning(item) {
      (await openapi).warning_deleteWarning(item.id).then(() => {
        this.$emit('edit');
        this.$refs.deleteWarningDialog.closeAndReset();
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
        this.$refs.addWarningDialog.closeAndReset();
        this.$emit('edit');
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addWarningDialog.setError(err);
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
