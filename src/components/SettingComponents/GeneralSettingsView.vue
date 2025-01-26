<template>
  <div>
    <SettingTitle>{{ $t('general') }}</SettingTitle>
    <v-row>
      <v-col
        cols="12"
        lg="6"
      >
        <GenForm
          v-if="formSchema"
          ref="form"
          :form-schema="formSchema"
          :cancel-text="$t('cancel')"
          :submit-text="$t('submit')"
          :settings-mode="true"
          @submit="saveData"
        >
          <template
            #forum-chip
          >
            <div
              class="full-height d-flex align-center justify-end"
            >
              <AddOnChip
                v-if="!forumEnabled"
                class="my-auto"
                :addon-title="$t('_forum.forum')"
              />
            </div>
          </template>
        </GenForm>
      </v-col>
      <v-col
        cols="12"
        lg="6"
      >
        <GenForm
          ref="htmlTagForm"
          :form-schema="htmlTagSchema"
          :cancel-text="$t('cancel')"
          :submit-text="$t('submit')"
          :settings-mode="true"
          @submit="saveHtmlTags"
        />
      </v-col>
    </v-row>
    <v-divider class="mt-5" />
    <div class="mt-5">
      <QuickSupport />
    </div>
  </div>
</template>

<script>
import SettingsGeneralFormSchema from '@/forms/SettingsGeneralForm';
import HtmlTagsForm from '@/forms/HtmlTagsForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import i18n from '../../plugins/i18n';

export default {
  data() {
    return {
      formSchema: null,
      data: null,
      htmlTagSchema: HtmlTagsForm,
    };
  },
  computed: {
    forumEnabled() {
      if (!this.data) return false;
      return this.data.addons.includes('forum');
    },
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getConfig().then((rsp) => {
        const {data} = rsp;
        this.data = rsp.data;
        this.formSchema = SettingsGeneralFormSchema.form(this.forumEnabled);
        this.$nextTick(() => {
          this.$refs.form.setData(data);
        });
      });
      (await openapi).general_getHtmlMetaTags().then((rsp) => {
        this.$refs.htmlTagForm.setData(rsp.data);
      });
    },
    async saveData() {
      const data = this.$refs.form.getData();
      if (data.language !== i18n.global.locale) {
        i18n.locale = data.language;
      }
      (await openapi).general_editConfig(null, data).then(() => {
        // caught in App.vue to Update Theme + Header
        EventBus.emit('themeUpdated');
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        // Event caught in CustomerJourney.vue
        EventBus.emit('customerJourneyUpdate');
        this.formSchema = SettingsGeneralFormSchema.form(this.forumEnabled);
        this.$nextTick(() => {
          this.$refs.form.setData(data);
        });
      }).catch((err) => {
        this.$refs.form.setError(err);
      });
    },
    async saveHtmlTags() {
      const data = this.$refs.htmlTagForm.getData();
      (await openapi).general_editHtmlMetaTags(null, data).then(() => {
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.htmlTagForm.setData(data);
      }).catch((err) => {
        this.$refs.htmlTagForm.setError(err);
      });
    },
  },
};
</script>

<style>
.full-height {
  height: 48px;
}</style>
