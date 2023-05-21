<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col lg="3">
            <LinkedAccounts :user="user" :bundle="bundle" class="flex-md-grow-1" />
          </v-col>
          <v-col cols="12" lg="6" class="d-flex">
            <AttributeGraph :user="user" :bundle="bundle" class="flex-md-grow-1" />
          </v-col>
          <v-col cols="12" lg="3">
            <v-row v-if="$store.getters.isLoggedIn && $checkLinked($store.getters.user, user) ||
                ($checkProp('ban_show') && $checkProp('warning_show'))">
              <v-col>
                <BansAndWarnings :user="user" :bundle="bundle"/>
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

export default {
  components: { AttributeGraph, LinkedAccounts, BansAndWarnings },
  props: {
    user: Object,
    bundle: Object,
  },
};
</script>

<style scoped>

</style>
