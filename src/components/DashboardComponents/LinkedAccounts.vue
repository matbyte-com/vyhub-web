<template>
  <div>
    <v-row>
      <v-col>
        <v-card
          class="card-rounded"
          flat
        >
          <v-card-text>
            <!-- Connect User Account -->
            <div class="vh-dashboard-link-account mb-3">
              <v-row
                v-if="(userSelf || ($store.getters.user && $store.getters.user.admin))
                  && !bundle"
                no-gutters
              >
                <v-col>
                  <v-btn
                    variant="flat"
                    color="success"
                    :to="{path: $route.path,
                          query: { login: 'true', return_url: getReturnUrl() } }"
                    block
                    :disabled="!userSelf"
                  >
                    <v-icon start>
                      mdi-account-plus
                    </v-icon>
                    {{ $t("_dashboard.labels.linkNewAccount") }}
                  </v-btn>
                </v-col>
                <v-col
                  v-if="$store.getters.user &&
                    $store.getters.user.admin"
                  cols="2"
                  class="mr-1"
                >
                  <v-btn
                    block
                    variant="flat"
                    class="ml-1"
                    @click="showExistingUserLinkDialog"
                  >
                    <v-icon>mdi-link-variant-remove</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-data-iterator
              :items="linkedUsers"
              item-key="id"
              class="vh-dashboard-linked-accounts"
              hide-default-footer
            >
              <template #default="{ items }">
                <v-card
                  v-for="acc in items"
                  :key="acc.id"
                  class="mb-2"
                  border
                >
                  <v-card-title class="pb-0">
                    <v-card
                      :href="openExternalProfileLink(acc.type, acc.identifier)"
                      target="_blank"
                      width="100%"
                      flat
                      color="transparent"
                    >
                      <div class="d-flex align-center justify-space-between">
                        <v-tooltip location="bottom">
                          <template #activator="{ props }">
                            <div class="d-flex align-center">
                              <v-icon
                                class="mr-2"
                                v-bind="props"
                              >
                                {{ userTypeIcons[acc.type] }}
                              </v-icon>
                              {{ acc.username }}
                            </div>
                          </template>
                          <span>{{ $t(`_user.type.${acc.type}.name`).toUpperCase() }}</span>
                        </v-tooltip>
                        <div>
                          <v-avatar v-if="acc.type !== 'TEAMSPEAK3'">
                            <v-img
                              :src="acc.avatar"
                              alt="avatar"
                            />
                          </v-avatar>
                        </div>
                      </div>
                    </v-card>
                  </v-card-title>
                  <v-card-subtitle class="mt-0 pt-0">
                    <div
                      class="text-disabled text-caption"
                      style="
                 pointer-events: initial;"
                    >
                      <span v-if="acc.activities && acc.activities.length > 0">
                        {{ $t('_dashboard.labels.last_online') }}:
                        {{ $i18n.d(new Date(acc.activities[0].last_online), 'short') }}
                        <br>
                      </span>
                      {{ $t('_dashboard.labels.registered_on') }}:
                      {{ $i18n.d(new Date(acc.registered_on), 'short') }}
                      <br>
                      {{ acc.identifier }}
                      <span v-if="$t(`_user.type.${acc.type}.name`).toUpperCase() === 'STEAM'">
                        <br>
                        {{ getSteamid32(acc.identifier) }}
                      </span>
                    </div>
                  </v-card-subtitle>
                  <v-divider />
                  <v-card-text
                    v-if="attributes != null
                      && attributes[acc.id] != null
                      && Object.keys(attributes[acc.id]).length > 0"
                  >
                    <v-row>
                      <v-col>
                        <v-table
                          v-if="attributeDefinitions != null"
                          dense
                        >
                          <tbody>
                            <tr
                              v-for="(attrVal, attrName) in attributes[acc.id]"
                              :key="attrName"
                            >
                              <td>
                                {{ attributeDefinitionsDict[attrName].title }}
                              </td>
                              <td>
                                {{ attrVal }} {{ attributeDefinitionsDict[attrName].unit }}
                              </td>
                            </tr>
                          </tbody>
                        </v-table>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </template>
            </v-data-iterator>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <Dialog
      ref="existingUserLinkDialog"
      :title="$t('_dashboard.labels.unlinkAccount')"
      icon="mdi-link-variant-remove"
      :max-width="1000"
    >
      <v-alert
        type="warning"
        class="mt-3"
      >
        {{ $t('_dashboard.labels.unlinkAccountWarning') }}
      </v-alert>
      <div v-if="userLinks">
        <v-list
          v-for="link in userLinks"
          :key="link.id"
        >
          <v-list-item>
            <v-card width="100%">
              <v-card-text>
                <v-row
                  cols="12"
                  sm="5"
                >
                  <v-col class="d-flex align-center">
                    <v-avatar>
                      <v-img
                        :src="link.user_1.avatar"
                        alt="avatar"
                      />
                    </v-avatar>
                    <div class="ml-2">
                      {{ link.user_1.username }}
                      <br>
                      {{ link.user_1.type }}
                      <br>
                      {{ link.user_1.id }}
                    </div>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="2"
                    class="d-flex text-center justify-center align-center"
                  >
                    <div><v-icon>mdi-link-variant</v-icon></div>
                    <v-btn
                      variant="outlined"
                      size="small"
                      color="error"
                      class="ml-3"
                      @click="$refs.linkDeleteConfirmationDialog.show(link)"
                    >
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="5"
                    class="d-flex text-right justify-end align-center"
                  >
                    <div class="mr-2">
                      {{ link.user_2.username }}
                      <br>
                      {{ link.user_2.type }}
                      <br>
                      {{ link.user_2.id }}
                    </div>
                    <v-avatar>
                      <v-img
                        :src="link.user_2.avatar"
                        alt="avatar"
                      />
                    </v-avatar>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-list-item>
        </v-list>
      </div>
      <div v-if="!userLinks || userLinks.length === 0">
        {{ $t('noDataAvailable') }}
      </div>
    </Dialog>
    <ConfirmationDialog
      ref="linkDeleteConfirmationDialog"
      @submit="deleteLink"
    />
  </div>
</template>

<script>
import userService from '@/services/UserService';
import openapiCached from '@/api/openapiCached';
import UtilService from '@/services/UtilService';
import openapi from '@/api/openapi';

export default {
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
      userLinks: null,
    };
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
  watch: {
    user() {
      this.fetchData();
    },
    bundle() {
      this.fetchData();
    },
  },
  beforeMount() {
    this.fetchData();
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
    async fetchUserLinks() {
      (await openapi).user_getUserLinks(this.user.id).then((rsp) => {
        this.userLinks = rsp.data;
      });
    },
    getReturnUrl() {
      return UtilService.data().utils.getFullUrl(this.$route.path);
    },
    openExternalProfileLink(type, id) {
      return userService.userExternalLink(type, id);
    },
    getSteamid32(steamid64) {
      if (!this.user) return '';
      return this.utils.getSteamid32(steamid64);
    },
    showExistingUserLinkDialog() {
      this.fetchUserLinks();
      this.$refs.existingUserLinkDialog.show();
    },
    async deleteLink(link) {
      (await openapi).user_deleteUserLink(link.id).then(() => {
        this.$refs.linkDeleteConfirmationDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          type: 'success',
          text: this.$t('_messages.deleteSuccess'),
        });
        this.fetchUserLinks();
      }).catch((err) => {
        this.$refs.linkDeleteConfirmationDialog.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
