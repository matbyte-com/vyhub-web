<template>
  <v-data-iterator
    :items="items"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :search="searchVal"
    hide-default-footer
    v-bind="$attrs" v-on="$listeners"
  >
    <template v-slot:header v-if="search">
      <v-row justify="end">
        <v-col lg="3" md="6" sm="12" >
          <v-text-field
            v-model="searchVal"
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

    <template v-for="(_, slot) of inheritSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>

    <template v-slot:footer v-if="numberOfPages > 1">
      <v-row
        class="mt-2"
        align="center"
        justify="center"
      >
        <v-col v-if="showPageSelector">
          <span class="grey--text">Items per page</span>
          <v-menu offset-y >
            <template v-slot:activator="{ on, attrs }">
              <v-btn dark text color="primary" class="ml-2" v-bind="attrs" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-spacer></v-spacer>

        <v-col class="text-right">
                    <span class="mr-4 grey--text">
                      Page {{ page }} of {{ numberOfPages }}
                    </span>
          <v-btn small fab dark color="blue darken-3" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn small fab dark color="blue darken-3" class="ml-1" @click="nextPage" >
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>
  </v-data-iterator>
</template>

<script>
export default {
  name: 'DataIterator',
  data() {
    return {
      searchVal: '',
      filter: {},
      page: 1,
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
    itemsPerPage: {
      type: Number,
      default: 4,
    },
    showPageSelector: {
      type: Boolean,
      default: false,
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
    itemsPerPageArray() {
      if (this.items == null) {
        return [0];
      }

      const arr = [];

      for (let i = 1; i <= Math.ceil(this.items.length / this.itemsPerPage); i += 1) {
        arr.push(i * this.itemsPerPage);
      }

      return arr;
    },
    numberOfPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },
};
</script>

<style scoped>

</style>
