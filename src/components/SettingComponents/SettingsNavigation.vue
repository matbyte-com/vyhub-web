<script>
export default {
  props: ['activeTab', 'allowedTabs'],
  methods: {
  }
}

</script>

<template>
  <div>
    <v-list class="bg-transparent overflow-visible">
      <span
        v-for="tab in allowedTabs"
        :key="tab.id"
      >
        <v-list-item
          v-if="!('tabs' in tab)"
          style="height: 48px"
          link
          :disabled="tab.disabled"
          :class="{ 'active v-list-item--active' :
                      tab.name === activeTab.name,
                    'glow-effect': utils.customerJourneyActive(tab.customerJourney) }"
          :to="{ name: 'Settings', params: { component: tab.name} }"
        >
          <v-list-item-title
            :class="!utils.showAdvancedSettings()
              && tab.advanced ? 'text-disabled' : ''"
          >
            <v-icon start>{{ tab.icon }}</v-icon>
            {{ tab.title }}
          </v-list-item-title>
        </v-list-item>
        <v-list-group
          v-else
          :value="$vuetify.display.lgAndUp"
        >
          <template #activator="{ props }">
            <v-list-item
              v-bind="props"
              :class="{'glow-effect':
                utils.customerJourneyActive(tab.customerJourney)}"
              style="height: 48px"
            >
              <v-list-item-title class="ml-0 pl-0">
                <v-icon start>{{ tab.icon }}</v-icon>
                {{ tab.title }}</v-list-item-title>
            </v-list-item>
          </template>

          <v-list-item
            v-for="subtab in tab.tabs"
            :key="subtab.id"
            link
            style="height: 48px"
            :class="{ 'active v-list-item--active':
                        subtab.name === activeTab.name,
                      'glow-effect':
                        utils.customerJourneyActive(subtab.customerJourney) }"
            :to="{ name: 'Settings', params: { component: subtab.name} }"
          >
            <v-list-item-title>
              <v-icon start>{{ subtab.icon }}</v-icon>
              {{ subtab.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list-group>
      </span>
    </v-list>
  </div>
</template>

<style scoped>

</style>
