<template>
  <div>
    <SettingTitle>{{ $t('shop') }}</SettingTitle>
    <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')"
             :submit-text="$t('submit')" ref="form" @submit="saveData"/>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import ShopGeneralForm from '@/forms/ShopGeneralForm';
import openapi from '@/api/openapi';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Shop',
  components: { SettingTitle, GenForm },
  data() {
    return {
      formSchema: ShopGeneralForm,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).shop_getGeneralShopConfig().then((rsp) => {
        this.$refs.form.setData(rsp.data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      (await openapi).shop_editGeneralShopConfig(null, data).then().catch((err) => {
        this.$refs.form.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
