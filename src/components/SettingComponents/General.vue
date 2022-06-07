<template>
  <div>
    <SettingTitle>{{ $t('general') }}</SettingTitle>
    <v-row>
      <v-col lg="8" xl="6">
        <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')"
                 :submit-text="$t('submit')" ref="form" @submit="saveData" :settings-mode="true">
          <template v-slot:language-after>
            {{ $t('_settings.languageNewDescriptionText') }}
            <a href="https://github.com/matbyte-com/vyhub-lang" target="_blank">{{ $t('here') }}</a>!
          </template>
        </GenForm>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import SettingsGeneralFormSchema from '@/forms/SettingsGeneralForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import SettingTitle from './SettingTitle.vue';
import i18n from '../../plugins/i18n';

export default {
  name: 'General',
  components: { SettingTitle, GenForm },
  data() {
    return {
      formSchema: SettingsGeneralFormSchema,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getConfig().then((rsp) => {
        const { data } = rsp;
        this.$refs.form.setData(data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      if (data.language !== i18n.locale) {
        i18n.locale = data.language;
      }
      (await openapi).general_editConfig(null, data).then(() => {
        // caught in App.vue to Update Theme + Header
        EventBus.emit('themeUpdated');
        this.$notify({
          title: this.$t('settingsSaveSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.form.setError(err);
      });
    },
  },
};
</script>

<style scoped>

</style>
