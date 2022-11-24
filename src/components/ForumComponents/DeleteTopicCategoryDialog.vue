<template>
  <ConfirmationDialog btn-icon="mdi-delete" :btn-text="$t('delete')" :text="text" @submit="submit"
                      :countdown="countdown"
                      ref="DeleteTopicCategoryDialog"
  >
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <v-text-field :v-model="confirmationText" :label="$t('__forum.confirmdelete')"/>
  </ConfirmationDialog>
</template>

<script>
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

export default {
  name: 'DeleteTopicCategoryDialog',
  components: { ConfirmationDialog },
  props: {
    text: String,
    countdown: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      confirmationText: '', // Der Inhalt hier wird übernommen
    };
  },
  methods: {
    cancel() {
      this.$refs.DeleteTopicCategoryDialog.cancel();
    },
    closeAndReset() {
      this.$refs.DeleteTopicCategoryDialog.closeAndReset();
    },
    submit(item) {
      const data = this.confirmationText;
      if (item.title !== data) {
        this.$notify({
          title: this.$t('Keine Übereinstimmung!'),
          type: 'error',
        });
        console.log(item.title, data);
        this.closeAndReset();
        return;
      }
      this.$emit('submit', item);
    },
    show(item) {
      this.$refs.DeleteTopicCategoryDialog.show(item);
    },
    setErrorMessage(text) {
      this.$refs.DeleteTopicCategoryDialog.setErrorMessage(text);
    },
    setError(err) {
      this.$refs.DeleteTopicCategoryDialog.setError(err);
    },
  },
};
</script>

<style scoped>

</style>
