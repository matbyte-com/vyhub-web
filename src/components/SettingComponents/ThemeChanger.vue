<template>
  <div>
    <SettingTitle>{{ $t('theme') }}</SettingTitle>

    <GenForm :form-schema="formSchema" @submit="setTheme"
             :error-message="errorMessage" :cancel-text="$t('cancel')" :submit-text="$t('submit')"
             ref="themePicker" :settings-mode="true"
    />
  </div>
</template>

<script>
import emitter from '@/services/EventBus';
import GenForm from '@/components/GenForm.vue';
import ThemePickerSchema from '@/forms/ThemePicker';
import api from '@/api/api';
import openapi from '@/api/openapi';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'ThemeChanger.vue',
  components: {
    SettingTitle,
    GenForm,
  },
  data() {
    return {
      formSchema: ThemePickerSchema,
      errorMessage: null,
    };
  },
  beforeMount() {
    api.design.getTheme().then((rsp) => { this.$refs.themePicker.setData(rsp.data); });
  },
  methods: {
    async setTheme() {
      const data = this.$refs.themePicker.getData();
      (await openapi).design_updateTheme(
        null, data,
      ).then(() => {
        this.errorMessage = null;
        emitter.emit('themeUpdated');
        this.$notify({
          title: this.$t('settingsSaveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.themePicker.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>
