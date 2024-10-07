<template>
  <div>
    <SettingTitle doc-path="/guide/ban">
      {{ $t('bans') }}
    </SettingTitle>
    <v-row>
      <v-col
        lg="8"
        xl="6"
      >
        <h6 class="text-h6">
          {{ $t('general') }}
        </h6>
        <GenForm
          ref="form"
          :form-schema="formSchema"
          :settings-mode="true"
          @submit="saveData"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import BanSettingsForm from '@/forms/BanSettingsForm';
import openapi from '@/api/openapi';

export default {
  data() {
    return {
      formSchema: BanSettingsForm,
    };
  },
  mounted() {
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
