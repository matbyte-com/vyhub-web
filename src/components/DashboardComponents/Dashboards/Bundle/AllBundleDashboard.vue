<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col cols="12" xl="8" class="d-flex">
            <AttributeGraph :user="user" :bundle="bundle" class="flex-md-grow-1" />
          </v-col>
          <v-col>
            <LinkedAccounts :user="user" :bundle="bundle" class="flex-md-grow-1" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AttributeGraph from '@/components/DashboardComponents/AttributeGraph.vue';
import LinkedAccounts from '../../LinkedAccounts.vue';

export default {
  components: { AttributeGraph, LinkedAccounts },
  props: {
    user: Object,
    bundle: Object,
  },
};
</script>

<style scoped>

</style>
