<template>
  <div>
    <SettingTitle>{{ $t('warnings') }}</SettingTitle>
    <GenForm :form-schema="formSchema" ref="form" @submit="saveData" :settings-mode="true">
      <template slot="time_to_live-after">
        {{ $t('_warning.settingFormDesc') }}
      </template>
    </GenForm>
  </div>
</template>

<script>
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import GenForm from '@/components/GenForm.vue';
import WarningSettingsForm from '@/forms/WarningSettingsForm';

export default {
  name: 'Warnings.vue',
  components: {
    SettingTitle,
    GenForm,
  },
  data() {
    return {
      formSchema: WarningSettingsForm,
    };
  },
  methods: {
    saveData() {
      console.log('123');
    },
  },
};
</script>

<style scoped>

</style>
