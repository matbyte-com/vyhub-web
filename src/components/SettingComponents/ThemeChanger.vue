<template>
  <div>
    <SettingTitle>{{ $t('theme') }}</SettingTitle>

    <v-row>
      <v-col lg="8" xl="6">
        <h6 class="text-h6">{{ $t('general') }}</h6>
          <GenForm :form-schema="formSchema" @submit="setTheme"
                   :error-message="errorMessage" :cancel-text="$t('cancel')"
                   :submit-text="$t('submit')"
                   ref="themePicker" :settings-mode="true" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import emitter from '@/services/EventBus';
import GenForm from '@/components/GenForm.vue';
import ThemePickerSchema from '@/forms/ThemePicker';
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
    this.queryData();
  },
  methods: {
    async queryData() {
      (await openapi).general_getTheme().then((rsp) => {
        this.$refs.themePicker.setData(rsp.data);
      });
    },
    async setTheme() {
      const data = this.$refs.themePicker.getData();
      (await openapi).general_updateTheme(
        null, data,
      ).then(() => {
        this.errorMessage = null;
        emitter.emit('themeUpdated');
        this.$notify({
          title: this.$t('_theme.messages.editedTheme'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.themePicker.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>
