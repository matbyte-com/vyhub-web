<template>
  <div>
    <SettingTitle>{{ $t('navigation') }}</SettingTitle>
    <dialog-form ref="navAddDialog" :form-schema="navlinkAddSchema"
                 :title="$t('settings.addNavlink')"
                 @submit="addLink"/>
    <!-- Edit NavLink Dialog -->
    <dialog-form ref="navEditDialog" :form-schema="navlinkAddSchema"
              :title="$t('settings.editNavLink')"
              @updated="isExternalLink"
              :max-width="1000"
              >
      <template slot="linkType-after">
        <v-carousel-transition v-if="!defaultLink">
          <v-text-field v-if="externalLink" hide-details="auto"
                        :label="$t('url')"
                        v-model="linkInput" />
          <div v-else>
            <v-divider />
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ $t('settings.editor') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <vue-editor v-model="htmlInput" />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  {{ $t('settings.rawHtml') }}
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-textarea :placeholder="$t('settings.rawHtml')" v-model="rawHtmlInput"/>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </v-carousel-transition>
      </template>
    </dialog-form>
    <!-- real Component -->
    <v-list>
      <draggable
        :list="links"
        @change="updateLinkEnabled = true">
        <div
          v-for="link in links"
          :key="link.title">
          <v-list-item>
            <v-row :class="!link.enabled ? 'text--disabled' : ''">
              <v-col cols="1">
                <v-icon>
                  {{ link.icon }}
                </v-icon>
              </v-col>
              <v-col cols="3">
                {{ link.title }}
              </v-col>
              <v-col cols="3">
                {{ link.link }}
              </v-col>
              <v-col class="text-right">
                <v-icon v-if="link.html">
                  mdi-web
                </v-icon>
                <v-icon v-if="!link.defaultLink && !link.html" class="ml-1">
                  mdi-link
                </v-icon>
              </v-col>
              <v-col cols="1" class="text-right">
                <v-icon small class="mr-2" @click="openNavEditDialog(link)">
                  mdi-pencil
                </v-icon>
              </v-col>
            </v-row>
          </v-list-item>
        </div>
      </draggable>
    </v-list>
    <v-divider class="mb-3"/>
    <v-row>
      <v-col>
        <v-btn outlined color="success" @click="openNavAddDialog">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('settings.addLink') }}</span>
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn outlined color="primary" class="ml-5" v-on="on" v-bind="attrs"
                   style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                   @click="updateLinkOrder" :disabled="!updateLinkEnabled">
              <v-icon>mdi-sync</v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('settings.navUpdate') }}
          </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn outlined color="primary" v-on="on" v-bind="attrs" :disabled="!updateLinkEnabled"
                   style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                   @click="getNavItems">
              <v-icon>mdi-keyboard-return</v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('settings.navReset') }}
          </span>
        </v-tooltip>
      </v-col>
      <v-col>
        <v-row class="text--disabled">
          <v-col>
            <v-icon disabled>
              mdi-web
            </v-icon>
            {{ $t('settings.htmlContent') }}
          </v-col>
          <v-col>
            <v-icon disabled>
              mdi-link
            </v-icon>
            {{ $t('settings.externalLink') }}
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import DialogForm from '@/components/DialogForm.vue';
import NavlinkAddForm from '@/forms/NavlinkAddForm';
import { VueEditor } from 'vue2-editor';
import api from '@/api/api';
import EventBus from '@/services/EventBus';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Navigation',
  components: {
    SettingTitle,
    DialogForm,
    draggable,
    VueEditor,
  },
  data() {
    return {
      navlinkAddSchema: null,
      externalLink: false,
      linkInput: null,
      htmlInput: null,
      rawHtmlInput: null,
      defaultLink: null,
      updateLinkEnabled: false,
      links: [
        {
          title: 'News', icon: 'mdi-newspaper', link: '/news', tabs: [], enabled: false, defaultLink: true, html: true,
        },
        {
          title: 'Dashboard', icon: 'mdi-account', link: '/dashboard', enabled: true, defaultLink: true,
          // title: 'Dashboard', icon: 'mdi-account', link: '/home', tabs: [{ title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }, { title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }],
        },
        {
          title: 'Shop', icon: 'mdi-sack', link: '/shop', tabs: [], enabled: true, defaultLink: true, html: false,
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', link: '/ban', reqProp: 'ban_show', enabled: true, defaultLink: true, html: false,
        },
        {
          title: 'Settings', icon: 'mdi-cog-outline', link: '/settings', tabs: [], enabled: true, defaultLink: true, html: false,
        },
      ],
      linksRight: [
        {
          title: 'Profil', icon: 'mdi-account-circle', link: '/',
        },
        {
          title: 'Settings', icon: 'mdi-cog', link: '/settings',
        },
      ],
    };
  },
  beforeMount() {
    this.getNavItems();
  },
  methods: {
    getNavItems() {
      api.design.getNavItems().then((rsp) => {
        this.updateLinkEnabled = false;
        this.links = rsp.data;
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    openNavEditDialog(item) {
      if (item.defaultLink) {
        this.navlinkAddSchema = NavlinkAddForm.returnForm(true);
        this.defaultLink = true;
      } else {
        this.navlinkAddSchema = NavlinkAddForm.returnForm();
        this.defaultLink = false;
      }
      this.$refs.navEditDialog.show(item);
      this.$refs.navEditDialog.setData(item);
    },
    isExternalLink() {
      if (this.$refs.navEditDialog.getData().linkType === 'link') {
        this.externalLink = true;
      } else {
        this.externalLink = false;
      }
    },
    openNavAddDialog() {
      this.navlinkAddSchema = NavlinkAddForm.returnForm();
      this.$refs.navAddDialog.show();
    },
    addLink() {
      const data = this.$refs.navAddDialog.getData();
      data.defaultLink = false;
      this.links.push(data);
      api.design.setNavItems(this.links).then(() => {
        this.$refs.navAddDialog.closeAndReset();
        this.getNavItems();
        EventBus.emit('navUpdated');
      }).catch((err) => {
        this.$refs.navAddDialog.setErrorMessage(err.response.data.detail);
        this.links.pop();
      });
    },
    updateLinkOrder() {
      api.design.setNavItems(this.links).then(() => {
        this.updateLinkEnabled = false;
        this.getNavItems();
        EventBus.emit('navUpdated');
      }).catch((err) => {
        console.log(`Could not query nav ${err}`);
      });
    },
  },
};
</script>

<style scoped>

</style>
