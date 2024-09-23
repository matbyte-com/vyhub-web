<template>
  <div>
    <v-autocomplete
      v-model="selectedUser"
      v-model:search="searchInput"
      :items="userOptions"
      item-value="id"
      item-title="username"
      item-icon="avatar"
      :loading="loadingUsers"
      :no-data-text="$t('noDataAvailable')"
      :menu-props="{ maxHeight: '200px' }"
      :debounce-search="300"
      label="User"
      @update:search="fetchUsers"
    />
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
  methods: {
    async fetchUsers() {
      this.loadingUsers = true;
      (await openapi).user_getUsers({ query: this.searchInput }).then((rsp) => {
        this.userOptions = rsp.data;
        this.loadingUsers = false;
      });
    },
  },
};
</script>
