<template>
  <div>
    <SettingTitle>{{ $t('shop') }}</SettingTitle>
    <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')"
             :optionsExtra="{editMode: 'inline'}"
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
      (await openapi).shop_getGeneralConfig().then((rsp) => {
        const { data } = rsp;

        if (data.checkout_checkboxes == null) {
          data.checkout_checkboxes = [];
        }

        this.$refs.form.setData(data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      (await openapi).shop_editGeneralConfig(null, data).then(() => {
        this.$notify({
          title: this.$t('settingsSaveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.form.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
