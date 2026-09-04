<template>
  <div>
    <PageTitleFlat
      :title="$t('_withdrawal.title')"
      :hide-triangle="true"
    />
    <v-row class="mt-4 justify-center">
      <v-col
        cols="12"
        md="8"
        lg="6"
      >
        <v-card
          class="card-rounded"
          flat
        >
          <v-card-text>
            <p class="mb-4">
              {{ $t('_withdrawal.subtitle') }}
            </p>
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
            >
              {{ $t('_withdrawal.note') }}
            </v-alert>
            <GenForm
              ref="form"
              :form-schema="schema"
              :submit-text="$t('submit')"
              :cancel-text="null"
              @submit="submit"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import GenForm from '@/components/GenForm.vue';
import WithdrawalForm from '@/forms/WithdrawalForm';
import { useVyHubStore } from '@/store';

export default {
  name: 'WithdrawalView',
  components: {
    GenForm,
  },
  data() {
    return {
      schema: WithdrawalForm,
    };
  },
  computed: {
    store() {
      return useVyHubStore();
    },
  },
  mounted() {
    this.prefill();
  },
  methods: {
    prefill() {
      // The endpoint only accepts an address that has bought something, so the account's own one is
      // the address a logged-in visitor almost certainly needs.
      const user = this.store.user;

      if (user?.email) {
        this.$refs.form.setData({ email: user.email });
      }
    },
    buildPayload(data) {
      // The endpoint takes a single free-text `text`, so fold the structured purchase fields
      // and the optional comment into it.
      const lines = [`${this.$t('_withdrawal.purchaseDate')}: ${data.purchaseDate}`];

      if (data.purchaseId) {
        lines.push(`${this.$t('_withdrawal.purchaseId')}: ${data.purchaseId}`);
      }
      if (data.comment) {
        lines.push(`${this.$t('_withdrawal.comment')}: ${data.comment}`);
      }

      return {
        name: data.name,
        email: data.email,
        text: lines.join('\n'),
      };
    },
    async submit() {
      const form = this.$refs.form;
      form.loading = true;

      try {
        await (await openapi).shop_createWithdrawal(null, this.buildPayload(form.getData()));

        if (this.store.isLoggedIn) {
          // The ticket is theirs, so send them to it rather than leaving them on a form they are
          // done with.
          this.$router.push({ name: 'Ticket' });
          return;
        }

        form.setSuccessMessage(this.$t('_withdrawal.success'));
        form.reset();
        this.prefill();
      } catch (err) {
        form.setError(err);
      }
    },
  },
};
</script>
