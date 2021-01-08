<template>
  <div>
    <PageTitle :title="$t('dashboard.labels.title', { usr: user.username })"/>
    <TabComponent :tabs="tabs"/>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';
import TabComponent from '@/components/TabComponent.vue';

export default {
  components: {
    PageTitle,
    TabComponent,
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
    };
  },
};

</script>
