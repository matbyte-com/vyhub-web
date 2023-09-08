<template>
  <div>
    <v-card class="vh-dashboard-comment card-rounded" flat>
      <v-card-text>
        <CommentsTable type="user" :obj-id="user.id" :show-search="false"
                       class="mt-5"
                       ref="userCommentsTable" />
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CommentsTable from '@/components/Comments/CommentsTable.vue';

export default {
  components: { CommentsTable },
  props: { user: Object },
  data() {
    return {
    };
  },
};
</script>

<style scoped>

</style>
