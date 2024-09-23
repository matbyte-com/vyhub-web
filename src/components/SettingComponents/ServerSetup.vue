<template>
  <div
    v-if="server"
    class="mt-2"
  >
    <!-- GMOD -->
    <div v-if="server.type === 'GMOD'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.GMOD.download') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://github.com/matbyte-com/vyhub-gmod/releases"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
        <br>
        <div class="text-red">
          {{ $t('_server.instructions.GMOD.serverConsoleHint') }}
        </div>
      </div>
      <div
        v-if="commands == null"
        class="mt-1 text-center"
      >
        <v-btn
          color="primary"
          variant="flat"
          @click="generateCommandsShort(true)"
        >
          <v-icon start>
            mdi-repeat
          </v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div
        v-if="commands != null"
        class="mt-1"
      >
        <div
          v-for="cmd in commands"
          :key="cmd"
        >
          <ServerSetupTextField
            :cmd="cmd"
            class="mt-3"
          />
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- Minecraft -->
    <div v-else-if="server.type === 'MINECRAFT'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.MINECRAFT.download') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://github.com/matbyte-com/vyhub-minecraft/releases"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
      </div>
      <div
        v-if="commands == null"
        class="mt-1 text-center"
      >
        <v-btn
          color="primary"
          variant="flat"
          @click="generateCommandsShort()"
        >
          <v-icon start>
            mdi-repeat
          </v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div
        v-if="commands != null"
        class="mt-1"
      >
        <div
          v-for="cmd in commands"
          :key="cmd"
        >
          <ServerSetupTextField
            :cmd="cmd"
            class="mt-3"
          />
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- Discord -->
    <div v-else-if="server.type === 'DISCORD'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.DISCORD.createApp') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://docs.vyhub.net/latest/guide/authorization#discord"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-book-open-variant</v-icon>
            {{ $t('instructions') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.DISCORD.readInstructions') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://docs.vyhub.net/latest/game/discord#setup"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-book-open-variant</v-icon>
            {{ $t('instructions') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.DISCORD.addBot') }}
      </div>
      <div class="mt-1 text-center">
        <a
          :href="discordBotLink"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-plus</v-icon>
            {{ $t('add') }}
          </v-btn>
        </a>
        <v-btn
          variant="text"
          icon
          color="primary"
          class="ml-1"
          variant="flat"
          @click="generateDiscordBotLink"
        >
          <v-icon>mdi-reload</v-icon>
        </v-btn>
      </div>
      <div class="font-weight-bold mt-4">
        4. {{ $t('_server.instructions.DISCORD.restartBot') }}
      </div>
      <div class="text-center">
        <v-btn
          color="primary"
          class="ml-1"
          variant="flat"
          :disabled="botRestarted > 0"
          @click="restartDiscordBot"
        >
          <v-icon start>
            mdi-reload
          </v-icon>
          <div v-if="botRestarted === 0">
            {{ $t('_server.instructions.DISCORD.restart') }}
          </div>
          <div v-else>
            {{ botRestarted }}
          </div>
        </v-btn>
      </div>
    </div>

    <!-- Teamspeak -->
    <div v-else-if="server.type === 'TEAMSPEAK3'">
      <div class="font-weight-bold">
        {{ $t('_server.instructions.TEAMSPEAK3.headline') }}
      </div>
      {{ $t('_server.instructions.TEAMSPEAK3.botNotConnected') }}
      <div class="mt-1 text-center">
        <v-btn
          color="primary"
          href="https://docs.vyhub.net/latest/game/teamspeak"
          target="_blank"
          variant="flat"
        >
          <v-icon start>
            mdi-book-open-variant
          </v-icon>
          {{ $t('documentation') }}
        </v-btn>
        <v-btn
          color="primary"
          class="ml-3"
          :to="{ name: 'Log' }"
          variant="flat"
        >
          <v-icon start>
            mdi-format-list-bulleted
          </v-icon>
          {{ $t('logs') }}
        </v-btn>
        <v-btn
          color="primary"
          class="ml-3"
          variant="flat"
          :disabled="botRestarted > 0"
          @click="restartTs3Bot"
        >
          <v-icon start>
            mdi-reload
          </v-icon>
          <div v-if="botRestarted === 0">
            {{ $t('_server.instructions.DISCORD.restart') }}
          </div>
          <div v-else>
            {{ botRestarted }}
          </div>
        </v-btn>
      </div>
    </div>

    <!-- FIVEM -->
    <div v-if="server.type === 'FIVEM'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.FIVEM.download') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://github.com/matbyte-com/vyhub-fivem/releases"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
      </div>
      <div
        v-if="commands == null"
        class="mt-1 text-center"
      >
        <v-btn
          color="primary"
          variant="flat"
          @click="generateCommandsShort(true)"
        >
          <v-icon start>
            mdi-repeat
          </v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div
        v-if="commands != null"
        class="mt-1"
      >
        <div
          v-for="cmd in commands"
          :key="cmd"
        >
          <ServerSetupTextField
            :cmd="cmd"
            class="mt-3"
          />
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.FIVEM.server_cfg') }}
        <br>
        <div>
          <code>add_ace resource.vyhub-fivem command allow</code>
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        4. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- RUST & 7 Days To Die-->
    <div v-if="server.type === 'RUST' || server.type === 'SEVEN_DAYS'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.RUST.download') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://github.com/matbyte-com/vyhub-umod/releases"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div
        v-if="server.type === 'RUST'"
        class="font-weight-bold mt-4"
      >
        1.5 {{ $t('_server.instructions.RUST.imageLibrary') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://umod.org/plugins/image-library"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
      </div>
      <div
        v-if="commands == null"
        class="mt-1 text-center"
      >
        <v-btn
          color="primary"
          variant="flat"
          @click="generateCommandsShort()"
        >
          <v-icon start>
            mdi-repeat
          </v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div
        v-if="commands != null"
        class="mt-1"
      >
        <div
          v-for="cmd in commands"
          :key="cmd"
        >
          <ServerSetupTextField
            :cmd="cmd"
            class="mt-3"
          />
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- ASA -->
    <div v-if="server.type === 'ASA'">
      <div class="font-weight-bold">
        1. {{ $t('_server.instructions.ASA.download') }}
      </div>
      <div class="mt-1 text-center">
        <a
          href="https://github.com/matbyte-com/vyhub-ark-sa/releases"
          target="_blank"
        >
          <v-btn
            color="primary"
            variant="flat"
          >
            <v-icon start>mdi-download</v-icon>
            {{ $t('download') }}
          </v-btn>
        </a>
      </div>

      <div class="font-weight-bold mt-4">
        2. {{ $t('_server.instructions.COMMON.runCommands') }}
      </div>
      <div
        v-if="commands == null"
        class="mt-1 text-center"
      >
        <v-btn
          color="primary"
          variant="flat"
          @click="generateAsaCommand()"
        >
          <v-icon start>
            mdi-repeat
          </v-icon>
          {{ $t('generate') }}
        </v-btn>
      </div>
      <div
        v-if="commands != null"
        class="mt-1"
      >
        <div
          v-for="cmd in commands"
          :key="cmd"
        >
          <ServerSetupTextField
            :cmd="cmd"
            class="mt-3"
          />
        </div>
      </div>

      <div class="font-weight-bold mt-4">
        3. {{ $t('_server.instructions.COMMON.wait') }}
      </div>
    </div>

    <!-- No setup -->
    <div v-if="['SOURCE'].includes(server.type)">
      <div class="font-weight-bold">
        {{ $t('_server.instructions.COMMON.noSetup') }}
      </div>
    </div>
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import config from '@/config';
import ServerSetupTextField from '@/components/SettingComponents/ServerSetupTextField.vue';

export default {
  name: 'ServerSetup',
  components: {
    ServerSetupTextField,
  },
  props: {
    server: Object,
  },
  data() {
    return {
      commands: null,
      discordBotLink: '#',
      botRestarted: 0,
    };
  },
  methods: {
    init() {
      this.commands = null;

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
    async generateCommands(prefix = 'vh_config') {
      this.commands = [];

      const access_token = await this.generateToken();

      this.commands.push(`${prefix} api_key "${access_token}"`);
      this.commands.push(`${prefix} api_url "${config.backend_url}"`);
      this.commands.push(`${prefix} server_id "${this.server.id}"`);
    },
    async generateCommandsShort(quotes = false) {
      this.commands = [];

      const access_token = await this.generateToken();

      if (quotes) {
        this.commands.push(`vh_setup "${access_token}" "${config.backend_url}" "${this.server.id}"`);
      } else {
        this.commands.push(`vh_setup ${access_token} ${config.backend_url} ${this.server.id}`);
      }
    },
    async generateAsaCommand() {
      this.commands = [];
      const access_token = await this.generateToken();
      this.commands.push(`/vh_setup ${access_token} ${config.backend_url} ${this.server.id} ${this.server.serverbundle_id}`);
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
    async restartDiscordBot() {
      const api = (await openapi);
      await api.server_restartDiscordBot().then(() => {
        this.botRestarted = 10;
        this.timer();
        this.$notify({
          type: 'success',
          title: this.$t('_messages.editSuccess'),
        });
      });
    },
    async restartTs3Bot() {
      const api = (await openapi);
      await api.server_restartTs3Bot().then(() => {
        this.botRestarted = 10;
        this.timer();
        this.$notify({
          type: 'success',
          title: this.$t('_messages.editSuccess'),
        });
      });
    },
    async timer() {
      if (this.botRestarted === 0) {
        this.botRestarted = 0;
        return;
      }
      setTimeout(() => {
        this.botRestarted -= 1;
        this.timer();
      }, 1000);
    },
  },
};
</script>

<style scoped>

</style>
