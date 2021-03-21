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
                  <div>
                    <v-icon color="info" size="80" v-if="debit.status === 'STARTED'">
                      mdi-dots-horizontal-circle-outline
                    </v-icon>
                  </div>
                  <div class="body-1">
                    {{ $t('_shop.messages.paymentPending') }}
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
import api from '@/api/api';
import UtilService from '@/services/UtilService';

export default {
  name: 'Checkout',
  data() {
    return {
      debitId: null,
      action: null,
      debit: null,
      loading: true,
    };
  },
  beforeMount() {
    this.debitId = this.$route.params.debitId;
    this.action = this.$route.params.action;
    this.checkPayment();
  },
  methods: {
    checkPayment() {
      api.shop.checkPayment(this.debitId).then((rsp) => {
        this.debit = rsp.data;

        if (this.action === 'cancel' && ['STARTED', 'APPROVED'].includes(this.debit.status)) {
          api.shop.cancelPayment(this.debit.id).then((rsp2) => {
            this.debit = rsp2.data;
            this.loading = false;
          }).catch((err) => {
            console.log(err);
            UtilService.notifyUnexpectedError(err.response.data);
          });
        } else {
          this.loading = false;
        }
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
    },
  },
};
</script>

<style scoped>

</style>
