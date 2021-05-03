<template>
  <v-data-table
    :items="realItems"
    :search="searchModel"
    :loading="loading"
    :item-key="itemKey"
    v-bind="$attrs" v-on="$listeners">
    <template v-slot:top>
      <v-row>
        <v-col align-self="center">
          <slot name="header">
          </slot>
        </v-col>
        <v-spacer/>
        <v-col lg="3" md="6" sm="12" v-if="search" align-self="center">
          <v-text-field
            v-model="searchModel"
            :label="$t('search')"
            hide-details
            outlined
            dense
          >
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
      <v-row>
        <v-col align-self="center">
          <slot name="footer-right">
          </slot>
        </v-col>
      </v-row>
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
    items: Array,
    search: {
      type: Boolean,
      default: false,
    },
    itemKey: {
      type: String,
      default: 'id',
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
};
</script>

<style scoped>

</style>
