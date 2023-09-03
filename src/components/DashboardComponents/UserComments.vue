<template>
  <div>
    <v-card class="vh-dashboard-comment card-rounded" flat>
      <v-card-title>
        <v-icon left>
          mdi-comment
        </v-icon>
        {{ $t('comments') }}
        <v-spacer />
        <v-btn outlined color="success"
               @click="$refs.userCommentsTable.$refs.commentAddDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          {{ $t('comment') }}
        </v-btn>
      </v-card-title>
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
