import api from '@/api/api';
import utilService from '@/services/UtilService';
import store from '@/store';
import router from '@/router';

export default {
  refreshCartPacketCount() {
    api.shop.getCartPackets().then((rsp) => {
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
