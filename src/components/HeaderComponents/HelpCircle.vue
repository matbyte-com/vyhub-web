<template>
  <v-menu
    open-on-hover
    offset-y
    eager
  >
    <template #activator="{ props }">
      <v-btn
        v-if="menuLinks.length > 0"
        icon
        style="min-width: 30px; width: 34px; height: 34px"
        v-bind="props"
      >
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>
    <v-list density="compact">
      <div
        v-for="(link, index) in menuLinks"
        :key="index"
      >
        <ListItemLink
          :sub-sub-link="false"
          :link="link"
        />
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import ListItemLink from '@/components/HeaderComponents/ListItemLink.vue';

export default {
  name: 'HelpCircle',
  components: { ListItemLink },
  props: {
    menuLinks: {
      type: Array,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
