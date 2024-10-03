<template>
  <v-menu
    open-on-hover
    location="bottom"
    eager
  >
    <template #activator="{ props }">
      <v-btn
        v-if="menuLinks.length > 0"
        icon="mdi-help-circle"
        style="min-width: 30px; width: 34px; height: 34px"
        v-bind="props"
      />
    </template>
    <v-card flat>
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
    </v-card>
  </v-menu>
</template>

<script>

export default {
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
