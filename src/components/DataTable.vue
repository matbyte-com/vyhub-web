<template>
  <v-data-table
    :items="realItems"
    :search="externalSearch ? null : searchModel"
    :loading="loading"
    :item-key="itemKey"
    :footer-props="footerProps"
    v-bind="$attrs"
    v-on="$listeners"
  >
    Test
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
    <template #footer.page-text>
      <slot name="footer-right" />
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
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    externalSearch: {
      type: Boolean,
      default: false,
    },
    items: Array,
    showSearch: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
    },
    footerProps: {
      type: Object,
      default() {
        return {
          'items-per-page-options': [5, 10, 25, 50],
        };
      },
    },
  },
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
      const slots = { ...this.$slots };

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
