<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon left>
          mdi-format-list-bulleted
        </v-icon>
        {{ $t('_dashboard.labels.userLog') }}
        <v-spacer />
        <v-btn outlined color="success" @click="$refs.entryAddForm.show()">
          <v-icon left>
            mdi-plus
          </v-icon>
          {{ $t('add') }}
        </v-btn>
      </v-card-title>
      <v-card-text>
        <LogTable ref="logTable" type="user" :obj-id="user.id" :show-search="false"
                  v-if="user != null" />
        <v-skeleton-loader v-else></v-skeleton-loader>
      </v-card-text>
    </v-card>
    <DialogForm icon="mdi-format-list-bulleted" @submit="addUserLogEntry()"
                :title="$t('_userLogEntry.addLogEntry')" ref="entryAddForm" :form-schema="schema" />
  </div>
</template>

<script>
import LogTable from '../LogTable.vue';
import DialogForm from '../DialogForm.vue';
import UserLogEntryAdd from '../../forms/UserLogEntryAdd';
import openapi from '../../api/openapi';

export default {
  name: 'UserLogEntries',
  components: { DialogForm, LogTable },
  props: { user: Object },
  data() {
    return {
      schema: UserLogEntryAdd,
    };
  },
  methods: {
    async addUserLogEntry() {
      const data = this.$refs.entryAddForm.getData();
      (await openapi).user_createLogEntry(this.user.id, data).then(() => {
        this.$refs.entryAddForm.closeAndReset();
        this.$refs.logTable.queryData();
      }).catch((err) => {
        this.$refs.entryAddForm.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
