<template>
  <v-menu open-on-hover offset-y eager>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon dark v-bind="attrs" v-on="on" v-if="allowedLinks.length > 0">
        <v-icon>mdi-help-circle</v-icon>
      </v-btn>
    </template>
    <v-list dense>
      <div v-for="(link, index) in allowedLinks"
           :key="index">
        <v-list-item :to="link.link">
          <v-icon left>{{ link.icon }}</v-icon>
          <v-list-item-title>
            {{ $t(link.title) }}
          </v-list-item-title>
        </v-list-item>
      </div>
    </v-list>
  </v-menu>
</template>

<script>
import emitter from '@/services/EventBus';

export default {
  name: 'HelpCircle',
  data() {
    return {
      menuLinks: [
        {
          title: 'team', icon: 'mdi-account-group', link: '/team', config: 'enable_team',
        },
        {
          title: '_ticket.ticket', icon: 'mdi-ticket-confirmation', link: '/ticket', config: 'enable_ticket',
        },
      ],
    };
  },
  computed: {
    allowedLinks() {
      const res = [];
      this.menuLinks.forEach((m) => {
        if (this.$store.getters.generalConfig[m.config]) { res.push(m); }
      });
      return res;
    },
  },
};
</script>

<style scoped>

</style>
