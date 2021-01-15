<template>
  <div>
    <v-card class="ma-3 pa-3" max-width="600px">
      <Groups />
    </v-card>
    <v-card class="ma-3 pa-3" max-width="500px">
      <LinkedAccounts />
    </v-card>

  </div>
</template>

<script>
import Groups from '@/components/DashboardComponents/Groups.vue';
import LinkedAccounts from '@/components/DashboardComponents/LinkedAccounts.vue';

export default {
  name: 'General.vue',
  components: {
    Groups,
    LinkedAccounts,
  },
};
</script>

<style scoped>

</style>
