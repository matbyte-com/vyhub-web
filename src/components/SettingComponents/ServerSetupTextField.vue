<template>
  <div class="d-flex">
    <v-text-field
      ref="textField"
      style="border-bottom-right-radius: 0; border-top-right-radius: 0"
      hide-details
      density="compact"
      readonly
      variant="outlined"
      :model-value="cmd"
      @click="$refs.textField.$el.querySelector('input').select();"
    />
    <v-btn
      color="primary"
      variant="flat"
      height="40px"
      style="border-top-left-radius: 0; border-bottom-left-radius: 0"
      @click="copyLink"
    >
      {{ $t('copy') }}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'ServerSetup',
  props: {
    cmd: String,
  },
  data() {
    return {
    };
  },
  methods: {
    async copyLink() {
      this.$refs.textField.$el.querySelector('input').select();
      await navigator.clipboard.writeText(this.cmd);
      this.$notify({
        type: 'success',
        title: this.$t('_messages.linkCopied'),
      });
    },
  },
};
</script>

<style scoped>

</style>
