<template>
  <v-card class="flex-grow-1">
    <v-card-title>
      <v-icon class="mr-2">mdi-link</v-icon>
      {{ $t('_dashboard.labels.linkedAccounts') }}
      <v-spacer />
      <v-btn color="success" @click="$refs.linkAccountDialog.show()" outlined>
        <v-icon left>mdi-account-plus</v-icon>
        <span>{{ $t("_dashboard.labels.linkNewAccount") }}</span>
      </v-btn>
    </v-card-title>
    <v-card-text>
      <v-data-iterator
        :items="linkedUsers"
        item-key="id"
        hide-default-footer>
        <template v-slot:default="{ items }">
          <v-row>
            <v-col
              v-for="acc in items"
              :key="acc.id"
              sm="6">
              <v-card class="mt-3">
                <v-card-title>
                  <v-row>
                    <v-col>
                      <v-icon class="mr-2">
                        {{ userTypeIcons[acc.type] }}
                      </v-icon>
                      {{ acc.type }}
                    </v-col>
                    <v-col cols="3">
                      <v-avatar
                        size="35">
                        <img :src="acc.avatar"
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
                        <v-list-item>
                          <v-list-item-content>{{ $t('id') }}</v-list-item-content>
                          <v-list-item-content>{{ acc.identifier }}</v-list-item-content>
                        </v-list-item>
                        <v-list-item>
                          <v-list-item-content>{{ $t('username') }}</v-list-item-content>
                          <v-list-item-content>{{ acc.username }}</v-list-item-content>
                        </v-list-item>
                        <div v-if="attributeDefinitions != null">
                          <v-list-item
                            v-for="(attrVal, attrName) in acc.attributes"
                            :key="attrName">
                            <v-list-item-content>
                              {{ attributeDefinitionsDict[attrName].title }}
                            </v-list-item-content>
                            <v-list-item-content>
                              {{ attrVal }} {{ attributeDefinitionsDict[attrName].unit }}
                            </v-list-item-content>
                          </v-list-item>
                        </div>
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
    <LinkAccountDialog ref="linkAccountDialog" />
  </v-card>
</template>

<script>
import LinkAccountDialog from '@/components/LinkAccountDialog.vue';
import userService from '@/services/UserService';
import openapiCached from '@/api/openapiCached';
import openapi from '@/api/openapi';

export default {
  name: 'LinkedAccounts',
  components: {
    LinkAccountDialog,
  },
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
      return null;
    },
  },
};
</script>

<style scoped>

</style>
