<template>
  <div>
    <v-row v-if="userSelf">
      <v-col>
        <v-tooltip left :disabled="checkIfCentralAccount()" offset-overflow>
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <v-card>
                <v-btn color="success" width="100%" :to="{path: $route.path,
              query: { login: 'true', return_url: getReturnUrl() } }"
                       :disabled="!checkIfCentralAccount()" block>
                  <v-icon left>
                    mdi-account-plus
                  </v-icon>
                  {{ $t("_dashboard.labels.linkNewAccount") }}
                </v-btn>
              </v-card>
            </div>
          </template>
          <span>{{ $t('header.labels.linkAccountTooltip') }}</span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-data-iterator
          :items="linkedUsers"
          item-key="id"
          hide-default-footer>
          <template v-slot:default="{ items }">
            <v-card class="mb-2" v-for="acc in items"
                    :key="acc.id">
              <v-card-title>
                <v-row>
                  <v-col>
                    <v-icon class="mr-2">
                      {{ userTypeIcons[acc.type] }}
                    </v-icon>
                    {{ acc.username }}
                  </v-col>
                  <v-col cols="3" lg="4" xl="3" class="justify-center">
                    <v-avatar>
                      <v-img :src="acc.avatar" contain
                             alt="avatar"/>
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-subtitle>
                {{ $t(`_user.type.${acc.type}.name`).toUpperCase() }}
                <div class="text--disabled caption">
                  {{ acc.identifier }}
                </div>
              </v-card-subtitle>
              <v-divider/>
              <v-card-text v-if="Object.keys(acc.attributes).length > 0">
                <v-row>
                  <v-col>
                    <v-simple-table
                      dense v-if="attributeDefinitions != null">
                      <tbody>
                      <tr
                        v-for="(attrVal, attrName) in unspecificAttributes"
                        :key="attrName">
                        <td>
                          {{ attributeDefinitionsDict[attrName].title }}
                        </td>
                        <td>
                          {{ attrVal }} {{ attributeDefinitionsDict[attrName].unit }}
                        </td>
                      </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </template>
        </v-data-iterator>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import userService from '@/services/UserService';
import openapiCached from '@/api/openapiCached';
import UtilService from '@/services/UtilService';

export default {
  name: 'LinkedAccounts',
  props: {
    user: Object,
  },
  data() {
    return {
      userAccounts: null,
      attributeDefinitions: null,
      componentLoaded: false,
      userTypeIcons: userService.userTypeIcons,
    };
  },
  beforeMount() {
    this.queryData();
  },
  watch: {
    $route() {
      this.queryData();
    },
  },
  methods: {
    async queryData() {
      (await openapiCached).user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;
      });
    },
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
    checkIfCentralAccount() {
      if (this.$store.getters.user) {
        return this.$store.getters.user.type === 'CENTRAL';
      }
      return false;
    },
  },
  computed: {
    linkedUsers() {
      return [this.user, ...this.user.linked_users];
    },
    attributeDefinitionsDict() {
      if (this.attributeDefinitions == null) {
        return null;
      }

      const defDict = {};

      this.attributeDefinitions.forEach((def) => {
        defDict[def.name] = def;
      });

      return defDict;
    },
    unspecificAttributes() {
      if (this.attributeDefinitionsDict == null) {
        return {};
      }

      const unspecificAttributes = {};

      Object.entries(this.user.attributes).forEach(([key, value]) => {
        if (this.attributeDefinitionsDict[key].unspecific) {
          unspecificAttributes[key] = value;
        }
      });

      return unspecificAttributes;
    },
    userSelf() {
      if (!this.$store.getters.isLoggedIn) {
        return false;
      }

      if (this.user.id === this.$store.getters.user.id) {
        return true;
      }

      if (this.user.id in this.$store.getters.user.linked_users.map((lu) => lu.id)) {
        return true;
      }

      return false;
    },
  },
};
</script>

<style scoped>

</style>
