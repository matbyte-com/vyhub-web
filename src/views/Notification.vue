<template>
<div>
  <PageTitle icon="mdi-bell-outline">{{ $t('notification.notifications') }}</PageTitle>
</div>
</template>

<script>
import PageTitle from '@/components/PageTitle.vue';

export default {
  name: 'Notification.vue',
  components: { PageTitle },
};
</script>

<style scoped>

</style>
