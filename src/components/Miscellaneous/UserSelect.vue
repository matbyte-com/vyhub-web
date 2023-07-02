<template>
  <div>
    <v-autocomplete
      v-model="selectedUser"
      :items="userOptions"
      item-value="id"
      item-text="username"
      item-icon="avatar"
      :loading="loadingUsers"
      :search-input.sync="searchInput"
      :no-data-text="$t('noDataAvailable')"
      :menu-props="{ maxHeight: '200px' }"
      :debounce-search="300"
      @update:search-input="fetchUsers"
      label="User"/>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    value: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      userOptions: [],
      loadingUsers: false,
      searchInput: '',
    };
  },
  methods: {
    async fetchUsers() {
      this.loadingUsers = true;
      (await openapi).user_getUsers(null, { query: this.searchInput }).then((rsp) => {
        this.userOptions = rsp.data;
        this.loadingUsers = false;
      });
    },
  },
  computed: {
    selectedUser: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>
