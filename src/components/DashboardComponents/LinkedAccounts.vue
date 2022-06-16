<template>
  <div>
    <v-row v-if="userSelf && !bundle">
      <v-col>
        <v-card>
          <v-btn color="success" width="100%" :to="{path: $route.path,
        query: { login: 'true', return_url: getReturnUrl() } }"
                block>
            <v-icon left>
              mdi-account-plus
            </v-icon>
            {{ $t("_dashboard.labels.linkNewAccount") }}
          </v-btn>
        </v-card>
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
                    :key="acc.id"
                    @click="openExternalProfileLink(acc.type, acc.identifier)">
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
                  <span v-if="acc.activities.length > 0">
                    {{ $t('_dashboard.labels.last_online') }}:
                    {{ $i18n.d(new Date(acc.activities[0].last_online), 'short') }}
                    <br/>
                  </span>
                  {{ $t('_dashboard.labels.registered_on') }}:
                  {{ $i18n.d(new Date(acc.registered_on), 'short') }}
                  <br/>
                  {{ acc.identifier }}
                </div>
              </v-card-subtitle>
              <v-divider/>
              <v-card-text v-if="attributes != null
              && attributes[acc.id] != null
              && Object.keys(attributes[acc.id]).length > 0">
                <v-row>
                  <v-col>
                    <v-simple-table
                      dense v-if="attributeDefinitions != null">
                      <tbody>
                        <tr
                          v-for="(attrVal, attrName) in attributes[acc.id]"
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
import openapi from '@/api/openapi';

export default {
  name: 'LinkedAccounts',
  props: {
    user: Object,
    bundle: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      serverTypeUserTypeMapping: null,
      userAccounts: null,
      attributeDefinitions: null,
      componentLoaded: false,
      userTypeIcons: userService.userTypeIcons,
      currentAttributes: {},
    };
  },
  beforeMount() {
    this.fetchData();
  },
  watch: {
    user() {
      this.fetchData();
    },
    bundle() {
      this.fetchData();
    },
  },
  methods: {
    async fetchData() {
      const api = await openapi;
      const apiCached = await openapiCached;

      apiCached.user_getAttributeDefinitions().then((rsp) => {
        this.attributeDefinitions = rsp.data;
      });

      if (this.bundle != null) {
        apiCached.server_getServerTypeToUserType().then((rsp) => {
          this.serverTypeUserTypeMapping = rsp.data;

          const newCurrAttrs = {};

          this.linkedUsers.forEach((user) => {
            api.user_getCurrentAttributes({
              uuid: user.id,
              serverbundle_id: this.bundle.id,
            }).then((rsp2) => {
              newCurrAttrs[user.id] = rsp2.data;
              this.currentAttributes = newCurrAttrs;
            });
          });
        });
      }
    },
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
    openExternalProfileLink(type, id) {
      const link = userService.userExternalLink(type, id);

      if (link != null) {
        window.open(link, '_blank').focus();
      }
    },
  },
  computed: {
    linkedUsers() {
      const res = [this.user, ...this.user.linked_users];
      if (this.bundle == null) {
        return res;
      }
      if (this.serverTypeUserTypeMapping == null) return [];
      const allowedUserType = this.serverTypeUserTypeMapping[this.bundle.server_type];
      return res.filter((r) => r.type === allowedUserType);
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
    attributes() {
      if (this.attributeDefinitionsDict == null) {
        return {};
      }

      if (this.bundle == null) {
        const unspecificAttributes = {};

        this.linkedUsers.forEach((user) => {
          unspecificAttributes[user.id] = {};

          Object.entries(user.attributes).forEach(([key, value]) => {
            if (this.attributeDefinitionsDict[key].unspecific) {
              unspecificAttributes[user.id][key] = value;
            }
          });
        });

        return unspecificAttributes;
      }

      const attributes = {};

      this.linkedUsers.forEach((user) => {
        if (Object.hasOwn(this.currentAttributes, user.id)) {
          attributes[user.id] = this.currentAttributes[user.id];
        }
      });

      return attributes;
    },
    userSelf() {
      if (!this.$store.getters.isLoggedIn) {
        return false;
      }

      if (this.$checkLinked(this.user, this.$store.getters.user)) {
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
