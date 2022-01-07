<template>
  <DataTable
    :externalSearch="searchBar"
    :server-items-length="totalItems"
    :items-per-page.sync="itemsPerPage"
    :page.sync="page"
    :sort-by.sync="sortBy"
    :sort-desc.sync="sortDesc"
    :search.sync="search"
    must-sort
    v-bind="$attrs" v-on="$listeners"
  >
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </DataTable>
</template>

<script>
import DataTable from '@/components/DataTable.vue';

export default {
  name: 'PaginatedDataTable',
  components: { DataTable },
  data() {
    return {
      page: 1,
      itemsPerPage: 10,
      selectedBundle: [],
      sortBy: null,
      sortDesc: true,
      search: null,
      lastParams: null,
      new: true,
    };
  },
  props: {
    totalItems: {
      type: Number,
      default: 0,
    },
    defaultSortBy: {
      type: String,
      default: null,
    },
    defaultSortDesc: {
      type: Boolean,
      default: false,
    },
    searchBar: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    getQueryParameters() {
      return this.queryParams;
    },
  },
  computed: {
    queryParams() {
      return {
        size: this.itemsPerPage,
        page: this.page,
        sort_by: this.sortBy,
        sort_desc: this.sortDesc,
        query: this.search,
      };
    },
  },
  beforeMount() {
    this.sortBy = this.defaultSortBy;
    this.sortDesc = this.defaultSortDesc;
  },
  watch: {
    queryParams() {
      const params = { ...this.queryParams };
      this.lastParams = { ...params };

      if (this.new) {
        this.$emit('reload', this.queryParams);
        this.new = false;
        return;
      }

      setTimeout(() => {
        if (JSON.stringify({ ...this.lastParams }) === JSON.stringify(params)) {
          this.$emit('reload', this.queryParams);
        }
      }, 200);
    },
  },
};
</script>
