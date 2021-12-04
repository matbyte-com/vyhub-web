<template>
  <div>
    <SettingTitle>{{ $t('shop') }}</SettingTitle>

    <v-row>
      <v-col sm="12" md="6">
        <h6 class="text-h6">{{ $t('general') }}</h6>
        <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')"
                 :optionsExtra="{editMode: 'inline'}"
                 :submit-text="$t('submit')" ref="form" @submit="saveData" :settings-mode="true"/>
      </v-col>
      <v-col>
        <h6 class="text-h6">{{ $t('_shop.labels.businessAddress') }}</h6>
        <v-card>
          <v-card-text class="body-1">
            <Address v-if="businessAddress != null" :address="businessAddress"></Address>
            <div v-else>{{ $t('_shop.messages.noAddressSpecified') }}</div>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="success" @click="$refs.addressChangeDialog.show()">
              <v-icon left>mdi-pencil</v-icon>
              {{ $t('change') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Address Add Form -->
    <DialogForm :form-schema="addressFormSchema" ref="addressChangeDialog"
                :title="$t('_address.labels.change')" :submit-text="$t('change')"
                title-icon="mdi-map-marker"
                @submit="changeAddress">
    </DialogForm>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import ShopGeneralForm from '@/forms/ShopGeneralForm';
import openapi from '@/api/openapi';
import SettingTitle from './SettingTitle.vue';
import BusinessAddressForm from '../../forms/BusinessAddressForm';
import DialogForm from '../DialogForm.vue';
import Address from '../Address.vue';

export default {
  name: 'Shop',
  components: {
    Address, DialogForm, SettingTitle, GenForm,
  },
  data() {
    return {
      formSchema: ShopGeneralForm,
      businessAddress: null,
      addressFormSchema: BusinessAddressForm,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.shop_getConfig().then((rsp) => {
        const { data } = rsp;

        if (data.checkout_checkboxes == null) {
          data.checkout_checkboxes = [];
        }

        this.$refs.form.setData(data);
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      api.shop_getBusinessAddress().then((rsp) => {
        this.businessAddress = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      (await openapi).shop_editConfig(null, data).then(() => {
        this.$notify({
          title: this.$t('settingsSaveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.form.setErrorMessage(err.response.data.detail);
      });
    },
    async changeAddress() {
      const address = this.$refs.addressChangeDialog.getData();

      (await openapi).shop_changeBusinessAddress(undefined, address).then(() => {
        this.$notify({
          title: this.$t('_address.messages.changeSuccess'),
          type: 'success',
        });
        this.$refs.addressChangeDialog.closeAndReset();
        this.fetchData();
      }).catch((err) => {
        console.log(err);
        this.$refs.addressChangeDialog.setErrorMessage(err.response.data);
      });
    },
  },
};
</script>

<style scoped>

</style>
