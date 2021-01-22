<template>
  <div>
    <v-row>
      <v-col>
        <h2 class="text-h4">{{ $t("dashboard.labels.linkedAccounts") }}</h2>
      </v-col>
      <v-col>
        <span class="float-right">
          <v-btn color="secondary" depressed>
            <v-icon left>mdi-plus</v-icon>
            <span>{{ $t("dashboard.labels.linkNewAccount") }}</span>
          </v-btn>
        </span>
      </v-col>
    </v-row>
    <v-divider class="mb-3"/>
    <v-data-iterator
      :items="getAccountData"
      item-key="id"
      hide-default-footer>
      <template v-slot:default="{ items }">
        <v-row>
          <v-col
            v-for="item in items"
            :key="item.id"
            cols="12"
            sm="6"
            lg="6">
            <v-card>
              <v-card-title>
                <v-row>
                  <v-col cols="2"></v-col>
                  <v-col><h4>{{ item.type }}</h4></v-col>
                </v-row>
              </v-card-title>
              <v-divider />
              <v-list
                dense>
                <v-list-item
                  v-for="(value, key) in item.attributes"
                  :key="key">
                  <v-list-item-content>{{ $t(key) }}</v-list-item-content>
                  <v-list-item-content>{{ value }}</v-list-item-content>
                </v-list-item>
              </v-list>
            </v-card>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
import store from '@/store/index';
import api from '@/api/api';

const uuid = store.getters.user.id;

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
    api.user.getAttributeDefinitions().then((rsp) => { this.attributeDefinitions = rsp.data; });
    api.user.getUser(uuid).then((rsp) => {
      this.userAccounts = rsp.data;
      this.componentLoaded = true;
    });
  },
  computed: {
    getAccounts() {
      const accs = [];
      // if (this.userAccounts === {}) { return []; }
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
