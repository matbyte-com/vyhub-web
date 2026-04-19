<template>
  <div>
    <SettingTitle doc-path="/guide/shop/general">
      {{ $t('shop') }}
    </SettingTitle>

    <v-row>
      <v-col
        sm="12"
        md="7"
      >
        <h6 class="text-h6">
          {{ $t('general') }}
        </h6>
        <GenForm
          ref="form"
          :form-schema="formSchema"
          :cancel-text="$t('cancel')"
          :options-extra="{editMode: 'inline'}"
          :submit-text="$t('submit')"
          :settings-mode="true"
          :action-button-top-margin="3"
          @submit="saveData"
        >
          <template #custom-editor="context">
            <EditorForForm
              v-bind="context"
              :title="$t('news')"
            />
          </template>
          <template #custom-logo="context">
            <ImageUpload
              v-bind="context"
              :title="$t('_shop.labels.invoiceLogoURL')"
              :description="$t('_shop.labels.invoiceLogoURLDetails')"
            />
          </template>
        </GenForm>
      </v-col>
      <v-col>
        <h6 class="text-h6">
          {{ $t('_shop.labels.businessAddress') }}
        </h6>
        <v-card>
          <v-card-text class="text-body-1">
            <Address
              v-if="businessAddress != null"
              :address="businessAddress"
            />
            <div v-else>
              {{ $t('_shop.messages.noAddressSpecified') }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn
              variant="text"
              color="success"
              @click="$refs.addressChangeDialog.show()"
            >
              <v-icon start>
                mdi-pencil
              </v-icon>
              {{ $t('change') }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-- Address Add Form -->
    <DialogForm
      ref="addressChangeDialog"
      :form-schema="addressFormSchema"
      :title="$t('_address.labels.change')"
      :submit-text="$t('change')"
      icon="mdi-map-marker"
      @submit="changeAddress"
    />
  </div>
</template>

<script>
import ShopGeneralForm from '@/forms/ShopGeneralForm';
import openapi from '@/api/openapi';
import BusinessAddressForm from '../../forms/BusinessAddressForm';

export default {
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
      data.checkout_checkboxes = data.checkout_checkboxes || [];
      (await openapi).shop_editConfig(null, data).then(() => {
        this.utils.getShopConfig();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(err);
        this.$refs.form.setError(err);
      });
    },
    async changeAddress() {
      const address = this.$refs.addressChangeDialog.getData();

      (await openapi).shop_changeBusinessAddress(undefined, address).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.addressChangeDialog.closeAndReset();
        this.fetchData();
      }).catch((err) => {
        console.log(err);
        this.$refs.addressChangeDialog.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
