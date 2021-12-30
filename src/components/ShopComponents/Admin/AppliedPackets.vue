<template>
    <div>
      <DataTable
        :headers="headers"
        :items="appliedPackets"
        :external-search="true"
        @update:page="newPage" @update:sort-by="newOrderBy"
        @update:sort-desc="newSortDesc"
        :footer-props="{
                     'disable-items-per-page': true,
                   }"
        @search="newSearch"
        :server-items-length.sync="totalItems"
        :items-per-page.sync="itemsPerPage">
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
                    {{ $t('active') }}
                  </v-btn>
                </template>
                <v-radio-group v-model="active_filter">
                  <v-radio :value="true" :label="$t('active')"></v-radio>
                  <v-radio :value="false" :label="$t('inactive')"></v-radio>
                </v-radio-group>
                <a class="ma-1" @click="active_filter = null;">
                  {{ $t('reset') }}</a>
              </v-menu>
            </v-col>
          </v-row>
        </template>
        <template v-slot:item.packet_title="{ item }">
          {{ item.packet.title }}
        </template>
        <template v-slot:item.active="{ item }">
          <BoolIcon :value="item.active"></BoolIcon>
        </template>
        <template v-slot:item.begin="{ item }">
          <span>{{ new Date(item.begin).toLocaleString() }}</span>
        </template>
        <template v-slot:item.end="{ item }">
          <span v-if="item.end != null">{{ new Date(item.end).toLocaleString() }}</span>
          <span v-else>∞</span>
        </template>
        <template v-slot:item.user="{ item }">
          <UserLink :user="item.user"></UserLink>
        </template>
        <template v-slot:item.actions="{ item }">
          <div class="text-right">
            <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn outlined color="error" small @click="$refs.deleteAppliedPacketDialog.show(item)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
        </template>
      </DataTable>
      <DialogForm
        ref="editAppliedPacketDialog"
        :form-schema="editFormSchema"
        icon="mdi-gift-open"
        :submitText="$t('edit')"
        @submit="editAppliedPacket"
        :title="$t('_purchases.labels.editAppliedPacket')"/>
      <DeleteConfirmationDialog
        ref="deleteAppliedPacketDialog"
        @submit="deleteAppliedPacket"/>
    </div>
</template>

<script>
import DataTable from '../../DataTable.vue';
import UserLink from '../../UserLink.vue';
import openapi from '../../../api/openapi';
import BoolIcon from '../../BoolIcon.vue';
import AppliedPacketEditForm from '../../../forms/AppliedPacketEditForm';
import DialogForm from '../../DialogForm.vue';
import DeleteConfirmationDialog from '../../DeleteConfirmationDialog.vue';

export default {
  name: 'UserPackets',
  components: {
    DeleteConfirmationDialog,
    DialogForm,
    BoolIcon,
    UserLink,
    DataTable,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'packet_title', sortable: false },
        { text: this.$t('user'), value: 'user', sortable: false },
        { text: this.$t('active'), value: 'active', sortable: false },
        { text: this.$t('begin'), value: 'begin' },
        { text: this.$t('end'), value: 'end' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      appliedPackets: null,
      editFormSchema: AppliedPacketEditForm,
      itemsPerPage: 50,
      page: 1,
      search: '',
      sort_by: 'begin',
      sortDesc: true,
      active_filter: [],
      totalItems: 20,
      availableStatus: [],
    };
  },
  methods: {
    async queryData(page) {
      const api = await openapi;

      const params = {
        size: this.itemsPerPage,
        page,
        query: this.search,
        sort_by: this.orderBy,
        sort_desc: this.sortDesc,
      };

      if (this.active_filter != null) {
        params.active = this.active_filter;
      }

      api.packet_getAppliedPackets(params).then((rsp) => {
        this.appliedPackets = rsp.data.items;
        this.totalItems = rsp.data.total;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async editAppliedPacket(aPacket) {
      const api = await openapi;
      const data = this.$refs.editAppliedPacketDialog.getData();

      api.packet_editAppliedPacket({ uuid: aPacket.id }, data).then(() => {
        this.$notify({
          title: this.$t('_purchases.messages.editAppliedPacketSuccess'),
          type: 'success',
        });
        this.$refs.editAppliedPacketDialog.closeAndReset();
        this.queryData(1);
      }).catch((err) => {
        console.log(err);
        this.$refs.editAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    showEditDialog(aPacket) {
      const data = { ...aPacket };

      this.$refs.editAppliedPacketDialog.setData(data);
      this.$refs.editAppliedPacketDialog.show(data);
    },
    async deleteAppliedPacket(ePacket) {
      (await openapi).packet_deleteAppliedPacket({ uuid: ePacket.id }).then(() => {
        this.$notify({
          title: this.$t('_purchases.messages.deleteAppliedPacketSuccess'),
          type: 'success',
        });
        this.$refs.deleteAppliedPacketDialog.closeAndReset();
        this.queryData(1);
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteAppliedPacketDialog.setErrorMessage(err.response.data.detail);
      });
    },
    newSearch(str) {
      this.search = str;
      this.queryData(1);
    },
    newOrderBy(str) {
      if (str[0] !== this.orderBy && str[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.orderBy = str[0];
        this.queryData(1);
      }
    },
    newSortDesc(val) {
      if (val[0] !== this.sortDesc && val[0] !== undefined) {
        // eslint-disable-next-line prefer-destructuring
        this.sortDesc = val[0];
        this.queryData(1);
      }
    },
    newPage(page) {
      this.page = page;
      this.queryData(page);
    },
  },
  beforeMount() {
    this.queryData(1);
  },
  watch: {
    $route() {
      // this.queryData(1);
    },
    active_filter() {
      this.queryData(1);
    },
  },
};
</script>

<style scoped>

</style>
