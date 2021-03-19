import api from '@/api/api';
import utilService from '@/services/UtilService';
import store from '@/store';

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
};
