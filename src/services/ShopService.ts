import utilService from '@/services/UtilService';
import store from '@/store';
import router from '@/router';
import openapi from '@/api/openapi';

export default {
  async refreshCartPacketCount() {
    (await openapi).shop_getCartPackets().then((rsp) => {
      store.dispatch('setCartPacketCount', {
        cartPacketCount: rsp.data.length,
      });
    }).catch((err) => {
      utilService.notifyUnexpectedError(err.response.data);
      console.log(err);
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
