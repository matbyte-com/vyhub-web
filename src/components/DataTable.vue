<template>
  <component
    :is="serverside ? 'v-data-table-server' : 'v-data-table'"
    :items="realItems"
    :search="externalSearch ? null : searchModel"
    :loading="loading"
    :item-key="itemKey"
    v-bind="$attrs"
    :items-per-page-options="[5, 10, 25, 50]"
  >
    <template #top>
      <v-row dense>
        <v-col align-self="center">
          <slot name="header" />
        </v-col>
        <v-spacer v-if="!$slots.header && !$slots.header" />
        <v-col
          v-if="showSearch || externalSearch"
          lg="3"
          md="6"
          sm="12"
          align-self="center"
        >
          <v-text-field
            v-model="searchModel"
            :label="$t('search')"
            hide-details
            variant="outlined"
            density="compact"
            @update:model-value="$emit('search', searchModel)"
          >
            <template #prepend-inner>
              <v-icon>
                mdi-magnify
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </template>
    <template #footer.prepend>
      <div class="mr-3">
        <slot
          name="footer-right"
        />
      </div>
    </template>
    <!-- Friendly empty state instead of the bare "No data available" text.
         Skipped when the caller supplies its own no-data slot. -->
    <template
      v-if="!$slots['no-data']"
      #no-data
    >
      <div class="d-flex flex-column align-center justify-center text-medium-emphasis py-8">
        <v-icon
          size="40"
          class="mb-2"
        >
          mdi-database-off-outline
        </v-icon>
        <span>{{ $t('noDataAvailable') }}</span>
      </div>
    </template>
    <template
      v-for="(_, slot) of inheritSlots"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </component>
</template>

<script>
export default {
  props: {
    externalSearch: {
      type: Boolean,
      default: false,
    },
    items: {
      type: Array,
      default: null,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    serverside: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:search', 'search'],
  data() {
    return {
      searchModel: null,
    };
  },
  computed: {
    loading() {
      return this.items == null;
    },
    inheritSlots() {
      if (!this.$slots) {
        return {};
      }
      const slots = {...this.$slots};

      if ('header' in slots) {
        delete slots.header;
      }

      return slots;
    },
    realItems() {
      if (this.items) {
        return this.items;
      }

      return [];
    },
  },
  watch: {
    searchModel() {
      this.$emit('update:search', this.searchModel);
    },
  },
};
</script>
