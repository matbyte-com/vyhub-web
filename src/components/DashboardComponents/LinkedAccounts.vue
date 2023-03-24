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
                    >
              <v-card-title class="pb-0">
                <v-card :href="openExternalProfileLink(acc.type, acc.identifier)" target="_blank"
                        width="100%" flat color="transparent">
                  <div class="d-flex align-center justify-space-between">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <div class="d-flex align-center">
                          <v-icon class="mr-2" v-bind="attrs" v-on="on">
                            {{ userTypeIcons[acc.type] }}
                          </v-icon>
                          {{ acc.username }}
                        </div>
                      </template>
                      <span>{{ $t(`_user.type.${acc.type}.name`).toUpperCase() }}</span>
                    </v-tooltip>
                    <div>
                      <v-avatar v-if="acc.type !== 'TEAMSPEAK3'">
                        <v-img :src="acc.avatar" contain
                               alt="avatar"/>
                      </v-avatar>
                    </div>
                  </div>
                </v-card>
              </v-card-title>
              <v-card-subtitle class="mt-0 pt-0">
                <div class="text--disabled caption" style="
                 pointer-events: initial;">
                  <span v-if="acc.activities.length > 0">
                    {{ $t('_dashboard.labels.last_online') }}:
                    {{ $i18n.d(new Date(acc.activities[0].last_online), 'short') }}
                    <br/>
                  </span>
                  {{ $t('_dashboard.labels.registered_on') }}:
                  {{ $i18n.d(new Date(acc.registered_on), 'short') }}
                  <br/>
                  {{ acc.identifier }}
                  <span v-if="$t(`_user.type.${acc.type}.name`).toUpperCase() === 'STEAM'">
                    <br/>
                    {{ getSteamid32(acc.identifier) }}
                  </span>
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
      return userService.userExternalLink(type, id);
    },
    getSteamid32(steamid64) {
      if (!this.user) return '';
      const v = BigInt('76561197960265728');
      let w = BigInt(steamid64);
      const y = (w % 2n).toString();

      w = w - BigInt(y) - v;
      if (w < 1n) {
        return false;
      }
      return `STEAM_0:${y}:${(w / 2n).toString()}`;
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
