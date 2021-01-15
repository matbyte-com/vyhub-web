<template>
  <div>
    <h2 class="text-h4">{{ $t("dashboard.labels.linkedAccounts") }}</h2>
    <v-divider class="mb-3"/>
    <v-data-table
    :headers="tableHeader"
    :items="getAccounts"
    :hide-default-footer="true">
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios';
import store from '@/store/index';

const uuid = store.getters.user.id;
const customerURL = `${process.env.VUE_APP_BACKEND_CUSTOMER_URL}`;

export default {
  name: 'LinkedAccounts',
  data() {
    return {
      tableHeader: [
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('username'), value: 'username' },
      ],
      userAccounts: {
        type: 1,
        attributes: { username: '' },
        // eslint-disable-next-line @typescript-eslint/camelcase
        linked_users: [
          {
            type: 1,
            attributes: { username: '' },
          },
        ],
      },
    };
  },
  async beforeMount() {
    axios.get(`${customerURL}/user/${uuid}`).then((response) => { (this.userAccounts = response.data); });
  },
  computed: {
    getAccounts() {
      const accs = [];
      if (this.userAccounts === {}) { return []; }
      const object = {};
      object.type = this.userAccounts.type;
      object.username = this.userAccounts.attributes.username;
      accs.push(object);
      this.userAccounts.linked_users.forEach((u) => {
        const obj = {};
        obj.type = u.type;
        obj.username = u.attributes.username;
        accs.push(obj);
      });
      return accs;
    },
  },
};
</script>

<style scoped>

</style>
