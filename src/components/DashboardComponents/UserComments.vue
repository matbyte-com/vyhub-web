<template>
  <div>
    <v-card class="vh-dashboard-comment card-rounded" flat>
      <v-card-text>
        <CommentsTable type="user" :obj-id="user.id" :show-search="false"
                       class="mt-5" :noAddBtn="readOnly"
                       ref="userCommentsTable" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CommentsTable from '@/components/Comments/CommentsTable.vue';

export default {
  components: { CommentsTable },
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
