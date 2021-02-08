<template>
  <v-card outlined class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-link</v-icon>
      {{ $t('dashboard.labels.linkedAccounts') }}
    </v-card-title>
    <v-card-text>
      <v-data-iterator
        :items="getAccountData"
        item-key="id"
        hide-default-footer>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="item in items"
              :key="item.id"
              sm="6">
              <v-card>
                <v-card-title>
                  <v-row>
                    <v-col>
                      <v-icon class="mr-2">mdi-steam</v-icon>
                      {{ item.type }}
                    </v-col>
                    <v-col cols="3">
                      <v-avatar
                        size="35">
                        <img :src="item.avatar"
                             size="5"
                             alt="avatar">
                      </v-avatar>
                    </v-col>
                  </v-row>
                </v-card-title>
                <v-divider />

                <v-divider />
                <v-card-text>
                  <v-row>
                    <v-col>
                      <v-list
                        dense>
                        <v-list-item
                          v-for="(value, key) in item.attributes"
                          :key="key">
                          <v-list-item-content>{{ $t(key) }}</v-list-item-content>
                          <v-list-item-content>{{ value }}</v-list-item-content>
                        </v-list-item>
                      </v-list>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </template>
      </v-data-iterator>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="success" @click="$refs.linkAccountDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t("dashboard.labels.linkNewAccount") }}</span>
      </v-btn>
      <LinkAccountDialog ref="linkAccountDialog" />
    </v-card-actions>
  </v-card>
</template>

<script>
import store from '@/store/index';
import api from '@/api/api';
import LinkAccountDialog from '@/components/LinkAccountDialog.vue';

const uuid = store.getters.user.id;

export default {
  name: 'LinkedAccounts',
  components: {
    LinkAccountDialog,
  },
  data() {
    return {
      userAccounts: {},
      attributeDefinitions: [],
      componentLoaded: false,
    };
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route(to, from) {
      this.queryData();
    },
  },
  methods: {
    queryData() {
      const username = this.$route.params.id;
      api.user.getAttributeDefinitions().then((rsp) => { this.attributeDefinitions = rsp.data; });
      api.user.getUser(username).then((rsp) => {
        this.userAccounts = rsp.data;
        this.componentLoaded = true;
      });
    },
  },
  computed: {
    getAccounts() {
      const accs = [];
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
    /**
     * get onley unspecific Accountdata
     * @returns {[]} accounts with manipulated attributes
     */
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
