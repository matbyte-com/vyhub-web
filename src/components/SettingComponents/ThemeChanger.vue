<template>
  <div>
    <SettingTitle docPath="/guide/customizability">
      {{ $t('theme') }}
    </SettingTitle>
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
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getTheme().then((rsp) => {
        this.$refs.themePicker.setData(rsp.data);
      });
    },
    async setTheme() {
      const data = this.$refs.themePicker.getData();
      // Set logo, image, favicon null to allow for removal of these attributes in database
      if (!data.logo) { data.logo = null; }
      if (!data.image) { data.image = null; }
      if (!data.favicon) { data.favicon = null; }
      (await openapi).general_editTheme(
        null, data,
      ).then(() => {
        this.errorMessage = null;
        emitter.emit('themeUpdated');
        this.$notify({
          title: this.$t('_theme.messages.editedTheme'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.themePicker.setError(err);
      });
    },
  },
};
</script>
