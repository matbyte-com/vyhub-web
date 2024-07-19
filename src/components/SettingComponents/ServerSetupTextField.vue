<template>
  <div class="d-flex">
    <v-text-field style="border-bottom-right-radius: 0; border-top-right-radius: 0"
                  @click="$refs.textField.$el.querySelector('input').select();"
                  hide-details dense readonly outlined :value="cmd" ref="textField"/>
    <v-btn @click="copyLink" color="primary" depressed height="40px"
           style="border-top-left-radius: 0; border-bottom-left-radius: 0">
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
