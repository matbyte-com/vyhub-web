<template>
  <v-data-table
    :headers="headers"
    :items="realItems"
    :search="searchModel"
    :sort-by="['created_on']"
    :sort-desc="[true]"
    :loading="loading"
    :item-class="itemClass">
    <template v-slot:top>
      <v-row>
        <v-col align-self="center">
          <slot name="header">
          </slot>
        </v-col>
        <v-spacer/>
        <v-col lg="2" md="4" sm="12" v-if="search" align-self="center">
          <v-text-field
            v-model="searchModel"
            label="Search"
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
    headers: Array,
    items: Array,
    search: {
      type: Boolean,
      default: false,
    },
    sortBy: Array,
    sortDesc: Array,
    itemClass: Function,
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
