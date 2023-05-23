<template>
  <div>
  <v-tabs v-model="tabIndex">
    <v-tab v-for="tab in tabs.items" :key="tab.title">
      {{ tab.title }}
    </v-tab>
    <v-tab-item v-for="tab in tabs.items" :key="tab.title">
      <v-select :items="serverbundles" dense v-model="serverbundle_id" validate-on-blur
                item-value="id" :error="serverbundleSelectError" :rules="[v => !!v || 'Required']"
                item-text="name" hide-details="auto" :label="$t('serverbundle')" class="mt-3"/>
      <v-text-field outlined dense hide-details :label="$t('search')" v-model="search"
               prepend-inner-icon="mdi-magnify" class="mt-3" />
      <v-expansion-panels>
        <v-expansion-panel v-for="item in searchedRewards" :key="item.name">
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
                                dense
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
                  <v-btn small outlined color="success" @click="createTemplateReward(script)"
                         :disabled="!script.script">
                    <v-icon left>mdi-plus</v-icon>
                    <span>{{ $t('_reward.labels.create') }}</span>
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <span class="mt-3">
        Unlimited other rewards are possible by simply executing any command on the server.
        There is no limit but your creativity.
      </span>
    </v-tab-item>
  </v-tabs>
  </div>
</template>

<script>
import openapi from '@/api/openapi';

