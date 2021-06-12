<template>
    <div>
      <v-row class="justify-center">
        <v-col lg="3" sm="4" xs="12">
          <v-card>
            <v-card-title>
              <v-icon>mdi-currency-usd</v-icon>
              {{ $t('_shop.labels.payment') }}
            </v-card-title>
            <v-card-text>
              <div v-if="errorMessage != null">
                <v-alert
                  type="error"
                >
                  {{ errorMessage }}
                </v-alert>
              </div>
              <div v-if="loading">
                <v-col class="text-center">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="80"
                  ></v-progress-circular>
                </v-col>
              </div>
              <div v-if="debit != null && !loading" class="text-center mb-3">
                <div v-if="debit.status === 'STARTED'">
                  <div v-if="debit.payment_gateway.type === 'CREDITS'">
                    <div class="body-1">
                      {{ $t('_shop.messages.confirmCreditsPayment',
                      { credits: debit.credits }) }}
                    </div>
                    <div class="mt-5">
                      <v-btn color="success" @click="confirmCreditPayment">
                        <v-icon left>mdi-check</v-icon>
                        {{ $t('confirm') }}
                      </v-btn>
                      <v-btn class="ml-1" @click="cancelPayment">
                        <v-icon left>mdi-close</v-icon>
                        {{ $t('cancel') }}
                      </v-btn>
                    </div>
                  </div>
                  <div v-else>
                    <div>
                      <v-icon color="info" size="80" v-if="debit.status === 'STARTED'">
                        mdi-dots-horizontal-circle-outline
                      </v-icon>
                    </div>
                    <div class="body-1">
                      {{ $t('_shop.messages.paymentPending') }}
                    </div>
                  </div>
                </div>
                <div v-if="debit.status === 'FINISHED'">
                  <div>
                    <v-icon color="success" size="80" >
                      mdi-check-circle-outline
                    </v-icon>
                  </div>
                  <div class="body-1">
                    {{ $t('_shop.messages.paymentSuccess') }}
                  </div>
                </div>
                <div v-if="debit.status === 'CANCELLED'">
                  <div>
                    <v-icon color="error" size="80" v-if="debit.status === 'CANCELLED'">
                      mdi-close-circle-outline
                    </v-icon>
                  </div>
                  <div class="body-1">
                    {{ $t('_shop.messages.paymentCancelled') }}
                  </div>
                </div>
              </div>
            </v-card-text>
            <v-card-actions v-if="debit != null">
              <v-btn color="primary" text @click="$router.push({ name: 'ShopCart' })"
                     v-if="debit.status !== 'FINISHED'">
                <v-icon>mdi-arrow-right</v-icon>
                {{ $t('cart') }}
              </v-btn>
              <v-btn color="primary" text @click="$router.push({ name: 'Dashboard' })"
                     v-if="debit.status === 'FINISHED'">
                <v-icon>mdi-arrow-right</v-icon>
                {{ $t('dashboard') }}
              </v-btn>
            </v-card-actions>
          </v-card>
          <div class="mt-3 text--disabled" v-if="debit != null">
            {{ $t('_shop.labels.paymentId') }}: {{ debit.id }}
          </div>
        </v-col>
      </v-row>
    </div>
</template>

<script>
import openapi from '../../api/openapi';
import ShopService from '../../services/ShopService';

export default {
  name: 'Checkout',
  data() {
    return {
      debitId: null,
      action: null,
      debit: null,
      loading: true,
      errorMessage: null,
    };
  },
  beforeMount() {
    this.debitId = this.$route.params.debitId;
    this.action = this.$route.params.action;
    this.checkPayment();
  },
  methods: {
    async checkPayment() {
      const api = await openapi;

      api.shop_checkPayment({ uuid: this.debitId }).then((rsp) => {
        this.debit = rsp.data;

        if (this.action === 'cancel' && ['STARTED', 'APPROVED'].includes(this.debit.status)) {
          api.shop_cancelPayment({ uuid: this.debit.id }).then((rsp2) => {
            this.debit = rsp2.data;
            this.loading = false;
          }).catch((err) => {
            console.log(err);
            this.utils.notifyUnexpectedError(err.response.data);
          });
        } else {
          this.loading = false;
        }
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async confirmCreditPayment() {
      const api = await openapi;

      this.loading = true;
      this.errorMessage = null;

      api.shop_finishPayment({ uuid: this.debit.id }).then(() => {
        ShopService.refreshCreditAccount();
        this.checkPayment();
      }).catch((err) => {
        console.log(err);
        this.loading = false;

        if (err.response.data.detail.code === 'not_enough_credits') {
          this.errorMessage = this.$t('_shop.messages.notEnoughCredits');
        } else {
          this.errorMessage = err.response.data.detail.msg;
        }
      });
    },
    async cancelPayment() {
      const api = await openapi;

      this.loading = true;
      this.errorMessage = null;

      api.shop_cancelPayment({ uuid: this.debit.id }).then((rsp) => {
        this.loading = false;

        this.debit = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.loading = false;

        this.errorMessage = err.response.data.detail.msg;
      });
    },
  },
};
</script>

<style scoped>

</style>
