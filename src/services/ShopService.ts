import { loadStripe } from '@stripe/stripe-js/pure';
import store from '@/store';
import router from '@/router';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';
import openapiCached from '@/api/openapiCached';

export default {
  async refreshCartPacketCount() {
    (await openapi).shop_getCartPackets().then((rsp: any) => {
      store.dispatch('setCartPacketCount', {
        cartPacketCount: rsp.data.length,
      });
    }).catch((err) => {
      UtilService.data().utils.notifyUnexpectedError(err.response.data);
      console.log(err);
    });
  },
  async refreshCreditAccount() {
    const api = await openapi;

    if (store.getters.user == null) {
      return;
    }

    api.finance_getAccount({ uuid: store.getters.user.credit_account_id })
      .then((rsp) => {
        store.dispatch('setCreditAccount', {
          creditAccount: rsp.data,
        });
      }).catch((err) => {
        console.log(err);
        UtilService.data().utils.notifyUnexpectedError(err.response.data);
      });
  },
  selectAddress(address: object) {
    store.dispatch('setAddress', { address });
  },
  /* eslint-disable @typescript-eslint/no-explicit-any */
  async executeAction(debit: any, action: any) {
    console.log('executeAction', debit, action);

    if (action == null) {
      //
    } else if (action.type === 'redirect') {
      window.location.href = action.data.redirect_url;
      return true;
    } else if (action.type === 'finish') {
      router.push({ name: 'ShopCheckout', params: { action: 'finish', debitId: debit.id } });
      return true;
    } else if (action.type === 'stripe_redirect_to_checkout') {
      const stripe = await loadStripe(action.data.public_key);

      if (stripe == null) {
        throw new Error('Stripe object is null.');
      }

      const result = await stripe.redirectToCheckout({
        sessionId: action.data.session_id,
      });

      if (result.error) {
        throw new Error(result.error.message);
      }

      return true;
    }

    throw new Error('Payment action failed.');
  },

  async getConfig() {
    const apiCached = await openapiCached;

    const rsp = await apiCached.shop_getConfig();

    return rsp.data;
  },
};
