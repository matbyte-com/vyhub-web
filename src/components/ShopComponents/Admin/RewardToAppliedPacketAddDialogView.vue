<template>
  <Dialog
    ref="dialog"
    icon="mdi-star"
    :title="$t('_reward.labels.syncAppliedRewards')"
    @close="amount_to_add = null"
  >
    <v-alert
      v-if="amount_to_add != null"
      type="info"
      class="mt-3"
    >
      {{ $t('_reward.labels.amountOfAppliedRewardsToPatch', {amount: amount_to_add} ) }}
    </v-alert>
    <GenForm
      v-show="amount_to_add == null"
      ref="form"
      class="hidde"
      :form-schema="appliedRewardSyncSchema"
      @submit="syncAppliedRewards"
    />
    <template
      v-if="amount_to_add != null"
      #actions
    >
      <v-btn
        class="mr-4"
        variant="flat"
        color="primary"
        type="submit"
        @click="syncAppliedRewards"
      >
        {{ $t('submit') }}
      </v-btn>
      <v-btn
        color="lighten-5"
        variant="flat"
        @click="amount_to_add = null"
      >
        {{ $t('back') }}
      </v-btn>
    </template>
  </Dialog>
</template>

<script>
import openapi from '@/api/openapi';
import AppliedRewardSync from '@/forms/AppliedRewardSync';
import Dialog from '@/components/Dialog.vue';
import GenForm from '@/components/GenForm.vue';

export default {
  name: 'SyncAppliedRewardsPacketsDialog',
  components: { GenForm, Dialog },
  data() {
    return {
      appliedRewardSyncSchema: AppliedRewardSync,
      amount_to_add: null,
    };
  },
  methods: {
    show() {
      this.$refs.dialog.show();
    },
    async syncAppliedRewards() {
      const data = this.$refs.form.getData();
      if (this.amount_to_add != null) {
        data.commit = true;
      }
      (await openapi).packet_addRewardToAppliedPackets(null, data).then((rsp) => {
        if (rsp.data.amount_to_add != null) {
          this.amount_to_add = rsp.data.amount_to_add;
          return;
        }
        this.$refs.dialog.cancel();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
          type: 'success',
        });
        this.$emit('success');
      }).catch((err) => {
        this.$refs.addAppliedRewardDialog.setError(err);
      });
    },

  },
};
</script>

<style scoped>

</style>
