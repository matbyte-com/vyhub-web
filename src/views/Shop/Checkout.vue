<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="12" md="6" lg="5" xl="3">
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
                <div v-else-if="debit.payment_gateway.type === 'COUPON'" class="text-left">
                  <div class="body-1">
                    <div>
                      {{ $t('_shop.messages.confirmCouponPayment',
                      { gateway_name: this.debit.payment_gateway.name }) }}
                    </div>
                    <div class="mt-3 font-weight-bold">
                      {{ $t('_shop.labels.total') }}: {{ debit ? debit.amount_total : '' }}
                      {{ debit ? debit.purchase.currency.symbol : '' }}
                    </div>
                  </div>
                  <div v-if="debit.extra && debit.extra.coupons && debit.extra.coupons.length > 0"
                       class="mt-3">
                    <v-alert type="success" icon="mdi-timer-sand">
                      {{ $t('_shop.messages.couponsEntered') }}
                    </v-alert>
                  </div>
                  <div class="mt-3">
                    <GenForm ref="couponForm" :form-schema="couponCodeSchema"
                             @submit="confirmCouponPayment"
                             :optionsExtra="{editMode: 'inline'}"
                             :action-button-top-margin="5"
                             :cancel-text="null" />
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
              <div v-if="debit.status === 'APPROVED'">
                <div>
                  <v-icon color="info" size="80" >
                    mdi-dots-horizontal-circle-outline
                  </v-icon>
                </div>
                <div class="body-1">
                  {{ $t('_shop.messages.paymentProcessing') }}
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
              <div v-if="debit.status === 'FAILED'">
                <div>
                  <v-icon color="error" size="80" v-if="debit.status === 'CANCELLED'">
                    mdi-close-circle-outline
                  </v-icon>
                </div>
                <div class="body-1">
                  {{ $t('_shop.messages.paymentFailed') }}
                </div>
              </div>
            </div>
          </v-card-text>
          <v-card-actions v-if="debit != null">
            <v-btn color="primary" text @click="$router.push({ name: 'ShopCart' })"
                   v-if="debit.status !== 'FINISHED'">
              <v-icon>mdi-arrow-left</v-icon>
              {{ $t('_shop.labels.cart') }}
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
import GenForm from '@/components/GenForm.vue';
import CheckoutCouponCodeForm from '@/forms/CheckoutCouponCodeForm';

export default {
  name: 'Checkout',
  components: { GenForm },
  data() {
    return {
      debitId: null,
      action: null,
      debit: null,
      loading: true,
      errorMessage: null,
      count: 0,
      intervalID: null,
      couponCodeSchema: CheckoutCouponCodeForm,
    };
  },
  beforeDestroy() {
    if (this.intervalID != null) {
      clearInterval(this.intervalID);
      this.intervalID = null;
    }
  },
  beforeMount() {
    this.debitId = this.$route.params.debitId;
    this.action = this.$route.params.action;
    this.checkPayment();
    this.count = 0;
    this.intervalID = setInterval(() => {
      this.checkPayment();
    }, 5000);
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
            this.errorMessage = this.$t('unexpectedError');
            console.log(err);
            this.utils.notifyUnexpectedError(err.response.data);
          });
        } else {
          this.loading = false;

          if (['FINISHED', 'CANCELLED', 'FAILED'].includes(this.debit.status)) {
            if (this.intervalID != null) {
              clearInterval(this.intervalID);
              this.intervalID = null;
            }
          }
        }
        // set already entered coupon code in form
        if (this.debit.payment_gateway.type === 'COUPON') {
          if (this.debit.extra && this.debit.extra.coupons) {
            const couponArray = [];
            this.debit.extra.coupons?.forEach((c) => {
              couponArray.push({ coupon: c });
            });
            this.$nextTick(() => {
              this.$refs.couponForm.setData({ couponArray });
            });
          }
        }
      }).catch((err) => {
        this.errorMessage = this.$t('unexpectedError');
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
    async confirmCouponPayment() {
      const data = this.$refs.couponForm.getData();
      const coupons = [];
      data.couponArray.forEach((c) => {
        coupons.push(c.coupon);
      });
      (await openapi).shop_addCouponCodes(this.debit.id, { coupons }).then(() => {
        this.checkPayment();
        this.$notify({
          title: this.$t('_shop.messages.couponsEditSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.couponForm.setErrorMessage(err.response.data.detail);
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
