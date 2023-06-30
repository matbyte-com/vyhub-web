<template>
  <div>
    <SettingTitle docPath="/guide/ban">{{ $t('bans') }}</SettingTitle>
    <v-row>
      <v-col lg="8" xl="6">
        <h6 class="text-h6">{{ $t('general') }}</h6>
        <GenForm :form-schema="formSchema" ref="form" @submit="saveData" :settings-mode="true">
        </GenForm>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import GenForm from '@/components/GenForm.vue';
import BanSettingsForm from '@/forms/BanSettingsForm';
import openapi from '@/api/openapi';

export default {
  name: 'Warnings.vue',
  components: {
    SettingTitle,
    GenForm,
  },
  data() {
    return {
      formSchema: BanSettingsForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).ban_getConfig().then((rsp) => {
        const { data } = rsp;
        this.$refs.form.setData(data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      (await openapi).ban_updateConfig(null, data).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
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
