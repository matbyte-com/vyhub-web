import { useVyHubStore } from '@/store';
import router from '@/router';
import openapi from '@/api/openapi';
import UtilService from '@/services/UtilService';
import openapiCached from '@/api/openapiCached';

const store = useVyHubStore();

export default {
  async refreshCartPacketCount() {
    (await openapi).shop_getCartPackets().then((rsp: any) => {
      store.cartPacketCount = rsp.data.length;
    }).catch((err) => {
      console.log(err);
    });
  },
  async refreshCreditAccount() {
    const api = await openapi;

    if (store.user == null) {
      return;
    }

    api.finance_getAccount({ uuid: store.user.credit_account_id })
      .then((rsp) => {
        store.creditAccount = rsp.data;
      }).catch((err) => {
        console.log(err);
      });
  },
  selectAddress(address: object) {
    store.address = address;
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
    } else if (action.type === 'form') {
      const { fields, method, url } = action.data;

      // Create an HTML form with hidden fields
      const form = document.createElement('form');
      form.method = method;
      form.action = url;

      // Add a hidden field for each one
      Object.keys(fields).forEach((fieldName) => {
        const input = document.createElement('input');
        input.type = 'hidden';
        input.name = fieldName;
        input.value = fields[fieldName];
        form.appendChild(input);
      });

      // Submit Form
      document.body.appendChild(form);
      form.submit();
    }

    throw new Error('Payment action failed.');
  },

  async getConfig() {
    const apiCached = await openapiCached;

    const rsp = await apiCached.shop_getConfig();

    return rsp.data;
  },
};
