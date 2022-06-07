<template>
  <div>
  <span class="text-h5">
    {{ $t('bans') }}
  </span>
  <DataTable
    ref="banTable"
    :headers="headers"
    :items="bans"
    :item-class="banRowFormatter"
    defaultSortBy="created_on"
    :defaultSortDesc="true"
    :totalItems="totalItems">
    <template v-slot:footer-right v-if="$checkProp('ban_add')">
      <v-btn outlined color="success" @click="showAddDialog">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_ban.labels.add') }}</span>
      </v-btn>
    </template>
    <template v-slot:item.length="{ item }">
  <span>
    {{ utils.formatLength(item['length']) }}
  </span>
    </template>
    <template v-slot:item.creator="{ item }">
      <UserLink :user="item.creator"></UserLink>
    </template>
    <template v-slot:item.created_on="{ item }">
      <span>{{ new Date(item.created_on).toLocaleString() }}</span>
    </template>
    <template v-slot:item.actions="{ item }">
      <div class="d-flex" v-if="$checkProp('ban_edit')">
        <v-spacer />
        <v-btn depressed small @click="unbanBan(item)"
               v-if="item.status === 'ACTIVE'">
          <v-icon left>mdi-lock-open</v-icon>
          {{ $t('_ban.labels.unban') }}
        </v-btn>
        <v-btn depressed small @click="rebanBan(item)"
               v-if="item.status === 'UNBANNED'">
          <v-icon left>mdi-lock</v-icon>
          {{ $t('_ban.labels.reban') }}
        </v-btn>
        <v-btn small class="ml-1" outlined color="primary" @click="showEditDialog(item)">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn class="ml-1" small outlined color="error" @click="$refs.deleteBanDialog.show(item)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </div>
    </template>
  </DataTable>
  <DialogForm :form-schema="banAddFormSchema" ref="banAddDialog"
              :title="$t('_ban.labels.add')" :submit-text="$t('create')"
              icon="mdi-account-cancel"
              @submit="addBan">
  </DialogForm>
  <DialogForm :form-schema="banEditFormSchema" ref="banEditDialog"
              :title="$t('_ban.labels.edit')" :submit-text="$t('edit')"
              icon="mdi-account-cancel"
              @submit="editBan">
  </DialogForm>
  <DeleteConfirmationDialog
    ref="deleteBanDialog"
    @submit="deleteBan"/>
  </div>
</template>

<script>
import DialogForm from '@/components/DialogForm.vue';
import UserLink from '@/components/UserLink.vue';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import banAddFormSchema from '@/forms/BanAddForm';
import banEditFormSchema from '@/forms/BanEditForm';
import openapi from '@/api/openapi';
import DataTable from '@/components/DataTable.vue';

export default {
  name: 'Ban.vue',
  components: {
    DialogForm,
    UserLink,
    DataTable,
    DeleteConfirmationDialog,
  },
  data() {
    return {
      headers: [
        { text: this.$t('reason'), value: 'reason' },
        { text: this.$t('bundle'), value: 'serverbundle.name', sortable: false },
        { text: this.$t('length'), value: 'length' },
        { text: this.$t('creator'), value: 'creator', sortable: false },
        { text: this.$t('createdOn'), value: 'created_on' },
        {
          text: this.$t('actions'), value: 'actions', align: 'right', sortable: false,
        },
      ],
      banAddFormSchema,
      banEditFormSchema,
    };
  },
  props: ['bans', 'totalItems', 'user', 'serverbundle'],
  methods: {
    banRowFormatter(item) {
      const add = (this.$vuetify.theme.dark ? 'darken-4' : 'lighten-4');

      if (item.active) {
        if (item.serverbundle == null) {
          return `blue ${add}`;
        }
        return `green ${add}`;
      }

      if (item.status === 'UNBANNED') {
        return `orange ${add}`;
      }

      return `red ${add}`;
    },
    async addBan() {
      const data = this.$refs.banAddDialog.getData();

      (await openapi).ban_createBan(null, {
        user_id: (data.user ? data.user.id : null),
        reason: data.reason,
        length: data.length * 60,
        serverbundle_id: (data.serverbundle ? data.serverbundle.id : null),
      }).then(() => {
        this.$refs.banAddDialog.closeAndReset();
        this.$notify({
          title: this.$t('_ban.messages.banAdded'),
          type: 'success',
        });
        this.$emit('edit');
      }).catch((err) => {
        this.$refs.banAddDialog.setError(err);
      });
    },
    async editBan(ban) {
      const data = this.$refs.banEditDialog.getData();

      (await openapi).ban_editBan(
        { uuid: ban.id },
        {
          reason: data.reason,
          length: data.length * 60,
          serverbundle_id: (data.serverbundle ? data.serverbundle.id : null),
        },
      ).then(() => {
        this.$refs.banEditDialog.closeAndReset();
        this.$notify({
          title: this.$t('_ban.messages.banEdited'),
          type: 'success',
        });
        this.$emit('edit');
      }).catch((err) => {
        console.log(err);
        this.$refs.banEditDialog.setError(err);
      });
    },
    async deleteBan(ban) {
      (await openapi).ban_deleteBan(
        { uuid: ban.id },
      ).then(() => {
        this.$refs.deleteBanDialog.closeAndReset();
        this.$notify({
          title: this.$t('_ban.messages.banDeleted'),
          type: 'success',
        });
        this.$emit('edit');
      }).catch((err) => {
        this.$refs.deleteBanDialog.setError(err);
        console.log(err);
      });
    },
    async unbanBan(ban) {
      (await openapi).ban_editBan(
        { uuid: ban.id },
        { status: 'UNBANNED' },
      ).then(() => {
        this.$emit('edit');
        this.$notify({
          title: this.$t('_ban.messages.banToggled'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    async rebanBan(ban) {
      (await openapi).ban_editBan(
        { uuid: ban.id },
        { status: 'ACTIVE' },
      ).then(() => {
        this.$emit('edit');
        this.$notify({
          title: this.$t('_ban.messages.banToggled'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    showEditDialog(ban) {
      this.$refs.banEditDialog.show(ban);
      const data = {};
      data.length = (ban.length != null ? ban.length / 60 : null);

      this.$refs.banEditDialog.setData(ban);
    },
    showAddDialog() {
      this.$refs.banAddDialog.show();
      this.$refs.banAddDialog.setData({
        user: this.user,
        serverbundle: this.serverbundle,
      });
    },
  },
};
</script>

<style scoped>

</style>
