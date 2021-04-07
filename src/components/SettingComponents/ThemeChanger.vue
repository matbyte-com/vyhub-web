<template>
  <div>
    <SettingTitle>{{ $t('theme') }}</SettingTitle>

    <GenForm :form-schema="formSchema" @submit="setTheme"
             :error-message="errorMessage" cancel-text="Cancel" submit-text="Submit"
             ref="themePicker"
    />
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import ThemePickerSchema from '@/forms/ThemePicker';
import api from '@/api/api';
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
    setTheme() {
      const data = this.$refs.themePicker.getData();
      console.log(data.primary);
      api.design.setTheme(
        data.primary,
        data.dark,
        data.image,
        data.background,
      ).then((rsp) => {
        this.$router.go();
      }).catch((err) => {
        this.$refs.themePicker.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>
