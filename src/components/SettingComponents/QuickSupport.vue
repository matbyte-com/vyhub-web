<template>
  <div>
    <SettingTitle :divider="false">
      {{ $t('_support.getHelp') }}
    </SettingTitle>
    <div
      style="border-radius: 7px; border: #858585; border-style: solid; border-width: 1px"
      class="pa-3 mt-2 pb-0"
    >
      <v-row justify="center">
        <v-col
          v-for="m in supportMethods"
          :key="m.title"
          cols="11"
          sm="6"
          md="4"
        >
          <v-card
            variant="outlined"
            :href="m.link"
            target="_blank"
            height="100%"
            class="support-card"
          >
            <div
              class="d-flex align-center"
              style="height: 100%"
            >
              <div>
                <v-card-title class="d-flex">
                  <v-icon start>
                    {{ m.icon }}
                  </v-icon>
                  {{ m.title }}
                </v-card-title>
                <v-card-text>
                  <p class="text-justify">
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
      <v-card
        flat
        class="mt-3"
      >
        <v-textarea
          v-model="supportMessage"
          variant="outlined"
          class="pa-1"
          hide-details="true"
          :label="$t('_support.supportQuestions')"
        />
      </v-card>
      <div class="d-flex align-center">
        <v-switch
          v-model="supportAnswerYes"
          hide-details="auto"
          class="align-self-center"
          :label="$t('_support.reply?')"
        />
        <div
          class="ml-3"
        >
          <v-text-field
            v-if="supportAnswerYes"
            v-model="supportMail"
            density="compact"
            variant="outlined"
            min-width="250px"
            class="v-card pa-1"
            hide-details="true"
            :label="$t('email')"
            style="max-width: 230px"
          />
        </div>
        <v-spacer />
        <v-btn
          variant="flat"
          color="primary"
          :disabled="!supportMessage"
          @click="sendSupportRequest"
        >
          {{ $t('_support.send') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
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
          icon: 'custom:discord',
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
