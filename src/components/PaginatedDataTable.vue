<template>
  <DataTable
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    v-model:sort-by="sortBy"
    v-model:sort-desc="sortDesc"
    v-model:search="search"
    :external-search="showSearch"
    :server-items-length="totalItems"
    must-sort
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template
      v-for="(_, slot) of $slots"
      #[slot]="scope"
    >
      <slot
        :name="slot"
        v-bind="scope"
      />
    </template>
  </DataTable>
</template>

<script>
import DataTable from '@/components/DataTable.vue';

export default {
  name: 'PaginatedDataTable',
  components: { DataTable },
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
    showSearch: {
      type: Boolean,
      default: true,
    },
  },
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
  beforeMount() {
    this.sortBy = this.defaultSortBy;
    this.sortDesc = this.defaultSortDesc;
  },
  methods: {
    getQueryParameters() {
      return this.queryParams;
    },
  },
};
</script>
