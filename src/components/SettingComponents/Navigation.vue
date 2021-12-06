<template>
  <div>
    <SettingTitle>{{ $t('navigation') }}</SettingTitle>
    <dialog-form ref="navAddDialog" :form-schema="navlinkAddSchema"
                 :title="$t('settings.addNavlink')"
                 @submit="addLink"/>
    <delete-confirmation-dialog ref="deleteConfirmationDialog" @submit="deleteNav"/>
    <!-- Edit NavLink Dialog -->
    <dialog-form ref="navEditDialog" :form-schema="navlinkAddSchema"
              :title="$t('settings.editNavLink')"
              @updated="isExternalLink"
              :max-width="1000"
              @submit="editNavItem"
              >
      <template slot="linkType-after">
        <v-carousel-transition v-if="!defaultLink">
          <v-text-field v-if="externalLink" hide-details="auto"
                        :label="$t('url')"
                        v-model="linkInput"
                        :rules="[rules.http]"
                        :placeholder="$i18n.t('settings.httpPlaceholder')"
                        />
          <div v-else>
            <v-alert
              type="warning" outlined
              dense
            >{{ $t('settings.contentSanitizationWarning') }}</v-alert>
            <v-expansion-panels flat>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row>
                    <v-badge :value="htmlInput" inline dot class="float-left">
                      {{ $t('settings.editor') }}
                    </v-badge>
                  </v-row>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <vue-editor v-model="htmlInput" />
                </v-expansion-panel-content>
              </v-expansion-panel>
              <v-expansion-panel>
                <v-expansion-panel-header>
                  <v-row>
                    <v-badge :value="rawHtmlInput" inline dot class="float-left">
                      {{ $t('settings.rawHtml') }}
                    </v-badge>
                  </v-row>
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
                  <v-icon v-if="link.linkType === 'html'" class="mr-1">
                    mdi-web
                  </v-icon>
                  <v-icon v-if="link.linkType === 'link'" class="mr-1">
                    mdi-link
                  </v-icon>
                  <v-btn outlined color="primary" small
                         @click="openNavEditDialog(link)" class="mr-1">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn :disabled="link.linkType==='default'"
                         outlined color="error" small @click="openDeleteConfirmationDialog(link)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
        </div>
      </draggable>
    </v-list>
    <v-divider class="mb-3"/>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn outlined color="success" @click="openNavAddDialog">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('settings.addLink') }}</span>
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn outlined color="primary" class="ml-5" v-on="on" v-bind="attrs"
                   style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                   @click="updateLinkOrder" :disabled="!updateLinkEnabled">
              <v-icon>mdi-check</v-icon>
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
              <v-icon>mdi-backspace-outline</v-icon>
            </v-btn>
          </template>
          <span>
            {{ $t('settings.navReset') }}
          </span>
        </v-tooltip>
      </v-col>
      <v-col class="text--disabled" :class="$vuetify.breakpoint.mdAndDown ? '' : 'text-right'">
        <span class="mr-3">
          <v-icon disabled>
          mdi-web
        </v-icon>
        {{ $t('settings.htmlContent') }}
        </span>
        <span>
          <v-icon disabled>
          mdi-link
        </v-icon>
        {{ $t('settings.externalLink') }}
        </span>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { VueEditor } from 'vue2-editor';
