<template>
  <div>
    <SettingTitle docPath="/guide/navigation">
      {{ $t('_navigation.title') }}
    </SettingTitle>
    <dialog-form ref="cmsAddDialog" :form-schema="cmsPageAddSchema"
                 icon="mdi-content-save" :max-width="1000"
                 :title="$t('_navigation.addCmsPage')"
                 @submit="createCmsPage">
      <template v-slot:title-after>
        <v-alert
          type="warning" outlined dense>
          {{ $t('_navigation.contentSanitizationWarning') }}
        </v-alert>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-badge :value="htmlInput" inline dot class="float-left">
                  {{ $t('_navigation.editor') }}
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
                  {{ $t('_navigation.rawHtml') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea :placeholder="$t('_navigation.rawHtml')" v-model="rawHtmlInput"/>
              <input type="file" :accept="acceptedFileTypes.join(',')" @change="readFile"
                     style="display: none" ref="fileInput">
              <v-btn color="secondary" @click="$refs.fileInput.click()" small>
                {{ $t('_navigation.uploadFile') }}
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </dialog-form>
    <dialog-form ref="cmsEditDialog" :form-schema="cmsPageAddSchema"
                 icon="mdi-content-save-cog"
                 :title="$t('_navigation.editCmsPage')"
                 @submit="editCmsPage">

      <template slot="title-after">
        <v-alert
          type="warning" outlined
          dense
        >{{ $t('_navigation.contentSanitizationWarning') }}
        </v-alert>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-header>
              <v-row>
                <v-badge :value="htmlInput" inline dot class="float-left">
                  {{ $t('_navigation.editor') }}
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
                  {{ $t('_navigation.rawHtml') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-textarea :placeholder="$t('_navigation.rawHtml')" v-model="rawHtmlInput"/>
              <input type="file" :accept="acceptedFileTypes.join(',')" @change="readFile"
                     style="display: none" ref="fileInput">
              <v-btn color="secondary" @click="$refs.fileInput.click()" small>
                {{ $t('_navigation.uploadFile') }}
              </v-btn>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </dialog-form>
    <delete-confirmation-dialog ref="cmsDeleteDialog" @submit="deleteCmsPage"/>
    <dialog-form ref="navAddDialog" :form-schema="navlinkAddSchema"
                 icon="mdi-navigation-outline"
                 :title="$t('_navigation.addNavLink')"
                 @submit="addLink"/>
    <dialog-form ref="navEditDialog" :form-schema="navlinkAddSchema"
                 icon="mdi-navigation-outline"
                 :title="$t('_navigation.editNavLink')"
                 @submit="editNavLink"/>
    <delete-confirmation-dialog ref="deleteNavConfirmationDialog" @submit="deleteNav"/>
    <!-- real Component -->
    <v-select outlined hide-details dense
              :menu-props="{ bot: true, offsetY: true, transition: 'slide-y-transition' }"
              :label="$t('_navigation.location')"
              clearable class="mt-3"
              v-model="currentLocation" @change="categoryUpdated"
              :items="navigationLocations" item-value="value" item-text="title">
    </v-select>
    <v-list>
      <draggable
        :list="linksByLocation"
        @change="updateLinkEnabled = true">
        <div
          v-for="link in linksByLocation"
          :key="link.id">
          <!-- Sublinks -->
          <v-list-group v-if="link.sublinks.length !== 0" :append-icon="null">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  <v-row>
                    <v-col cols="1">
                      <v-icon>mdi-chevron-down</v-icon>
                    </v-col>
                    <v-col cols="6" sm="5">
                      <span>{{ link.title }}</span>
                    </v-col>
                    <v-col cols="5" sm="3">
                      <v-chip color="error" v-if="link.req_prop">
                        <v-icon left>mdi-security</v-icon>
                        {{ link.req_prop }}
                      </v-chip>
                    </v-col>
                    <v-col class="text-right"  cols="12" sm="3">
                      <v-btn outlined color="primary" small
                             @click="openNavEditDialog(link)" class="mr-1">
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn :disabled="link.linkType==='default'"
                             outlined color="error" small
                             @click="$refs.deleteNavConfirmationDialog.show(link)">
                        <v-icon>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <draggable :list="link.sublinks"
                       @change="updateLinkEnabled = true">
              <div v-for="sublink in link.sublinks" :key="sublink.id">
                <v-list-item :class="{ 'py-2': $vuetify.breakpoint.xs }">
                  <v-row :class="!link.enabled ? 'text--disabled' : ''">
                    <v-col cols="6" sm="3" md="3" class="d-flex align-center">
                      <v-icon left v-if="link.icon">
                        {{ link.icon }}
                      </v-icon>
                      <v-icon left v-else>
                        mdi-dots-square
                      </v-icon>
                      {{ link.title }}
                    </v-col>
                    <v-col cols="5" sm="3">
                      {{ sublink.link }}
                    </v-col>
                    <v-col cols="6" sm="3">
                      <v-chip color="error" v-if="sublink.req_prop">
                        <v-icon left>mdi-security</v-icon>
                        {{ sublink.req_prop }}
                      </v-chip>
                    </v-col>
                    <v-col class="text-right" cols="6" sm="3">
                      <v-icon v-if="!sublink.enabled" class="mr-1">
                        mdi-ghost
                      </v-icon>
                      <v-icon v-if="sublink.cms_page_id" class="mr-1">
                        mdi-web
                      </v-icon>
                      <v-icon v-else class="mr-1">
                        mdi-link
                      </v-icon>
                      <v-btn outlined color="primary" small
                             @click="openNavEditDialog(sublink)" class="mr-1">
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn :disabled="link.default"
                             outlined color="error" small
                             @click="$refs.deleteNavConfirmationDialog.show(sublink)">
                        <v-icon>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider v-if="$vuetify.breakpoint.xs"/>
              </div>
            </draggable>
          </v-list-group>
          <!-- Links without sublink -->
          <v-list-item v-else :class="{ 'py-2': $vuetify.breakpoint.xs }">
            <v-row :class="!link.enabled ? 'text--disabled' : ''">
              <v-col cols="6" sm="3" md="3" class="d-flex align-center">
                <v-icon left v-if="link.icon">
                  {{ link.icon }}
                </v-icon>
                <v-icon left v-else>
                  mdi-dots-square
                </v-icon>
                {{ link.title }}
              </v-col>
              <v-col cols="5" sm="3" class="align-self-center">
                {{ link.link }}
              </v-col>
              <v-col cols="6" sm="3">
                <v-chip color="error" v-if="link.req_prop">
                  <v-icon left>mdi-security</v-icon>
                  {{ link.req_prop }}
                </v-chip>
              </v-col>
              <v-col class="text-right align-self-center"  cols="6" sm="3">
                <v-icon v-if="!link.enabled" class="mr-1">
                  mdi-ghost
                </v-icon>
                <v-icon v-if="link.cms_page_id" class="mr-1">
                  mdi-web
                </v-icon>
                <v-icon v-else class="mr-1">
                  mdi-link
                </v-icon>
                <v-btn outlined color="primary" small
                       @click="openNavEditDialog(link)" class="">
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn :disabled="link.default" class="ml-1"
                       outlined color="error" small
                       @click="$refs.deleteNavConfirmationDialog.show(link)">
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider v-if="$vuetify.breakpoint.xs"/>
        </div>
      </draggable>
    </v-list>
    <v-row>
      <v-col cols="12" md="6">
        <v-btn outlined color="success" @click="openNavAddDialog">
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_navigation.addNavLink') }}</span>
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
            {{ $t('_navigation.navUpdate') }}
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
            {{ $t('_navigation.navReset') }}
          </span>
        </v-tooltip>
      </v-col>
      <v-col class="text--disabled mr-5" :class="$vuetify.breakpoint.mdAndDown ? '' : 'text-right'">
        <span class="mr-3">
          <v-icon disabled>
          mdi-web
        </v-icon>
        {{ $t('_navigation.htmlContent') }}
        </span>
        <span>
          <v-icon disabled>
          mdi-link
        </v-icon>
        {{ $t('_navigation.link') }}
        </span>
      </v-col>
    </v-row>
    <!-- CMS Page Component-->
    <div v-if="this.$store.state.generalConfig.show_advanced_settings">
      <SettingTitle docPath="/guide/navigation" class="mt-10">
        {{ $t('_navigation.cmsPageTitle') }}
      </SettingTitle>
      <v-list>
        <v-list-item v-for="page in cmsPages" :key="page.id">
          <v-row>
            <v-col>{{ page.title }}</v-col>
            <v-col class="text-right">
              <v-btn outlined color="primary" small
                     @click="openCmsEditDialog(page)" class="mr-1">
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
      <v-btn outlined color="success" @click="$refs.cmsAddDialog.show()">
        <v-icon left>mdi-plus</v-icon>
        <span>{{ $t('_navigation.addCmsPage') }}</span>
      </v-btn>
    </div>
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
import i18n from '../../plugins/i18n';

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
      navlinkAddSchema: null,
      cmsPageAddSchema: CmsPageAddForm,
      htmlInput: '',
      rawHtmlInput: '',
      updateLinkEnabled: false,
      expansionPanels: null,
      links: null,
      cmsPages: null,
      currentLocation: 'HEADER',
      acceptedFileTypes: ['.txt', '.html', '.htm'],
      linksByLocation: [],
      navigationLocations: [
        {
          value: 'HEADER',
          title: i18n.t('_navigation._location.header'),
        },
        {
          value: 'FOOTER',
          title: i18n.t('_navigation._location.footer'),
        },
        {
          value: 'HELP',
          title: i18n.t('_navigation._location.help'),
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
    this.getCmsPages();
  },
  methods: {
    async getNavItems() {
      (await openapi).navigation_getNavigationLinks().then((rsp) => {
        this.updateLinkEnabled = false;
        this.links = rsp.data;
        this.linksByLocation = this.links.filter((l) => l.location === this.currentLocation);
      }).catch((err) => console.log(`Could not query nav ${err}`));
    },
    async getCmsPages() {
      (await openapi).general_getCmsPages().then((rsp) => {
        this.cmsPages = rsp.data;
      });
    },
    async addLink() {
      const data = this.$refs.navAddDialog.getData();
      if (data.linkType === 'html') {
        data.link = `/cms/${data.title.toLowerCase()}`;
      }
      (await openapi).navigation_createNavigationLink(null, data).then(() => {
        this.$refs.navAddDialog.closeAndReset();
        this.getNavItems();
        EventBus.emit('navUpdated');
        this.$notify({
          title: this.$t('_messages.addSuccess'),
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
        return;
      }
      if (this.htmlInput !== null && this.htmlInput.length !== 0) data.content = this.htmlInput;
      if (this.rawHtmlInput !== null && this.rawHtmlInput.length !== 0) {
        data.content = this.rawHtmlInput;
      }
      (await openapi).general_createCmsHtml(null, data).then(() => {
        this.$refs.cmsAddDialog.closeAndReset();
        this.htmlInput = null;
        this.rawHtmlInput = null;
        this.getCmsPages();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.cmsAddDialog.setError(err);
      });
    },
    async deleteCmsPage(page) {
      await (await openapi).general_deleteCmsHtml(page.id).then(() => {
        this.getCmsPages();
        this.$refs.cmsDeleteDialog.closeAndReset();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.cmsDeleteDialog.setError(err);
      });
    },
    async editCmsPage(page) {
      const data = this.$refs.cmsEditDialog.getData();
      if (this.htmlInput && this.rawHtmlInput) {
        this.$refs.cmsEditDialog.setErrorMessage(this.$t('_navigation.bothHtmlInputsUsed'));
        return;
      }
      if (this.htmlInput !== null && this.htmlInput.length !== 0) data.content = this.htmlInput;
      if (this.rawHtmlInput !== null && this.rawHtmlInput.length !== 0) {
        data.content = this.rawHtmlInput;
      }
      if (!data.requirement_set_id) data.requirement_set_id = null;
      (await openapi).general_editCmsHtml(page.id, data).then(() => {
        this.$refs.cmsEditDialog.closeAndReset();
        this.htmlInput = null;
        this.rawHtmlInput = null;
        this.getCmsPages();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.cmsEditDialog.setError(err);
      });
    },
    async updateLinkOrder() {
      const array = [];
      this.linksByLocation.forEach((l) => {
        array.push(l.id);
        if (l.sublinks.length !== 0) {
          l.sublinks.forEach((sl) => {
            array.push(sl.id);
          });
        }
      });
      (await openapi).navigation_updateOrder(null, array).then(() => {
        this.updateLinkEnabled = false;
        this.getNavItems();
        EventBus.emit('navUpdated'); // Event caught in Header to Update Navlinks
        this.$notify({
          title: this.$t('_messages.updateOrderSuccess'),
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
        EventBus.emit('navUpdated');
        this.$notify({
          title: this.$t('_messages.removeSuccess'),
          type: 'success',
        });
        this.getNavItems();
      }).catch((err) => {
        this.$refs.deleteNavConfirmationDialog.setError(err);
      });
    },
    async editNavLink(nav) {
      const data = this.$refs.navEditDialog.getData();
      if (data.linkType === 'html') {
        data.link = `/cms/${data.title.toLowerCase()}`;
      }
      if (data.linkType === 'link') {
        data.cms_page_id = null;
      }
      if (!data.parent_navigation_link_id && !data.header) data.parent_navigation_link_id = null;
      (await openapi).navigation_editNavigationLink(nav.id, data).then(() => {
        this.$refs.navEditDialog.closeAndReset();
        EventBus.emit('navUpdated');
        this.getNavItems();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.navEditDialog.setError(err);
      });
    },
    async openCmsEditDialog(page) {
      (await openapi).general_getCmsHtml(page.id).then((rsp) => {
        this.htmlInput = rsp.data.content;
        this.rawHtmlInput = rsp.data.content;
      });
      this.$refs.cmsEditDialog.show(page);
      this.$refs.cmsEditDialog.setData(page);
    },
    async openNavEditDialog(item) {
      const data = item;
      if (item.default === true) {
        this.navlinkAddSchema = NavlinkAddForm.returnForm(this.transformLinkObject(), true);
      } else this.navlinkAddSchema = NavlinkAddForm.returnForm(this.transformLinkObject());
      if (item.cms_page_id) { data.linkType = 'html'; }
      if (!item.cms_page_id) { data.linkType = 'link'; }
      if (item.parent_navigation_link_id) { data.subLink = true; }
      this.$refs.navEditDialog.show(data);
      this.$nextTick(() => {
        this.$refs.navEditDialog.setData(data);
      });
    },
    async openNavAddDialog() {
      this.navlinkAddSchema = NavlinkAddForm.returnForm(this.transformLinkObject());
      this.rawHtmlInput = '';
      this.htmlInput = '';
      this.$refs.navAddDialog.show();
    },
    transformLinkObject() {
      const array = [];
      this.links.filter((l) => l.parent_navigation_link_id === null).forEach((l) => {
        array.push({ const: l.id, title: l.title });
      });
      return array;
    },
    categoryUpdated() {
      this.linksByLocation = this.links.filter((l) => l.location === this.currentLocation);
    },
    readFile(event) {
      const file = event.target.files[0];
      const fileName = file.name;
      const fileExtension = fileName.substr(fileName.lastIndexOf('.')).toLowerCase();

      if (!this.acceptedFileTypes.includes(fileExtension)) {
        this.$notify({
          title: this.$t('_navigation.messages.invalidFileType'),
          type: 'error',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        this.rawHtmlInput = e.target.result;
      };
      reader.readAsText(file);
    },
  },
};
</script>

<style scoped>

</style>
