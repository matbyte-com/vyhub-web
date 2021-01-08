<template>
  <div>
    <PageTitle :title="$t('dashboard.labels.title', { usr: user.username })"/>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  components: {
    PageTitle,
  },
  data() {
    return {
      // user: this.$store.getters.user,
      user: {
        username: 'Nutzer 1',
      },
    };
  },
};

</script>
