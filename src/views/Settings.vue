<template>
  <div>
    <PageTitle :title="$t('settings.labels.title')" />
    <v-row
    no-gutters>
      <v-col
      cols="2">
        <v-card flat outlined>
          <v-tabs @change="switchTab" vertical>
            <v-tab v-for="tab in tabs" :key="tab.id">
              <v-icon left>{{ tab.icon }}</v-icon>
              <span>{{ tab.name }}</span>
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="mb-3 pa-3" flat outlined>
          <keep-alive>
            <component :is="componentInstance"></component>
          </keep-alive>
        </v-card>
      </v-col>
    </v-row>
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
      activeTab: 0,
      tabs: [
        {
          name: 'General', icon: 'mdi-cog', component: '123',
        },
        {
          name: 'Theme', icon: 'mdi-format-color-fill', component: 'ThemeChanger',
        },
      ],
    };
  },
  methods: {
    switchTab(payload) {
      this.activeTab = this.tabs[payload].component;
    },
  },
  computed: {
    componentInstance() {
      const type = this.activeTab;
      return () => import(`@/components/SettingComponents/${type}`);
    },
  },
};
</script>
