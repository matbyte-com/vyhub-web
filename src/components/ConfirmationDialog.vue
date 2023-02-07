<template>
  <Dialog v-model="dialog" :max-width="width" :title="title" icon="mdi-help-circle">
    <template v-if="errorMessage != null || text != null || confirmationTextField != null">
      <v-alert type="error" v-if="errorMessage != null" class="mt-2">
        {{ errorMessage }}
      </v-alert>
      <div class="body-1 mt-2 text-center">
        {{ text }}
      </div>
      <div v-if="useTextField && !countdown">
        <v-text-field v-model="confirmationTextFieldInput" :label="confirmationTextFieldLabel"/>
        {{ $t('writeToConfirm') }} {{ confirmationTextField }}
      </div>
    </template>
    <template v-for="(index, name) in $slots" v-slot:[name]>
      <slot :name="name" />
    </template>
    <template v-slot:actions>
      <v-col>
        <v-btn text
               :disabled="disabled"
               color="error"
               type="submit"
               :loading="loading"
               @click="submit">
          <v-icon left>{{ btnIcon }}</v-icon>
          <span v-if="disabled && !useTextField">
            ({{ counter }})
          </span>
          <span v-else>
            {{ btnText }}
          </span>
        </v-btn>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn text @click="cancel">
          <v-icon left>mdi-close</v-icon>
          <span v-if="btnCancelText">{{ btnCancelText }}</span>
          <span v-else>{{ $t('cancel') }}</span>
        </v-btn>
      </v-col>
    </template>
  </Dialog>
</template>

<script>
import i18n from '@/plugins/i18n';
import Dialog from './Dialog.vue';

export default {
  name: 'ConfirmationDialog',
  components: { Dialog },
  data() {
    return {
      dialog: null,
      errorMessage: null,
      item: null,
      loading: false,
      counter: 5,
      intervalID: null,
      confirmationTextFieldInput: null,
    };
  },
  props: {
    text: String,
    confirmationTextField: String,
    confirmationTextFieldLabel: String,
    useTextField: {
      type: Boolean,
      default: false,
    },
    btnIcon: {
      type: String,
      default: 'mdi-check',
    },
    btnText: String,
    btnCancelText: String,
    width: {
      type: Number,
      default: 400,
    },
    title: {
      type: String,
      default: i18n.t('areYouSure'),
    },
    countdown: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    cancel() {
      this.loading = false;
      this.dialog = false;
      this.errorMessage = null;
      this.confirmationTextFieldInput = null;
    },
    closeAndReset() {
      this.loading = false;
      this.dialog = false;
      this.errorMessage = null;
      this.confirmationTextFieldInput = null;
    },
    submit() {
      if (!this.loading) {
        this.loading = true;
        this.$emit('submit', this.item);
      }
    },
    show(item) {
      if (this.countdown) {
        if (this.intervalID != null) {
          window.clearInterval(this.intervalID);
          this.intervalID = null;
        }

        this.counter = 5;
        this.intervalID = this.utils.setIntervalX(() => {
          this.counter -= 1;
        }, 1000, 5);
      }

      this.item = item;
      this.dialog = true;
      this.loading = false;
    },
    setErrorMessage(text) {
      this.errorMessage = text;
      this.loading = false;
    },
    setError(err) {
      this.errorMessage = this.utils.formatErrorMessage(err).text;
      this.loading = false;
    },
  },
  computed: {
    disabled() {
      if (this.countdown) {
        return this.countdown && this.counter > 0;
      }
      if (this.confirmationTextField) {
        if (this.confirmationTextField === this.confirmationTextFieldInput) return false;
        return true;
      }
      return false;
    },
  },
};
</script>

<style scoped>

</style>