import draggable from 'vuedraggable';
import DialogForm from '@/components/DialogForm.vue';
import NavlinkAddForm from '@/forms/NavlinkAddForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import i18n from '@/plugins/i18n';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Navigation',
  components: {
    DeleteConfirmationDialog,
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
      rules: {
        http: (value) => {
          const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
          return pattern.test(value) || i18n.t('htmlNoMatch');
        },
      },
      links: [
        {
          title: 'News', icon: 'mdi-newspaper', link: '/news', tabs: [], enabled: false, linkType: 'default',
        },
        {
          title: 'Dashboard', icon: 'mdi-account', link: '/dashboard', enabled: true, linkType: 'default',
          // title: 'Dashboard', icon: 'mdi-account', link: '/home', tabs: [{ title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }, { title: 'Edit', icon:
          // 'mdi-home-edit-outline', link: '/dashboard' }],
        },
        {
          title: 'Shop', icon: 'mdi-sack', link: '/shop', tabs: [], enabled: true, linkType: 'default',
        },
        {
          title: 'Bans', icon: 'mdi-account-cancel', link: '/ban', reqProp: 'ban_show', enabled: true, linkType: 'default',
        },
        {
          title: 'Settings', icon: 'mdi-cog-outline', link: '/settings', tabs: [], enabled: true, linkType: 'default',
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
    async getNavItems() {
      (await openapi).general_getNavItems().then((rsp) => {
        this.updateLinkEnabled = false;
        this.links = rsp.data;
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    openDeleteConfirmationDialog(link) {
      this.$refs.deleteConfirmationDialog.show(link);
    },
    async openNavEditDialog(item) {
      this.rawHtmlInput = null;
      this.htmlInput = null;
      this.linkInput = null;
      if (item.linkType === 'default') {
        this.navlinkAddSchema = NavlinkAddForm.returnForm(true);
        this.defaultLink = true;
      } else {
        this.navlinkAddSchema = NavlinkAddForm.returnForm();
        this.defaultLink = false;
      }
      this.linkInput = item.link;
      if (item.linkType === 'html' && item.html) {
        (await openapi).general_getCmsHtml(item.html)
          .then((rsp) => { this.rawHtmlInput = rsp.data.content; });
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
    async addLink() {
      const data = this.$refs.navAddDialog.getData();
      // check if Title already used
      if (this.links.find((l) => l.title === data.title)) {
        this.$refs.navAddDialog.setErrorMessage('Title already used');
        return;
      }
      // set link for html content
      if (data.linkType === 'html') {
        data.link = `/cms/${data.title.toLowerCase()}`;
      }
      this.links.push(data);
      (await openapi).general_updateNavItems(null, this.links).then(() => {
        this.$refs.navAddDialog.closeAndReset();
        this.getNavItems();
        EventBus.emit('navUpdated');
        this.$notify({
          title: this.$t('_navigation.messages.addedLink'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.navAddDialog.setErrorMessage(err.response.data.detail);
        this.links.pop();
      });
    },
    async updateLinkOrder() {
      (await openapi).general_updateNavItems(null, this.links).then(() => {
        this.updateLinkEnabled = false;
        this.getNavItems();
        EventBus.emit('navUpdated'); // Event caught in Header to Update Navlinks
        this.$notify({
          title: this.$t('_navigation.messages.updatedLinkOrder'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`Could not query nav ${err}`);
      });
    },
    async deleteNav(nav) {
      if (nav.linkType === 'default') {
        this.$refs.deleteConfirmationDialog.setErrorMessage('Can not delete default links');
        return;
      }
      const index = this.links.findIndex((l) => l.title === nav.title);
      if (index > -1) {
        this.links.splice(index, 1);
      } else {
        this.$refs.deleteConfirmationDialog.setErrorMessage('Couldnt find index of nav object to update');
        return;
      }
      (await openapi).general_deleteCmsHtml(nav.html);
      this.updateLinkOrder();
      this.$refs.deleteConfirmationDialog.closeAndReset();
      this.$notify({
        title: this.$t('_navigation.messages.removedLink'),
        type: 'success',
      });
    },
    async editNavItem(nav) {
      // check for html content and return if both are not null
      if (this.htmlInput && this.rawHtmlInput) {
        this.$refs.navEditDialog.setErrorMessage('Do not use both HTML inputs');
        return;
      }
      const linkUpdated = this.$refs.navEditDialog.getData();
      // Do not Update Link if default type!
      if (linkUpdated.linkType === 'default') {
        linkUpdated.link = nav.link;
      }
      // Copy link tabs to new link
      linkUpdated.tabs = nav.tabs;
      // Copy html cms Id to updated link
      linkUpdated.html = nav.html;
      // Update html Link to new Title (replace title after last backslash /)
      if (linkUpdated.linkType === 'html') {
        linkUpdated.link = `/cms/${linkUpdated.title.toLowerCase()}`;
        // find html input to update
        let inputToUpdate = this.rawHtmlInput;
        if (this.rawHtmlInput == null) {
          inputToUpdate = this.htmlInput;
        }
        // html content
        if (nav.html) {
          // update existing HTML Page Entry
          await (await openapi).general_updateCmsHtml(nav.html, { content: inputToUpdate });
          linkUpdated.html = nav.html;
        } else {
          // create new HTML Page Entry and save UUID
          await (await openapi).general_createCmsHtml(null, { content: inputToUpdate })
            .then((rsp) => { linkUpdated.html = rsp.data.id; })
            .catch((err) => {
              this.$refs.navEditDialog.setErrorMessage(err);
              throw (err);
            });
        }
      }
      // Update External Link when needed
      if (linkUpdated.linkType === 'link') {
        linkUpdated.link = this.linkInput;
      }
      // find correct object in array and replace it with newly updated
      const index = this.links.findIndex((l) => l.title === nav.title);
      if (index > -1) {
        this.links.splice(index, 1, linkUpdated);
      } else {
        this.$refs.navEditDialog.setErrorMessage('Couldnt find index of nav object to update');
        return;
      }
      // send updated link to server
      await this.updateLinkOrder();
      this.$refs.navEditDialog.closeAndReset();
      this.$notify({
        title: this.$t('_navigation.messages.editedLink'),
        type: 'success',
      });
    },
  },
};
</script>

<style scoped>

</style>
