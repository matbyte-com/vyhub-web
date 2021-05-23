import store from '@/store';
import router from '@/router';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';

export default {
  async refreshCartPacketCount() {
    (await openapi).shop_getCartPackets().then((rsp) => {
      store.dispatch('setCartPacketCount', {
        cartPacketCount: rsp.data.length,
      });
    }).catch((err) => {
      UtilService.notifyUnexpectedError(err.response.data);
      console.log(err);
    });
  },
  async refreshCreditAccount() {
    const api = await openapi;

    api.finance_getAccount({ uuid: store.getters.user.credit_account_id })
      .then((rsp) => {
        store.dispatch('setCreditAccount', {
          creditAccount: rsp.data,
        });
      }).catch((err) => {
        console.log(err);
        UtilService.notifyUnexpectedError(err.response.data);
      });
  },
  selectAddress(address: object) {
    store.dispatch('setAddress', { address });
  },
  /* eslint-disable @typescript-eslint/no-explicit-any */
  executeAction(debit: any, action: any) {
    console.log('executeAction', debit, action);

    if (action == null) {
      // Do something
    } else if (action.type === 'redirect') {
      window.location.href = action.data.redirect_url;
    } else if (action.type === 'finish') {
      router.push({ name: 'ShopCheckout', params: { action: 'finish', debitId: debit.id } });
    }
  },
};
