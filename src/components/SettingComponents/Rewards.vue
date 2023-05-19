<template>
  <div>
    <SettingTitle docPath="/guide/shop/reward">
      {{ $t('rewards') }}
    </SettingTitle>

    <DataTable
      :headers="headers"
      :items="rewards"
      :showSearch="true">
      <template v-slot:footer-right>
        <v-btn outlined color="success" @click="$refs.createRewardDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_reward.labels.create') }}</span>
        </v-btn>
        <v-btn class="ml-1" outlined color="success" @click="$refs.appliedRewardSyncDialog.show()"
               v-if="$checkProp('applied_packet_edit')">
          <v-icon>mdi-sync</v-icon>
        </v-btn>
        <v-btn outlined color="success" @click="$refs.useTemplateDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_reward.labels.Templates') }}</span>
        </v-btn>
      </template>
      <template v-slot:item.once="{ item }">
        <BoolIcon :value="item.once"></BoolIcon>
      </template>
      <template v-slot:item.actions="{ item }">
        <div class="text-right">
          <v-btn outlined color="primary" small @click="showEditDialog(item)" class="mr-1">
            <v-icon>
              mdi-pencil
            </v-icon>
          </v-btn>
          <v-btn outlined color="error" small @click="$refs.deleteRewardDialog.show(item)">
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </div>
      </template>
    </DataTable>
    <DialogForm
      ref="createRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submitText="$t('create')"
      @submit="createReward"
      :title="$t('_reward.labels.create')">
      <template slot="allOf-0.serverbundle-after">
        <b>{{ $t('_reward.labels.checkForReplacements') }}:</b>
        <br/>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/gmod/" class="mr-2"><v-btn small>GMOD</v-btn></a>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/minecraft/" class="mr-2"><v-btn small>Minecraft</v-btn></a>
        <a target="_blank" href="https://docs.vyhub.net/latest/game/discord/" class="mr-2"><v-btn small>Discord</v-btn></a>
      </template>
    </DialogForm>
    <DialogForm
      ref="editRewardDialog"
      :form-schema="rewardSchema"
      icon="mdi-star-shooting"
      :submitText="$t('edit')"
      @submit="editReward"
      :title="$t('_reward.labels.edit')">
    </DialogForm>
    <Dialog
      title="Templates (WIP)"
      ref="useTemplateDialog"
      icon="mdi-star-shooting"
    >
      <v-tabs>
        <v-tab v-for="tab in tabs.items" :key="tab.title">
          {{ tab.title }}
        </v-tab>
        <v-tab-item v-for="tab in tabs.items" :key="tab.title">
          <v-expansion-panels>
            <v-expansion-panel v-for="item in tab.items" :key="item.name">
              <v-expansion-panel-header>
                {{ item.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-expansion-panels>
                  <v-expansion-panel v-for="script in item.scripts" :key="script.name">
                    <v-expansion-panel-header>
                      {{ script.name }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div class="mb-1 ml-3">
                        {{ script.description }}
                      </div>
                      <v-divider class="mb-4" />
                      <v-row>
                        <v-col cols="12" md="6">
                          <v-row>
                            <v-col cols="12">
                              <div v-for="(property, key) in script.properties" :key="key">
                                <div
                                  v-if="property.multi === false || property.multi === undefined">
                                  <v-text-field
                                    :key="key"
                                    :label="property.name"
                                    v-model="tabs.values[key]"
                                    outlined
                                    dense
                                    :type="property.type === 'number' ? 'number' : 'text'"
                                  />
                                </div>
                                <div v-else>
                                  <v-combobox
                                    :key="key"
                                    :label="property.name"
                                    v-model="tabs.values[key]"
                                    outlined
                                    chips
                                    multiple
                                    :type="property.type === 'number' ? 'number' : 'text'"
                                  />
                                </div>
                              </div>
                            </v-col>
                          </v-row>
                        </v-col>
                      </v-row>
                      <v-btn small outlined color="success" @click="createTemplateReward(script)">
                        <v-icon left>mdi-plus</v-icon>
                        <span>{{ $t('_reward.labels.create') }}</span>
                      </v-btn>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-tab-item>
      </v-tabs>
    </Dialog>
    <DeleteConfirmationDialog
      ref="deleteRewardDialog"
      @submit="deleteReward"/>
    <SyncAppliedRewardsPacketsDialog @success="fetchData" ref="appliedRewardSyncDialog"/>
  </div>
</template>

<script>
import SyncAppliedRewardsPacketsDialog
  from '@/components/ShopComponents/Admin/RewardToAppliedPacketAddDialog.vue';
import Dialog from '@/components/Dialog.vue';
import admin from '@/views/Shop/Admin.vue';
import GMOD from '@/components/DashboardComponents/Dashboards/Bundle/GMOD.vue';
import SettingTitle from './SettingTitle.vue';
import DataTable from '../DataTable.vue';
import openapi from '../../api/openapi';
import DialogForm from '../DialogForm.vue';
import DeleteConfirmationDialog from '../DeleteConfirmationDialog.vue';
import RewardForm from '../../forms/RewardForm';
import BoolIcon from '../BoolIcon.vue';

export default {
  name: 'Rewards',
  computed: {
    GMOD() {
      return GMOD;
    },
    admin() {
      return admin;
    },
  },
  components: {
    SyncAppliedRewardsPacketsDialog,
    Dialog,
    BoolIcon,
    DeleteConfirmationDialog,
    DialogForm,
    DataTable,
    SettingTitle,
  },
  data() {
    return {
      headers: [
        { text: this.$t('name'), value: 'name' },
        { text: this.$t('type'), value: 'type' },
        { text: this.$t('oneTime'), value: 'once' },
        {
          text: this.$t('actions'), value: 'actions', width: '200px', sortable: false, align: 'right',
        },
      ],
      // All property settings: name (string), type ('text', 'number'), multi (bool)(Default: false)
      tabs: {
        values: {},
        items: [
          {
            title: 'Garry\'s Mod',
            items: [
              {
                name: 'DarkRP',
                scripts: [
                  {
                    name: this.$t('_reward.darkrp.giveMoney'),
                    description: this.$t('_reward.darkrp.giveMoneyDescription'),
                    script: 'PLAYER:addMoney({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: this.$t('_reward.darkrp.giveLevel'),
                    description: this.$t('_reward.darkrp.giveLevelDescription'),
                    script: 'PLAYER:addLevel({{level}})',
                    properties: {
                      level: {
                        name: this.$t('level'),
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Pointshop 1',
                scripts: [
                  {
                    name: this.$t('_reward.pointshop.givePoints'),
                    description: this.$t('_reward.pointshop1.givePointsDescription'),
                    script: 'PLAYER:PS_GivePoints({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Pointshop 2',
                scripts: [
                  {
                    name: this.$t('_reward.pointshop2.giveStandardPoints'),
                    description: this.$t('_reward.pointshop2.givePointsDescription'),
                    script: 'PLAYER:PS2_AddStandardPoints({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: this.$t('_reward.pointshop2.givePremiumPoints'),
                    description: this.$t('_reward.pointshop2.givePremiumPointsDescription'),
                    script: 'PLAYER:PS2_AddPremiumPoints({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'SH Pointshop',
                scripts: [
                  {
                    name: this.$t('_reward.sh_pointshop.giveStandardPoints'),
                    description: this.$t('_reward.shPointshop.givePointsDescription'),
                    script: 'PLAYER:SH_AddStandardPoints({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: this.$t('_reward.sh_pointshop.givePremiumPoints'),
                    description: this.$t('_reward.shpointshop.givePremiumPointsDescription'),
                    script: 'PLAYER:SH_AddPremiumPoints({{amount}})',
                    properties: {
                      amount: {
                        name: this.$t('amount'),
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: this.$t('weapons'),
                scripts: [
                  {
                    name: this.$t('_reward.weapon.giveWeapon'),
                    description: this.$t('_reward.weapons.giveWeaponDescription'),
                    script: 'PLAYER:Give({{weapon}})',
                    properties: {
                      weapon: {
                        name: this.$t('weapon'),
                        type: 'text',
                        multi: true,
                      },
                    },
                  },
                ],
              },
            ],
          },
        ],
      },
      rewards: null,
      rewardSchema: RewardForm,
      currentType: null,
      currentServerbundle: null,
      bundles: null,
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      const api = await openapi;

      api.packet_getRewards().then((rsp) => {
        this.rewards = rsp.data;
      }).catch((err) => {
        console.log(err);
        this.utils.notifyUnexpectedError(err.response.data);
      });

      (await openapi).server_getBundles().then((rsp) => {
        this.bundles = rsp.data;
      });
    },
    async createReward() {
      const data = this.$refs.createRewardDialog.getData();

      data.order = 0;
      data.serverbundle_id = data.serverbundle.id;
      delete data.serverbundle;

      const api = await openapi;

      api.packet_addReward(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.createRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.createRewardDialog.setError(err);
      });
    },
    async editReward(reward) {
      const data = this.$refs.editRewardDialog.getData();

      data.order = 0;
      data.serverbundle_id = data.serverbundle.id;
      delete data.serverbundle;

      const api = await openapi;

      api.packet_editReward({ uuid: reward.id }, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.editRewardDialog.setError(err);
      });
    },
    async deleteReward(reward) {
      const api = await openapi;

      api.packet_deleteReward({ uuid: reward.id }).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteRewardDialog.closeAndReset();
      }).catch((err) => {
        console.log(err);
        this.$refs.deleteRewardDialog.setError(err);
      });
    },
    showEditDialog(reward) {
      const data = { ...reward };

      this.$refs.editRewardDialog.setData(data);
      this.$refs.editRewardDialog.show(reward);
    },
    async createTemplateReward(reward) {
      const data = { ...reward };
      console.log(this.tabs.values);

      const demoBundle = this.bundles[0];
      if (!demoBundle) {
        this.$notify({
          title: this.$t('_reward.messages.noServerbundle'),
          type: 'error',
        });
        return;
      }
      data.name = `${data.name}-Template-${Math.random().toString(36).substring(2, 5)}`;
      data.serverbundle_id = demoBundle.id;
      data.on_event = 'DIRECT';
      data.type = 'SCRIPT';

      const inputs = data.script.match(/{{.*?}}/g);
      if (inputs) {
        inputs.forEach((input) => {
          const replace = input.replace(/{{|}}/g, '');
          if (Array.isArray(this.tabs.values[replace])) {
            const startAt = data.script.indexOf('(');
            const command = data.script.substring(0, startAt + 1);
            const itemArray = this.tabs.values[replace];
            const newScriptArray = [];
            itemArray.forEach((item) => {
              newScriptArray.push(`${command}${item})`);
            });
            data.script = newScriptArray.join(' ');
          } else if (this.tabs.values[replace]) {
            data.script = data.script.replace(input, this.tabs.values[replace]);
          }
        });
      }

      data.data = {
        script: data.script,
      };
      delete data.script;
      delete data.run;
      delete data.description;
      delete data.properties;
      (await openapi).packet_addReward(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_reward.messages.createSuccess'),
          type: 'success',
        });
        this.$refs.useTemplateDialog.close();
        this.tabs.values = {};
      });
    },
  },
};
</script>

<style scoped>

</style>
