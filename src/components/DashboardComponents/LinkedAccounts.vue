<template>
  <div>
    <h2 class="text-h4">{{ $t("dashboard.labels.linkedAccounts") }}</h2>
    <v-divider class="mb-3"/>
    <v-data-iterator
      :items="getAccountData"
      item-key="id"
      hide-default-footer>
      <template v-slot:default="{ items }">
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12">
          <v-card>
            <v-card-title>
              <h4>{{ item.type }}</h4>
            </v-card-title>
            <v-divider />
            <v-list
              dense>
              <v-list-item
                v-for="(value, key) in item.attributes"
                :key="key">
                <v-list-item-content>{{ key }}</v-list-item-content>
                <v-list-item-content>{{ value }}</v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </template>
    </v-data-iterator>
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
      userAccounts: {},
      attributeDefinitions: [],
      componentLoaded: false,
    };
  },
  beforeMount() {
    axios.get(`${customerURL}/user/${uuid}`).then((response) => { this.userAccounts = response.data; this.componentLoaded = true; });
    axios.get(`${customerURL}/user/attribute/definitions`).then((response) => { this.attributeDefinitions = response.data; });
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
    getAccountData() {
      if (!this.componentLoaded) { return []; }
      const accs = [];
      accs.push(this.userAccounts);
      this.userAccounts.linked_users.forEach((u) => {
        accs.push(u);
      });
      // delete bundle specific user_attributes
      this.attributeDefinitions.forEach((attr) => {
        if (attr.unspecific === false) {
          delete accs.find((a) => a.type === attr.user_type).attributes[attr.name];
        }
      });
      return accs;
    },
  },
};
</script>

<style scoped>

</style>
