<template>
  <DataTable
    v-model:items-per-page="itemsPerPage"
    v-model:page="page"
    v-model:search="search"
    v-model:sort-by="sortBy"
    serverside
    :external-search="showSearch"
    :items-length="totalItems"
    multi-sort
    v-bind="$attrs"
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

export default {
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
      sortBy: [],
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
        sort_by: this.sortBy.map((s) => s.key),
        sort_desc: this.sortBy.map((s) => s.order === 'desc'),
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
    if (this.defaultSortBy) {
      this.sortBy.push({
        key: this.defaultSortBy,
        order: this.defaultSortDesc ? 'desc' : 'asc',
      });
    }
  },
  methods: {
    getQueryParameters() {
      return this.queryParams;
    },
  },
};
</script>
