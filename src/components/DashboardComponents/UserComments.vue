<template>
  <div>
    <v-card>
      <v-card-title>
        <v-icon left>
          mdi-comment
        </v-icon>
        {{ $t('comments') }}
      </v-card-title>
      <v-card-text>
        <CommentsTable type="user" :obj-id="user.id" :show-search="false"
                       ref="userCommentsTable">
        </CommentsTable>
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
