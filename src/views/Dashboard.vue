<template>
  <div>
    <PageTitle :title="$t('dashboard.labels.title', { usr: user.username })"/>
    <TabComponent ref="tabComponent" :tabs="tabs" @change="switchTab"/>
    <v-card class="mt-3 mb-3">
      <keep-alive>
        <component :is="component"></component>
      </keep-alive>
    </v-card>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import TabComponent from '@/components/TabComponent.vue';
import LinkedAccount from '@/components/DashboardComponents/LinkedAccounts.vue';
import Groups from '@/components/DashboardComponents/Groups.vue';

export default {
  components: {
    PageTitle,
    TabComponent,
    General: LinkedAccount,
    Bundle1: Groups,
  },
  data() {
    return {
      // user: this.$store.getters.user,
      user: {
        username: 'Nutzer 1',
      },
      tabs: [
        {
          title: 'General', icon: 'mdi-adjust',
        },
        {
          title: 'Bundle1', icon: 'mdi-alpha-m-circle',
        },
        {
          title: 'Bundle2', icon: 'mdi-alpha-g-circle',
        },
      ],
      component: LinkedAccount,
    };
  },
  methods: {
    switchTab(payload) {
      this.component = this.tabs[payload].title;
    },
  },
};

</script>