export default {
  name: 'RewardCatalog',
  data() {
    return {
      search: '',
      tabIndex: null,
      serverbundle_id: null,
      serverbundles: null,
      serverbundleSelectError: false,
      // All property settings: name (string), type ('text', 'number'), multi (bool)(Default: false)
      tabs: {
        values: {},
        items: [
          {
            title: 'FiveM',
            items: [
              {
                name: 'ESX',
                scripts: [
                  {
                    name: 'Add User to Group',
                    description: 'Adds the player to a group',
                    script: 'setgroup PLAYER {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Give Car',
                    description: 'Gives the player a car',
                    script: 'givecar PLAYER {{car}}',
                    properties: {
                      car: {
                        name: 'Car',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Give Money',
                    description: 'Gives the player money',
                    script: 'giveaccountmoney PLAYER {{account}} {{amount}}',
                    properties: {
                      account: {
                        name: 'Account (bank/money/black)',
                        type: 'text',
                      },
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give Weapon',
                    description: 'Gives the player a weapon',
                    script: 'giveweapon PLAYER {{weapon}} {{ammo}}',
                    properties: {
                      weapon: {
                        name: 'Weapon',
                        type: 'text',
                      },
                      ammo: {
                        name: 'Ammo',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give Weapon Component',
                    description: 'Gives the player a weapon component',
                    script: 'giveweaponcomponent PLAYER {{weapon}} {{component}}',
                    properties: {
                      weapon: {
                        name: 'Weapon',
                        type: 'text',
                      },
                      component: {
                        name: 'Component',
                        type: 'text',
                      },
                    },
                  },
                ],
              },
              {
                name: 'MyPet',
                scripts: [
                  {
                    name: 'Give Pet',
                    description: 'Gives the player a pet',
                    script: 'petadmin create PLAYER {{pet}}',
                    properties: {
                      pet: {
                        name: 'Pet',
                        type: 'text',
                      },
                    },
                  },
                ],
              },
              {
                name: 'QBCore',
                scripts: [
                  {
                    name: 'Give Money',
                    description: 'Gives the player money',
                    script: 'givemoney PLAYER {{type}} {{amount}}',
                    properties: {
                      type: {
                        name: 'Type (bank/cash/...)',
                        type: 'text',
                      },
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Further Ideas',
                scripts: [
                  {
                    name: 'Access to reserved slots',
                    description: 'Allow the player to join when the server is full. Add the player to a donator group which is then whitelisted to use reserved slots using plugins like ULX or Proper Reserved Slots',
                  },
                  {
                    name: 'Ability to change phone number',
                    description: 'Allow the player to change their phone number.',
                  },
                  {
                    name: 'Give player a backpack',
                    description: 'Give the player a backpack. For increased inventory experience.',
                  },
                ],
              },
            ],
          },
          {
            title: 'Garry\'s Mod',
            items: [
              {
                name: 'DarkRP',
                scripts: [
                  {
                    name: 'Give Money',
                    description: 'Gives the player money',
                    script: 'PLAYER:addMoney({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give Level',
                    description: 'Gives the player a DarkRP Level',
                    script: 'PLAYER:addLevel({{level}})',
                    properties: {
                      level: {
                        name: 'Level',
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Further Ideas',
                scripts: [
                  {
                    name: 'Access to reserved slots',
                    description: 'Allows the player to join when the server is full. Add the player to a donator group which is then whitelisted to use reserved slots using plugins like ULX or Proper Reserved Slots',
                  },
                ],
              },
              {
                name: 'Pointshop 1',
                scripts: [
                  {
                    name: 'Give Points',
                    description: 'Give the player points',
                    script: 'PLAYER:PS_GivePoints({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
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
                    name: 'Give Standard Points',
                    description: 'Give the player standard points',
                    script: 'PLAYER:PS2_AddStandardPoints({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give Premium Points',
                    description: 'Give the player premium points',
                    script: 'PLAYER:PS2_AddPremiumPoints({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'ULX',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    script: 'ulx adduser PLAYER {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                ],
              },
              {
                name: 'SH Pointshop',
                scripts: [
                  {
                    name: 'Give Points',
                    description: 'Give the player points',
                    script: 'PLAYER:SH_AddStandardPoints({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give Premium Points',
                    description: 'Give the player premium points',
                    script: 'PLAYER:SH_AddPremiumPoints({{amount}})',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Weapons',
                scripts: [
                  {
                    name: 'Give Weapons',
                    description: 'Give weapons to a player. Multiple weapons are possible.',
                    script: 'PLAYER:Give({{weapon}})',
                    properties: {
                      weapon: {
                        name: 'weapon',
                        type: 'text',
                        multi: true,
                      },
                    },
                  },
                  {
                    name: 'Give Weapons (Permanent)',
                    description: 'Give weapons permanently to a player. (give on spawn)',
                    script: 'PLAYER:Give({{weapon}})',
                    event: 'SPAWN',
                    properties: {
                      weapon: {
                        name: 'weapon',
                        type: 'text',
                        multi: true,
                      },
                    },
                  },
                ],
              },
            ],
          },
          {
            title: 'Minecraft',
            items: [
              {
                name: 'Economy Inc',
                scripts: [
                  {
                    name: 'Give money',
                    description: 'Give money to player.',
                    script: 'balance add PLAYER {{amount}}',
                    properties: {
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                ],
              },
              {
                name: 'EnderBag | Portable Ender Chest',
                scripts: [
                  {
                    name: 'Give Enderbag to player',
                    description: 'Players will get a portable enderchest.',
                    script: 'enderbag give PLAYER',
                  },
                ],
              },
              {
                name: 'LuckPerms',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    script: 'lp user PLAYER parent add {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Promote user on given track',
                    description: 'Promote user on given track.',
                    script: 'lp user PLAYER promote {{track}}',
                    properties: {
                      track: {
                        name: 'Track',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Remove group from user',
                    description: 'Remove group from user.',
                    script: 'lp user PLAYER parent remove {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                ],
              },
              {
                name: 'MCPets',
                scripts: [
                  {
                    name: 'Give pet to player',
                    description: 'Give pet to player.',
                    script: 'mcpets spawn {{petId}} PLAYER',
                    properties: {
                      petId: {
                        name: 'Pet',
                        type: 'text',
                      },
                    },
                  },
                ],
              },
              {
                name: 'Portable Crafting Table',
                scripts: [
                  {
                    name: 'Give portable crafting table',
                    description: 'Give portable crafting table to player.',
                    script: '/craftingtable give PLAYER',
                  },
                ],
              },
              {
                name: 'Further Ideas',
                scripts: [
                  {
                    name: 'Access to reserved slots',
                    description: 'Allows the player to join when the server is full. Add the player to a donator group which is then whitelisted to use reserved slots using other plugins.',
                  },
                  {
                    name: 'Access to some special /warp points',
                    description: 'Add the player to a donator group which is then whitelisted to use reserved slots using other plugins.',
                  },
                  {
                    name: 'Access to a player specific plot',
                    description: 'Give the player his own plot where they can build safely without the fear of destruction by other players. A Plugin could be WorldGuard.',
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },
  beforeMount() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).server_getBundles().then((rsp) => {
        this.serverbundles = rsp.data;
      });
    },
    async createTemplateReward(reward) {
      const data = { ...reward };
      console.log(this.tabs.values);

      if (!this.serverbundle_id) {
        this.serverbundleSelectError = true;
        return;
      }
      this.serverbundleSelectError = false;

      data.name = `${data.name}-Template-${Math.random().toString(36).substring(2, 5)}`;
      data.serverbundle_id = this.serverbundle_id;
      data.on_event = data.on_event ? data.on_event : 'DIRECT';
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
        this.$emit('success');
        this.tabs.values = {};
      });
    },
  },
  computed: {
    searchedRewards() {
      // Use search value to return only relevant reward templates
      return this.tabs.items[this.tabIndex]?.items?.filter((item) => item.name.includes(this.search)
          || item.scripts.find((script) => script.name.includes(this.search)
            || script.description.includes(this.search)));
    },
  },
};
</script>

<style scoped>

</style>
