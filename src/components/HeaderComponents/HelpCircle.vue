<template>
  <v-menu open-on-hover offset-y eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on" v-if="menuLinks.length > 0">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <div v-for="(link, index) in menuLinks"
           :key="index">
        <v-list-item :to="link.link">
          <v-icon left>{{ link.icon }}</v-icon>
          <v-list-item-title>
            {{ link.title }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: 'HelpCircle',
  data() {
    return {
    };
  },
  props: {
    menuLinks: {
      type: Array,
    },
  },
  computed: {
  },
};
</script>

<style scoped>

</style>
