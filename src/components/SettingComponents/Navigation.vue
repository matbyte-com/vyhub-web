<template>
  <div>
    <SettingTitle docPath="/guide/navigation">
      {{ $t('_navigation.title') }}
    </SettingTitle>
    <dialog-form ref="cmsAddDialog" :form-schema="cmsPageAddSchema"
                 icon="mdi-navigation-outline" :max-width="1000"
                 :title="$t('_navigation.addCmsPage')"
                 @submit="createCmsPage">
      <template slot="title-after">
        <v-alert
          type="warning" outlined
          dense
        >{{ $t('_settings.contentSanitizationWarning') }}
        </v-alert>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-badge :value="htmlInput" inline dot class="float-left">
                  {{ $t('_settings.editor') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <editor v-model="htmlInput"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-badge :value="rawHtmlInput" inline dot class="float-left">
                  {{ $t('_settings.rawHtml') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea :placeholder="$t('_settings.rawHtml')" v-model="rawHtmlInput"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </dialog-form>
    <dialog-form ref="cmsEditDialog" :form-schema="cmsPageAddSchema"
                 icon="mdi-navigation-outline"
                 :title="$t('_navigation.editCmsPage')"
                 @submit="editCmsPage"/>
    <delete-confirmation-dialog ref="cmsDeleteDialog" @submit="deleteCmsPage"/>
    <dialog-form ref="navAddDialog" :form-schema="navlinkAddSchema"
                 icon="mdi-navigation-outline"
                 :title="$t('_navigation.addNavLink')"
                 @submit="addLink"/>
    <dialog-form ref="navEditDialog" :form-schema="navlinkAddSchema"
                 icon="mdi-navigation-outline"
                 :title="$t('_navigation.editNavLink')"
                 @submit="editLink"/>
    <delete-confirmation-dialog ref="deleteNavConfirmationDialog" @submit="deleteNav"/>
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
        <v-btn outlined color="success" @click="$refs.navAddDialog.show()">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_settings.addLink') }}</span>
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
            {{ $t('_settings.navUpdate') }}
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
            {{ $t('_settings.navReset') }}
          </span>
        </v-tooltip>
      </v-col>
      <v-col class="text--disabled" :class="$vuetify.breakpoint.mdAndDown ? '' : 'text-right'">
        <span class="mr-3">
          <v-icon disabled>
          mdi-web
        </v-icon>
        {{ $t('_settings.htmlContent') }}
        </span>
        <span>
          <v-icon disabled>
          mdi-link
        </v-icon>
        {{ $t('_settings.externalLink') }}
        </span>
      </v-col>
    </v-row>
    <!-- CMS Page Component-->
    <v-divider class="mt-3"/>
    <SettingTitle docPath="/guide/navigation">
      {{ $t('_navigation.cmsPageTitle') }}
    </SettingTitle>
    <v-btn outlined color="success" @click="$refs.cmsAddDialog.show()">
      <v-icon left>mdi-plus</v-icon>
      <span>{{ $t('_settings.addCmsPage') }}</span>
    </v-btn>
    <v-list>
      <v-list-item v-for="page in cmsPages" :key="page.id">
        <v-row>
          <v-col>{{ page.title }}</v-col>
          <v-col class="text-right">
            <v-btn outlined color="primary" small
                   @click="$refs.cmsEditDialog.show(page)" class="mr-1">
              <v-icon>
                mdi-pencil
              </v-icon>
            </v-btn>
            <v-btn outlined color="error" small @click="$refs.cmsDeleteDialog.show(page)">
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import draggable from 'vuedraggable';
import DialogForm from '@/components/DialogForm.vue';
import NavlinkAddForm from '@/forms/NavlinkAddForm';
import CmsPageAddForm from '@/forms/CmsPageAddForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import Editor from '@/components/Editor.vue';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Navigation',
  components: {
    DeleteConfirmationDialog,
    SettingTitle,
    DialogForm,
    draggable,
    Editor,
  },
  data() {
    return {
      navlinkAddSchema: NavlinkAddForm,
      cmsPageAddSchema: CmsPageAddForm,
      htmlInput: '',
      rawHtmlInput: '',
      updateLinkEnabled: false,
      expansionPanels: null,
      links: null,
      cmsPages: null,
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
    this.getCmsPages();
  },
  methods: {
    async getNavItems() {
      (await openapi).navigation_getNavigationLinks().then((rsp) => {
        this.updateLinkEnabled = false;
        this.links = rsp.data;
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    async getCmsPages() {
      (await openapi).general_getCmsPages().then((rsp) => {
        this.cmsPages = rsp.data;
      });
    },
    openDeleteConfirmationDialog(link) {
      this.$refs.deleteConfirmationDialog.show(link);
    },
    async openNavEditDialog(item) {
      this.rawHtmlInput = '';
      this.htmlInput = '';
      this.isExternalLink = item.linkType === 'link';
      this.$refs.navEditDialog.show(item);
      this.$refs.navEditDialog.setData(item);
    },
    async addLink() {
      const data = this.$refs.navAddDialog.getData();
      // handle html content
      if (data.linkType === 'html') {
        // set link
        // data.link = `/cms/${data.title.toLowerCase()}`;
      }
      (await openapi).navigation_createNavigationLink(null, data).then(() => {
        this.$refs.navAddDialog.closeAndReset();
        this.getNavItems();
        EventBus.emit('navUpdated');
        this.$notify({
          title: this.$t('_navigation.messages.addedLink'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.navAddDialog.setError(err);
      });
    },
    async createCmsPage() {
      const data = this.$refs.cmsAddDialog.getData();
      if (this.htmlInput && this.rawHtmlInput) {
        this.$refs.cmsAddDialog.setErrorMessage(this.$t('_navigation.bothHtmlInputsUsed'));
      }
      if (this.htmlInput !== null && this.htmlInput.length !== 0) data.content = this.htmlInput;
      if (this.rawHtmlInput !== null && this.rawHtmlInput.length !== 0) {
        data.content = this.rawHtmlInput;
      }
      (await openapi).general_createCmsHtml(null, data).then(() => {
        this.$refs.cmsAddDialog.closeAndReset();
        this.getCmsPages();
        this.$notify({
          title: this.$t('_navigation.messages.cmdAdded'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.cmsAddDialog.setError(err);
      });
    },
    async deleteCmsPage(page) {
      await (await openapi).general_deleteCmsHtml(page.id).then(() => {
        this.$refs.cmsDeleteDialog.closeAndReset();
        this.$notify({
          title: this.$t('_navigation.messages.cmsDeleted'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.cmsDeleteDialog.setError(err);
      });
    },
    async editCmsPage(data) {
      // check for html content and return if both are not null
      if (this.htmlInput && this.rawHtmlInput && !this.isExternalLink) {
        this.$refs.navEditDialog.setErrorMessage(this.$t('_navigation.bothHtmlInputsUsed'));
      }
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
        this.$refs.deleteNavConfirmationDialog.setErrorMessage(this.$t('_navigation.deleteDefaultLink'));
        return;
      }
      (await openapi).navigation_deleteNavigationLink(nav.id).then(() => {
        this.$refs.deleteNavConfirmationDialog.closeAndReset();
        this.$notify({
          title: this.$t('_navigation.messages.removedLink'),
          type: 'success',
        });
        this.getNavItems();
      }).catch((err) => {
        this.$refs.deleteNavConfirmationDialog.setError(err);
      });
    },
    async editNavItem(nav) {
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
