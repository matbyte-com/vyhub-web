<template>
  <div>
    <v-autocomplete
      v-model="selectedUser"
      v-model:search="searchInput"
      :items="userOptions"
      item-value="id"
      item-title="username"
      :loading="loadingUsers"
      :no-data-text="$t('noDataAvailable')"
      :menu-props="{ maxHeight: '200px' }"
      label="User"
      variant="underlined"
      hide-details="auto"
      clearable
      @update:search="fetchUsers"
    >
      <template #item="{ props, item }">
        <v-list-item
          v-bind="props"
          :prepend-avatar="item.raw.avatar"
          :title="item.raw.username"
        />
      </template>
    </v-autocomplete>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  props: {
    modelValue: {
      type: String,
      default: null,
    },
  },
emits: ['update:modelValue'],
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
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
  methods: {
    async fetchUsers() {
      this.loadingUsers = true;
      (await openapi).user_getUsers({ query: this.searchInput }).then((rsp) => {
        this.userOptions = rsp.data.items;
        this.loadingUsers = false;
      });
    },
  },
};
</script>
