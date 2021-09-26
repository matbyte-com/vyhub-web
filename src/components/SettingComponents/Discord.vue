<template>
  <div>
    <delete-confirmation-dialog ref="relationDeleteDialog" @submit="deleteRelation"/>
    <dialog-form :title="$t('_discord.addRelation')" :form-schema="relationAddSchema"
                 ref="relationAddDialog" @submit="addRelation"/>
    <SettingTitle>{{ $t('discord') }}</SettingTitle>
    <v-btn class="mt-3" depressed color="#7289DA" target="_blank"
           href="https://discord.com/api/oauth2/authorize?client_id=890658002967867442&permissions=268437504&scope=bot">
      <v-icon left>
        mdi-discord
      </v-icon>
      {{ $t('_discord.addDiscordServer') }}
    </v-btn>
    <span>
      {{ $t('_discord.connectedServer') }}: {{ guild.name }}
    </span>
    <v-divider />
    {{ $t('_discord.activeRelations') }}
    <v-simple-table dense>
      <thead>
        <tr>
          <th class="text-left">
            {{ $t('_discord.discordRole') }}
          </th>
          <th class="text-left">
            {{ $t('_discord.group') }}
          </th>
          <th class="text-right">
            {{ $t('actions') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="relation in relations"
          :key="relation.id"
        >
          <td>
            <v-tooltip left v-if="!getDiscordRoleName(relation.role_id)">
              <template v-slot:activator="{ on, attrs }">
                <v-icon  color="warning" v-bind="attrs"
                         v-on="on">
                  mdi-alert
                </v-icon>
              </template>
              {{ $t('_discord.discordRoleNotFound') }}
            </v-tooltip>
            {{ getDiscordRoleName(relation.role_id) }}
          </td>
          <td>{{ relation.group.name }}</td>
          <td class="text-right">
            <v-btn outlined color="error" small @click="openDeleteConfirmationDialog(relation)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </v-simple-table>
    <v-btn outlined color="success" @click="showAddRelationDialog" class="mt-3">
      <v-icon left>mdi-plus</v-icon>
      {{ $t('_discord.addRelation') }}
    </v-btn>
  </div>
</template>

<script>
import SettingTitle from './SettingTitle.vue';
import openapi from '../../api/openapi';
import DiscordRelationAddForm from '../../forms/DiscordRelationAddForm';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';

export default {
  name: 'Discord.vue',
  components: { DeleteConfirmationDialog, SettingTitle, DialogForm },
  data() {
    return {
      discordRoles: [],
      groups: [],
      guild: {},
      relationAddSchema: null,
      relations: [],
    };
  },
  beforeMount() {
    this.getDiscordRoles();
    this.getGroups();
    this.getGuild();
    this.getRelations();
  },
  methods: {
    async getDiscordRoles() {
      (await openapi).discord_getGuildRoles().then((rsp) => {
        this.discordRoles = rsp.data;
      });
    },
    async getGroups() {
      (await openapi).group_getGroups().then((rsp) => {
        this.groups = rsp.data;
      });
    },
    async getGuild() {
      (await openapi).discord_getGuild().then((rsp) => {
        this.guild = rsp.data;
      });
    },
    async getRelations() {
      (await openapi).discord_getRelations().then((rsp) => {
        this.relations = rsp.data;
      });
    },
    showAddRelationDialog() {
      this.relationAddSchema = DiscordRelationAddForm.returnForm(this.discordRoles);
      this.$refs.relationAddDialog.show();
    },
    async addRelation() {
      const data = this.$refs.relationAddDialog.getData();
      data.group_id = data.group.id;
      (await openapi).discord_addRelation(null, data).then(() => {
        this.getRelations();
        this.$refs.relationAddDialog.closeAndReset();
      })
        .catch((err) => {
          this.$refs.relationAddDialog.setErrorMessage(err.response.data.detail);
        });
    },
    getDiscordRoleName(id) {
      if (this.discordRoles === []) return false;
      if (this.discordRoles.some((r) => r.id === id)) {
        return this.discordRoles.find((r) => r.id === id).name;
      } return false;
    },
    openDeleteConfirmationDialog(relation) {
      this.$refs.relationDeleteDialog.show(relation.id);
    },
    async deleteRelation(relation) {
      (await openapi).discord_deleteRelation(relation).then(() => {
        this.getRelations();
        this.$refs.relationDeleteDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.relationDeleteDialog.setErrorMessage(err.response.data.detail);
      });
    },
  },
};
</script>

<style scoped>

</style>
