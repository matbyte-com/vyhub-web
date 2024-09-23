<template>
  <div>
    <AllBundleDashboard
      :user="user"
      :bundle="bundle"
    />
  </div>
</template>

<script>
import AllBundleDashboard
  from '@/components/DashboardComponents/Dashboards/Bundle/AllBundleDashboard.vue';

export default {
  components: { AllBundleDashboard },
  props: {
    user: Object,
    bundle: Object,
  },
};
</script>

<style scoped>

</style>
