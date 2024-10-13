<template>
  <div>
    <v-card
      class="vh-dashboard-comment card-rounded"
      flat
    >
      <v-card-text>
        <CommentsTable
          ref="userCommentsTable"
          type="user"
          :obj-id="user.id"
          :show-search="false"
          :no-add-btn="readOnly"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>

export default {
  props: {
    user: Object,
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
