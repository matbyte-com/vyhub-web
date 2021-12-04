<template>
  <div>
    <SettingTitle>{{ $t('legal') }}</SettingTitle>
    <v-alert v-if="errorMsg" type="error">
      {{ errorMsg }}
    </v-alert>
    <v-card flat>
      <v-card-text>
        <VueEditor v-model="content"/>
      </v-card-text>
    </v-card>
    <v-btn :loading="loading" depressed color="primary" class="mt-3" @click="updateLegal">
      <span v-if="success">
        <v-icon large color="success">
          mdi-check
        </v-icon>
      </span>
      <span v-else>
        {{ $t('save') }}
      </span>
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
      loading: false,
      success: false,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getLegal().then((rsp) => {
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
      this.loading = true;
      (await openapi).general_updateLegal(null, { content: this.content }).then((rsp) => {
        this.content = rsp.data;
        this.errorMsg = '';
        this.loading = false;
        this.success = true;
        setTimeout(() => {
          this.success = false;
        }, 3000);
      }).catch((err) => {
        this.errorMsg = err.response.data.detail;
        this.loading = false;
      });
    },
  },
};
</script>

<style scoped>

</style>
