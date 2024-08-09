<template>
  <div>
    <SettingTitle :divider="false">{{ $t('_support.getHelp') }}</SettingTitle>
    <div style="border-radius: 7px; border: #858585; border-style: solid; border-width: 1px"
         class="pa-3 mt-2 pb-0">
        <v-row justify="center">
          <v-col cols="11" sm="6" md="4" v-for="m in supportMethods" :key="m.title">
            <v-card border :href="m.link" target="_blank" height="100%" class="support-card">
              <div class="d-flex" style="height: 100%">
                <div>
                  <v-card-title>
                    <v-icon start>{{ m.icon }}</v-icon>
                    {{ m.title }}
                  </v-card-title>
                  <v-card-text>
                    <p align="justify">
                      {{ m.description }}
                    </p>
                  </v-card-text>
                </div>
                <v-icon class="mr-2">
                  mdi-open-in-new
                </v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      <v-card flat>
        <v-textarea variant="outlined" hide-details="true" class="mt-3" v-model="supportMessage"
                    :label="$t('_support.supportQuestions')"/>
      </v-card>
        <div class="d-flex align-center">
          <v-switch v-model="supportAnswerYes" class="align-self-center"
                    :label="$t('_support.reply?')" />
          <v-card flat class="ml-3">
            <v-text-field v-if="supportAnswerYes" density="compact" variant="outlined" hide-details="true"
                          v-model="supportMail" :label="$t('email')" style="max-width: 230px"/>
          </v-card>
          <v-spacer />
          <v-btn variant="flat" color="primary" @click="sendSupportRequest" :disabled="!supportMessage">
            {{ $t('_support.send') }}
          </v-btn>
        </div>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'General',
  components: { SettingTitle },
  data() {
    return {
      supportMessage: null,
      supportMail: null,
      supportAnswerYes: false,
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
  methods: {
    async sendSupportRequest() {
      let data;
      if (this.supportMail && this.supportMessage && this.supportAnswerYes) {
        data = {
          content: this.supportMessage,
          sender: this.supportMail,
        };
      } else {
        data = {
          content: this.supportMessage,
        };
      }

      if (!this.supportMessage || this.supportMessage.length < 7) {
        this.$notify({
          title: this.$t('error'),
          message: this.$t('_support.messages.tooShort'),
          type: 'error',
        });
        return;
      }

      (await openapi).general_sendFeedbackMail(null, data).then((rsp) => {
        this.$notify({
          title: this.$t('_support.messages.requestSendSuccess'),
          type: 'success',
        });
        this.supportMessage = null;
      });
    },
  },
};
</script>

<style scoped>
.support-card {
  transition: .2s ease-in-out;
  border-width: 1px;
  border-color: #858585;
}

.support-card:hover {
  background-color: #eceff1 !important;
}
</style>
