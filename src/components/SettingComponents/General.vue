<template>
  <div>
    <SettingTitle>{{ $t('general') }}</SettingTitle>
    <v-row>
      <v-col cols="12" lg="6">
        <GenForm :form-schema="formSchema" :cancel-text="$t('cancel')" v-if="formSchema"
                 :submit-text="$t('submit')" ref="form" @submit="saveData" :settings-mode="true">
          <template v-slot:language-after>
            {{ $t('_settings.languageNewDescriptionText') }}
            <a href="https://github.com/matbyte-com/vyhub-lang" target="_blank">{{ $t('here') }}</a>!
          </template>
          <template v-slot:enable_forum-before v-if="!forumEnabled">
            <AddOnChip :addonTitle="$t('_forum.forum')"/>
          </template>
          <template v-slot:enable_forum-after v-if="!forumEnabled">
            <div class="mt-6" />
          </template>
        </GenForm>
      </v-col>
      <v-col cols="12" lg="6">
        <GenForm :form-schema="htmlTagSchema" :cancel-text="$t('cancel')"
                 :submit-text="$t('submit')" ref="htmlTagForm" @submit="saveHtmlTags"
                 :settings-mode="true">
        </GenForm>
      </v-col>
    </v-row>
    <v-divider class="mt-5"/>
    <div class="mt-5">
      <Support />
    </div>
  </div>
</template>

<script>
import GenForm from '@/components/GenForm.vue';
import SettingsGeneralFormSchema from '@/forms/SettingsGeneralForm';
import HtmlTagsForm from '@/forms/HtmlTagsForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import AddOnChip from '@/components/SettingComponents/AddOnChip.vue';
import Support from '@/components/SettingComponents/Support.vue';
import SettingTitle from './SettingTitle.vue';
import i18n from '../../plugins/i18n';

export default {
  name: 'General',
  components: {
    AddOnChip, SettingTitle, GenForm, Support,
  },
  data() {
    return {
      formSchema: null,
      data: null,
      htmlTagSchema: HtmlTagsForm,
      supportMethods: [
        {
          title: 'Discord',
          link: 'https://discord.gg/QycQpd2AQP',
          description: this.$t('_support.discordDescription'),
          icon: '$discord',
        },
        {
          title: 'Docs',
          link: 'https://docs.vyhub.net',
          description: this.$t('_support.documentationDescription'),
          icon: 'mdi-book-open-variant',
        },
        {
          title: 'Youtube',
          link: 'https://www.youtube.com/channel/UCjCxWjHbqoSZmp2l05LWAFg',
          description: this.$t('_support.youtubeDescription'),
          icon: 'mdi-youtube',
        },
      ],
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getConfig().then((rsp) => {
        const { data } = rsp;
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
      if (data.language !== i18n.locale) {
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
  computed: {
    forumEnabled() {
      if (!this.data) return false;
      return this.data.addons.includes('forum');
    },
  },
};
</script>

<style scoped>
</style>
