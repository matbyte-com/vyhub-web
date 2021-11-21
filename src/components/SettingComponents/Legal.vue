<template>
  <div>
    <SettingTitle>{{ $t('legal') }}</SettingTitle>
    <v-alert v-if="errorMsg" type="error">
      {{ errorMsg }}
    </v-alert>
    <VueEditor v-model="content"/>
    <v-btn depressed color="primary" @click="updateLegal">
      {{ $t('save') }}
    </v-btn>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import SettingTitle from '@/components/SettingComponents/SettingTitle.vue';
import openapi from '@/api/openapi';
import i18n from '@/plugins/i18n';

export default {
  components: { SettingTitle, VueEditor },
  name: 'Legal',
  data() {
    return {
      content: '',
      errorMsg: '',
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).design_getLegal().then((rsp) => {
        this.content = rsp.data;
        this.errorMsg = '';
      }).catch((err) => {
        this.errorMsg = err.response.data.detail;
      });
    },
    async updateLegal() {
      if (this.content === '') {
        this.errorMsg = i18n.t('settings.contentEmpty');
        return;
      }
      (await openapi).design_updateLegal(null, this.content).then((rsp) => {
        this.content = rsp.data;
        this.errorMsg = '';
      }).catch((err) => {
        this.errorMsg = err.response.data.detail;
      });
    },
  },
};
</script>

<style scoped>

</style>
