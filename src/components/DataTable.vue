<template>
  <v-data-table
    :items="realItems"
    :search="externalSearch ? null : searchModel"
    :loading="loading"
    :item-key="itemKey"
    :footer-props="footerProps"
    v-bind="$attrs" v-on="$listeners">
    <template v-slot:top>
      <v-row dense>
        <v-col align-self="center">
          <slot name="header">
          </slot>
        </v-col>
        <v-spacer v-if="!$slots.header && !$scopedSlots.header"/>
        <v-col lg="3" md="6" sm="12" v-if="showSearch || externalSearch" align-self="center">
          <v-text-field
            v-model="searchModel"
            :label="$t('search')"
            hide-details
            outlined
            dense
            @input="$emit('search', searchModel)">
            <template v-slot:prepend-inner>
              <v-icon>
                mdi-magnify
              </v-icon>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </template>
    <template v-slot:footer.page-text>
      <slot name="footer-right" />
    </template>
    <template v-for="(_, slot) of inheritSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: 'DataTable',
  data() {
    return {
      searchModel: null,
    };
  },
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
  computed: {
    loading() {
      return this.items == null;
    },
    inheritSlots() {
      const slots = this.$scopedSlots;

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
