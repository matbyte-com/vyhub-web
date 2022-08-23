<template>
  <div class="mt-2">
    <!-- GMOD -->
    <div v-if="server.type === 'GMOD'">
      <div class="font-weight-bold">1. {{ $t('_server.instructions.GMOD.download') }}</div>
      <div class="mt-1 text-center">
        <a href="https://github.com/matbyte-com/vyhub-gmod/releases" target="_blank">
          <v-btn color="primary">
            <v-icon left>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
        <br/>
        <div class="red--text">
          {{ $t('_server.instructions.GMOD.serverConsoleHint') }}
        </div>
      </div>
      <div v-if="gmodCommands == null" class="mt-1 text-center">
        <v-btn color="primary" @click="generateGmodCommands">
          <v-icon left>mdi-repeat</v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div v-if="gmodCommands != null" class="mt-1">
        <div v-for="cmd in gmodCommands" :key="cmd">
          <code>{{ cmd }}</code>
          <br/>
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- Minecraft -->
    <div v-else-if="server.type === 'MINECRAFT'">
      <div class="font-weight-bold">1. {{ $t('_server.instructions.MINECRAFT.download') }}</div>
      <div class="mt-1 text-center">
        <a href="https://github.com/matbyte-com/vyhub-minecraft/releases" target="_blank">
          <v-btn color="primary">
            <v-icon left>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
      </div>
      <div v-if="mcCommands == null" class="mt-1 text-center">
        <v-btn color="primary" @click="generateMcCommands">
          <v-icon left>mdi-repeat</v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div v-if="mcCommands != null" class="mt-1">
        <div v-for="cmd in mcCommands" :key="cmd">
          <code>{{ cmd }}</code>
          <br/>
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- Discord -->
    <div v-else-if="server.type === 'DISCORD'">
      <div class="font-weight-bold">1. {{ $t('_server.instructions.DISCORD.createApp') }}</div>
      <div class="mt-1 text-center">
        <a href="https://docs.vyhub.net/latest/guide/authorization#discord" target="_blank">
          <v-btn color="primary">
            <v-icon left>mdi-book-open-variant</v-icon>
            {{ $t('instructions') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.DISCORD.readInstructions') }}
      </div>
      <div class="mt-1 text-center">
        <a href="https://docs.vyhub.net/latest/game/discord#setup" target="_blank">
          <v-btn color="primary">
            <v-icon left>mdi-book-open-variant</v-icon>
            {{ $t('instructions') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.DISCORD.addBot') }}
      </div>
      <div class="mt-1 text-center">
        <a :href="discordBotLink" target="_blank">
          <v-btn color="primary" @click="openDiscordBotLink">
            <v-icon left>mdi-plus</v-icon>
            {{ $t('add') }}
          </v-btn>
        </a>
        <v-btn text icon @click="generateDiscordBotLink" color="primary" class="ml-1">
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import config from '@/config';

export default {
  name: 'ServerSetup',
  props: {
    server: Object,
  },
  data() {
    return {
      gmodCommands: null,
      mcCommands: null,
      discordBotLink: '#',
    };
  },
  methods: {
    init() {
      this.gmodCommands = null;

      if (this.server.type === 'DISCORD') {
        this.generateDiscordBotLink();
      }
    },
    async generateToken() {
      const api = await openapi;

      const reqData = {
        serverbundle_id: this.server.serverbundle_id,
        properties: ['integration_token'],
        name: this.server.name,
      };

      const rsp = await api.general_createApiToken(null, reqData);

      return rsp.data.access_token;
    },
    async generateGmodCommands() {
      this.gmodCommands = [];

      const access_token = await this.generateToken();

      this.gmodCommands.push(`vh_config api_key "${access_token}"`);
      this.gmodCommands.push(`vh_config api_url "${config.backend_url}"`);
      this.gmodCommands.push(`vh_config server_id "${this.server.id}"`);
    },
    async generateMcCommands() {
      this.mcCommands = [];

      const access_token = await this.generateToken();

      this.mcCommands.push(`vh_config apiKey "${access_token}"`);
      this.mcCommands.push(`vh_config apiURL "${config.backend_url}"`);
      this.mcCommands.push(`vh_config serverID "${this.server.id}"`);
    },
    async generateDiscordBotLink() {
      const api = (await openapi);
      const rsp = await api.auth_getAuthConfig();
      const client_id = rsp.data.discord_oauth_client_id;

      if (client_id == null || client_id.length < 5) {
        return '#';
      }

      this.discordBotLink = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&permissions=268438545&scope=bot`;

      return null;
    },
  },
};
</script>

<style scoped>

</style>
