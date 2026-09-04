<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col lg="3">
            <LinkedAccounts
              :user="user"
              :bundle="bundle"
              class="flex-md-grow-1"
            />
          </v-col>
          <v-col
            cols="12"
            lg="6"
            class="d-flex"
          >
            <AttributeGraph
              :user="user"
              :bundle="bundle"
              class="flex-md-grow-1"
            />
          </v-col>
          <v-col
            cols="12"
            lg="3"
          >
            <v-row
              v-if="store.isLoggedIn && $checkLinked(store.user, user) ||
                ($checkProp('ban_show') && $checkProp('warning_show'))"
            >
              <v-col>
                <v-card
                  class="card-rounded"
                  flat
                >
                  <v-card-text>
                    <BansAndWarnings
                      :user="user"
                      :bundle="bundle"
                    />
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AttributeGraph from '@/components/DashboardComponents/AttributeGraph.vue';
import LinkedAccounts from '../../LinkedAccounts.vue';
import BansAndWarnings from '../../BansAndWarnings.vue';
import { useVyHubStore } from '@/store';

export default {
  components: { AttributeGraph, LinkedAccounts, BansAndWarnings },
  props: {
    user: {
      type: Object,
      default: () => ({}),
    },
    bundle: {
      type: Object,
      default: null,
    },
  },
  computed: {
    store() {
      return useVyHubStore();
    },
  },
};
</script>

<style scoped>

</style>
