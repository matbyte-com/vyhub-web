<template>
  <div>
  <v-tabs v-model="tabIndex">
    <v-tab v-for="tab in tabs.items" :key="tab.title">
      {{ tab.title }}
    </v-tab>
    <v-tab-item v-for="tab in tabs.items" :key="tab.title">
      <v-select :items="serverbundles" dense v-model="serverbundle_id" validate-on-blur
                item-value="id"
                :error="serverbundleSelectError" :rules="[v => !!v || $t('required')]"
                item-text="name" hide-details="auto" :label="$t('serverbundle')" class="mt-3"/>
      <v-text-field outlined dense hide-details :label="$t('search')" v-model="search"
               prepend-inner-icon="mdi-magnify" class="mt-3" />
      <v-expansion-panels class="mb-5">
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
                  <div class="mb-1 ml-3" v-html="script.description">
                  </div>
                  <v-divider v-if="script.script || script.command" class="mb-4" />
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-row>
                        <v-col cols="12">
                          <div v-for="(property, key) in script.properties" :key="key">
                            <div
                              v-if="property.multi === false || property.multi === undefined">
                              <v-text-field
                                :error="missingInput"
                                :rules="[v => !!v || $t('required')]"
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
                                :error="missingInput"
                                :rules="[v => !!v || $t('required')]"
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
                  <v-btn v-if="script.script || script.command"
                         small outlined color="success" @click="createTemplateReward(script, item)">
                    <v-icon left>mdi-plus</v-icon>
                    <span>{{ $t('_reward.labels.create') }}</span>
                  </v-btn>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <span v-if="tab.title !== 'Discord' && tab.title !== 'Teamspeak 3 (TS3)'">
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
      missingInput: false,
      /*
      * All possible property settings:
      * name (string), type ('text', 'number'), multi (bool)(Default: false)
       */
      tabs: {
        values: {},
        items: [
          {
            title: 'Discord',
            items: [
              {
                name: 'Groups',
                scripts: [
                  {
                    name: 'Add User to Group',
                    description: 'Adds the user to a Discord group. Use the <b>VyHub group sync feature</b> for this. Create a membership reward and add a group-mapping between VyHub group and Discord role. Find a guide in the <a href="https://docs.vyhub.net/latest/guide/group" target="_blank">documentation</a>.',
                  },
                ],
              },
            ],
          },
          {
            title: 'FiveM',
            items: [
              {
                name: 'Chat',
                scripts: [
                  {
                    name: 'Server-wide Purchase Message',
                    description: 'Sends a chat message to all players that informs about a purchase',
                    command: 'say "%nick% just purchased %packet_title% for %purchase_amount%',
                  },
                ],
              },
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
                name: 'Point Shop (Dimbo Scripts)',
                scripts: [
                  {
                    name: 'Give Points',
                    description: 'Gives the player points',
                    script: 'givepoints PLAYER {{amount}}',
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
                name: 'Chat',
                scripts: [
                  {
                    name: 'Server-wide Purchase Message',
                    description: 'Sends a chat message to all players that informs about a purchase',
                    script: 'VyHub.Util:print_chat_all("<green>%nick%</green> just purchased <red>%packet_title%</red> for <green>%purchase_amount%</green>")',
                  },
                ],
              },
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
                name: 'SAM',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    command: 'sam setrank %nick% {{group}}',
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
                name: 'ULX',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    command: 'ulx adduser %nick% {{group}}',
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
                    script: 'PLAYER:Give("{{weapon}}")',
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
                    script: 'PLAYER:Give("{{weapon}}")',
                    on_event: 'SPAWN',
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
                name: 'Chat',
                scripts: [
                  {
                    name: 'Server-wide Purchase Message',
                    description: 'Sends a chat message to all players that informs about a purchase',
                    command: 'say "%nick% just purchased %packet_title% for %purchase_amount%',
                  },
                ],
              },
              {
                name: 'Economy Inc',
                scripts: [
                  {
                    name: 'Give money',
                    description: 'Give money to player.',
                    command: 'balance add %nick% {{amount}}',
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
                    command: 'enderbag give %nick%',
                  },
                ],
              },
              {
                name: 'LuckPerms',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    command: 'lp user %nick% parent add {{group}}',
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
                    command: 'lp user %nick% promote {{track}}',
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
                    command: 'lp user %nick% parent remove {{group}}',
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
                    command: 'mcpets spawn {{petId}} %nick%',
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
                    command: 'craftingtable give %nick%',
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
          {
            title: 'Rust',
            items: [
              {
                name: 'Chat',
                scripts: [
                  {
                    name: 'Server-wide Purchase Message',
                    description: 'Sends a chat message to all players that informs about a purchase',
                    command: 'say <color=green>"%nick%</color> just purchased <color=red>%packet_title%</color> for <color=green>%purchase_amount%</color>"',
                  },
                ],
              },
              {
                name: 'Plugins by Mevent',
                scripts: [
                  {
                    name: 'Crafts',
                    description: 'Crafting system that allows you to create items, cars, vehicles, recyclers, etc!',
                  },
                  {
                    name: 'Helpful Supply',
                    description: 'Adds to your server supply signals, which can be divided into categories of loot, such as: medicine, weapons, clothing, explosives, and others.',
                  },
                  {
                    name: 'Necronomicon',
                    description: 'A player puts all his blueprints in a book and then he can gift that book to another one who can unlock all of the blueprints the player had So it allows players to put all their blueprints in a book that can be unrwaped',
                  },
                  {
                    name: 'Genie',
                    description: 'Adds a Genie Lamp to the game, which you can unwrap and receive an award. This will greatly diversify the game on your server. My advice is to add them to your underwater crates and use Dynamic Config to set up rewards over the course of the wipe ',
                  },
                  {
                    name: 'Car Sharing',
                    description: 'Adds to your server the ability to rent a car and ride it all over the map. You can also install bots in which you can rent a car.',
                  },
                  {
                    name: 'skills',
                    description: 'Plugin adds a system of 18+ different skills',
                  },
                  {
                    name: 'Bank System',
                    description: 'Adds a banking system to the game. It is an extended system of economics.',
                  },
                ],
              },
              {
                name: 'Backpacks by WhiteThunder',
                scripts: [
                  {
                    name: 'Give player access to backpack',
                    description: 'Giving the player access to a backpack with more storage is a cool benefit. You should use the permission system of oxide to do this.',
                  },
                ],
              },
              {
                name: 'Box Sorter Lite by haggbart',
                scripts: [
                  {
                    name: 'Give player access to an sorter, which makes loot sorting a breeze',
                    description: 'Giving the player access to a sorter is a pretty cool benefit. You should use the permission system of oxide to do this.',
                  },
                ],
              },
              {
                name: 'Carbon',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    command: 'carbon.usergroup add %steamid64% {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Remove group from user',
                    description: 'Remove group from user.',
                    command: 'carbon.usergroup add %steamid64% {{group}}',
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
                name: 'Oxide / Umod',
                scripts: [
                  {
                    name: 'Add user to group',
                    description: 'Add user to given group.',
                    command: 'oxide.usergroup add %steamid64% {{group}}',
                    properties: {
                      group: {
                        name: 'Group',
                        type: 'text',
                      },
                    },
                  },
                  {
                    name: 'Remove group from user',
                    description: 'Remove group from user.',
                    command: 'oxide.usergroup add %steamid64% {{group}}',
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
                name: 'Items / Resources / Weapons',
                scripts: [
                  {
                    name: 'Give resources / items to player',
                    description: 'Give the player resources or items.',
                    command: 'inventory.giveto %steamid64% {{item}} {{amount}}',
                    properties: {
                      item: {
                        name: 'Item / Resource (Short Name)',
                        type: 'text',
                      },
                      amount: {
                        name: 'Amount',
                        type: 'number',
                      },
                    },
                  },
                  {
                    name: 'Give arms (weapons) to player',
                    description: 'Give the player arms.',
                    command: 'inventory.givearm %steamid64% {{arm}} {{amount}}',
                    properties: {
                      item: {
                        name: 'Arm / Weapon (Short Name)',
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
                    description: 'Allows the player to join when the server is full. Add the player to a donator group which is then whitelisted to use reserved slots using other plugins.',
                  },
                ],
              },
            ],
          },
          {
            title: 'Teamspeak 3 (TS3)',
            items: [
              {
                name: 'Groups',
                scripts: [
                  {
                    name: 'Add User to Group',
                    description: 'Adds the user to a Teamspeak group. Use the <b>VyHub group sync feature</b> for this. Create a membership reward and add a group-mapping between VyHub group and Teamspeak group. Find a guide in the\n'
                      + '        <a href="https://docs.vyhub.net/latest/guide/group" target="_blank">documentation</a>.',
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
    async createTemplateReward(reward, cat) {
      const data = { ...reward };
      this.missingInput = false;

      if (!this.serverbundle_id) {
        this.serverbundleSelectError = true;
        return;
      }
      this.serverbundleSelectError = false;

      data.name = `${data.name} (${cat.name})`;
      data.serverbundle_id = this.serverbundle_id;
      data.on_event = data.on_event ? data.on_event : 'DIRECT';

      let type;
      if (data.script) {
        data.type = 'SCRIPT';
        type = 'script';
      } else if (data.command) {
        data.type = 'COMMAND';
        type = 'command';
      }

      const inputs = data[type].match(/{{.*?}}/g);
      if (inputs) {
        inputs.forEach((input) => {
          const replace = input.replace(/{{|}}/g, '');
          // check for missing fields
          if (!(replace in this.tabs.values)) {
            this.missingInput = true;
            return;
          }
          if (Array.isArray(this.tabs.values[replace])) {
            const startAt = data[type].indexOf('(');
            const command = data[type].substring(0, startAt + 1);
            const itemArray = this.tabs.values[replace];
            const newScriptArray = [];
            itemArray.forEach((item) => {
              newScriptArray.push(`${command}${item})`);
            });
            data[type] = newScriptArray.join(' ');
          } else if (this.tabs.values[replace]) {
            data[type] = data[type].replace(input, this.tabs.values[replace]);
          }
        });
      }
      if (this.missingInput) {
        return;
      }

      if (data.script) {
        data.data = {
          script: data.script,
        };
      } else if (data.command) {
        data.data = {
          command: data.command,
        };
      }
      delete data.script;
      delete data.command;
      delete data.run;
      delete data.description;
      delete data.properties;
      (await openapi).packet_addReward(null, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.createSuccess'),
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
