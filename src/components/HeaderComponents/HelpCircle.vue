<template>
  <v-menu open-on-hover offset-y eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" v-if="menuLinks.length > 0">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <div v-for="(link, index) in menuLinks"
           :key="index">
       <ListItemLink :sub-sub-link="false" :link="link"/>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import ListItemLink from '@/components/HeaderComponents/ListItemLink.vue';

export default {
  name: 'HelpCircle',
  components: { ListItemLink },
  data() {
    return {
    };
  },
  props: {
    menuLinks: {
      type: Array,
    },
  },
};
</script>

<style scoped>

</style>
