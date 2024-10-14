<template>
  <div>
    <SettingTitle doc-path="/guide/navigation">
      {{ $t('_navigation.title') }}
    </SettingTitle>
    <dialog-form
      ref="cmsAddDialog"
      :form-schema="cmsPageAddSchema"
      icon="mdi-content-save"
      :max-width="1000"
      :title="$t('_navigation.addCmsPage')"
      @submit="createCmsPage"
    >
      <template #title-after>
        <v-alert
          type="warning"
          variant="outlined"
          density="compact"
        >
          {{ $t('_navigation.contentSanitizationWarning') }}
        </v-alert>
        <v-expansion-panels flat>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-row>
                <v-badge
                  :model-value="htmlInput"
                  inline
                  dot
                  class="float-left"
                >
                  {{ $t('_navigation.editor') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <editor v-model="htmlInput" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-row>
                <v-badge
                  :model-value="rawHtmlInput"
                  inline
                  dot
                  class="float-left"
                >
                  {{ $t('rawHtml') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-textarea
                v-model="rawHtmlInput"
                :placeholder="$t('rawHtml')"
              />
              <input
                ref="fileInput"
                type="file"
                :accept="acceptedFileTypes.join(',')"
                style="display: none"
                @change="readFile"
              >
              <v-btn
                color="secondary"
                size="small"
                @click="$refs.fileInput.click()"
              >
                {{ $t('_navigation.uploadFile') }}
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </dialog-form>
    <dialog-form
      ref="cmsEditDialog"
      :form-schema="cmsPageAddSchema"
      icon="mdi-content-save-cog"
      :title="$t('_navigation.editCmsPage')"
      @submit="editCmsPage"
    >
      <template #title-after>
        <v-alert
          type="warning"
          variant="outlined"
          density="compact"
        >
          {{ $t('_navigation.contentSanitizationWarning') }}
        </v-alert>
        {{ htmlContentExpansionPanel }}
        <v-expansion-panels
          v-model="htmlContentExpansionPanel"
          flat
        >
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-row>
                <v-badge
                  :model-value="htmlInput"
                  inline
                  dot
                  class="float-left"
                >
                  {{ $t('_navigation.editor') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <editor v-model="htmlInput" />
            </v-expansion-panel-text>
          </v-expansion-panel>
          <v-expansion-panel>
            <v-expansion-panel-title>
              <v-row>
                <v-badge
                  :model-value="rawHtmlInput"
                  inline
                  dot
                  class="float-left"
                >
                  {{ $t('rawHtml') }}
                </v-badge>
              </v-row>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-textarea
                v-model="rawHtmlInput"
                :placeholder="$t('rawHtml')"
              />
              <input
                ref="fileInput"
                type="file"
                :accept="acceptedFileTypes.join(',')"
                style="display: none"
                @change="readFile"
              >
              <v-btn
                color="secondary"
                size="small"
                @click="$refs.fileInput.click()"
              >
                {{ $t('_navigation.uploadFile') }}
              </v-btn>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </template>
    </dialog-form>
    <delete-confirmation-dialog
      ref="cmsDeleteDialog"
      @submit="deleteCmsPage"
    />
    <dialog-form
      ref="navAddDialog"
      :form-schema="navlinkAddSchema"
      icon="mdi-navigation-outline"
      :title="$t('_navigation.addNavLink')"
      @submit="addLink"
    />
    <dialog-form
      ref="navEditDialog"
      :form-schema="navlinkAddSchema"
      icon="mdi-navigation-outline"
      :title="$t('_navigation.editNavLink')"
      @submit="editNavLink"
    />
    <delete-confirmation-dialog
      ref="deleteNavConfirmationDialog"
      @submit="deleteNav"
    />
    <!-- real Component -->
    <v-select
      v-model="currentLocation"
      variant="outlined"
      hide-details
      density="compact"
      :label="$t('_navigation.location')"
      class="mt-3"
      :items="navigationLocations"
      item-value="value"
      item-title="title"
      @update:model-value="categoryUpdated"
    />
    <v-list>
      <VueDraggable
        v-model="linksByLocation"
        @dragend="updateLinkOrder"
      >
        <div
          v-for="link in linksByLocation"
          :key="link.id"
        >
          <!-- Sublinks -->
          <v-list-group
            v-if="link.sublinks.length !== 0"
            class="subgroup"
            :prepend-icon="subGroup ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          >
            <template #activator="{ props }">
              <v-list-item
                v-bind="props"
                @click="subGroup = !subGroup"
              >
                <v-row align="center">
                  <v-col
                    cols="7"
                    sm="6"
                  >
                    <span>{{ link.title }}</span>
                  </v-col>
                  <v-col
                    cols="5"
                    sm="3"
                  >
                    <v-chip
                      v-if="link.req_prop"
                      color="error"
                    >
                      <v-icon start>
                        mdi-security
                      </v-icon>
                      {{ link.req_prop }}
                    </v-chip>
                  </v-col>
                  <v-col
                    class="text-right"
                    cols="12"
                    sm="3"
                  >
                    <v-btn
                      variant="outlined"
                      color="primary"
                      size="small"
                      class="mr-1"
                      @click.stop="openNavEditDialog(link)"
                    >
                      <v-icon>
                        mdi-pencil
                      </v-icon>
                    </v-btn>
                    <v-btn
                      :disabled="link.linkType==='default'"
                      variant="outlined"
                      color="error"
                      size="small"
                      @click.stop="$refs.deleteNavConfirmationDialog.show(link)"
                    >
                      <v-icon>
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-list-item>
            </template>
            <VueDraggable
              :list="link.sublinks"
              @change="updateLinkEnabled = true"
            >
              <div
                v-for="sublink in link.sublinks"
                :key="sublink.id"
              >
                <v-list-item :class="{ 'py-2': $vuetify.display.xs }">
                  <v-row :class="!link.enabled ? 'text-disabled' : ''">
                    <v-col
                      cols="6"
                      sm="3"
                      md="3"
                      class="d-flex align-center"
                    >
                      <v-icon
                        v-if="link.icon"
                        start
                      >
                        {{ sublink.icon }}
                      </v-icon>
                      <v-icon
                        v-else
                        start
                      >
                        mdi-dots-square
                      </v-icon>
                      {{ sublink.title }}
                    </v-col>
                    <v-col
                      cols="5"
                      sm="3"
                    >
                      {{ sublink.link }}
                    </v-col>
                    <v-col
                      cols="6"
                      sm="3"
                    >
                      <v-chip
                        v-if="sublink.req_prop"
                        color="error"
                      >
                        <v-icon start>
                          mdi-security
                        </v-icon>
                        {{ sublink.req_prop }}
                      </v-chip>
                    </v-col>
                    <v-col
                      class="text-right"
                      cols="6"
                      sm="3"
                    >
                      <v-icon
                        v-if="!sublink.enabled"
                        class="mr-1"
                      >
                        mdi-ghost
                      </v-icon>
                      <v-icon
                        v-if="sublink.cms_page_id"
                        class="mr-1"
                      >
                        mdi-web
                      </v-icon>
                      <v-icon
                        v-else
                        class="mr-1"
                      >
                        mdi-link
                      </v-icon>
                      <v-btn
                        variant="outlined"
                        color="primary"
                        size="small"
                        class="mr-1"
                        @click="openNavEditDialog(sublink)"
                      >
                        <v-icon>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn
                        :disabled="link.default"
                        variant="outlined"
                        color="error"
                        size="small"
                        @click="$refs.deleteNavConfirmationDialog.show(sublink)"
                      >
                        <v-icon>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-divider v-if="$vuetify.display.xs" />
              </div>
            </VueDraggable>
          </v-list-group>
          <!-- Links without sublink -->
          <v-list-item
            v-else
            :class="{ 'py-2': $vuetify.display.xs }"
          >
            <v-row :class="!link.enabled ? 'text-disabled' : ''">
              <v-col
                cols="6"
                sm="3"
                md="3"
                class="d-flex align-center"
              >
                <v-icon
                  v-if="link.icon"
                  start
                >
                  {{ link.icon }}
                </v-icon>
                <v-icon
                  v-else
                  start
                >
                  mdi-dots-square
                </v-icon>
                {{ link.title }}
              </v-col>
              <v-col
                cols="5"
                sm="3"
                class="align-self-center"
              >
                {{ link.link }}
              </v-col>
              <v-col
                cols="6"
                sm="3"
              >
                <v-chip
                  v-if="link.req_prop"
                  color="error"
                >
                  <v-icon start>
                    mdi-security
                  </v-icon>
                  {{ link.req_prop }}
                </v-chip>
              </v-col>
              <v-col
                class="text-right align-self-center"
                cols="6"
                sm="3"
              >
                <v-icon class="mr-1">
                  mdi-drag-horizontal-variant
                </v-icon>
                <v-icon
                  v-if="!link.enabled"
                  class="mr-1"
                >
                  mdi-ghost
                </v-icon>
                <v-icon
                  v-if="link.cms_page_id"
                  class="mr-1"
                >
                  mdi-web
                </v-icon>
                <v-icon
                  v-else
                  class="mr-1"
                >
                  mdi-link
                </v-icon>
                <v-btn
                  variant="outlined"
                  color="primary"
                  size="small"
                  class=""
                  @click="openNavEditDialog(link)"
                >
                  <v-icon>
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-btn
                  :disabled="link.default"
                  class="ml-1"
                  variant="outlined"
                  color="error"
                  size="small"
                  @click="$refs.deleteNavConfirmationDialog.show(link)"
                >
                  <v-icon>
                    mdi-delete
                  </v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-list-item>
          <v-divider v-if="$vuetify.display.xs" />
        </div>
      </VueDraggable>
    </v-list>
    <v-row>
      <v-col
        cols="12"
        md="6"
      >
        <v-btn
          variant="outlined"
          color="success"
          @click="openNavAddDialog"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          <span>{{ $t('_navigation.addNavLink') }}</span>
        </v-btn>
      </v-col>
      <v-col
        class="text-disabled mr-5"
        :class="$vuetify.display.mdAndDown ? '' : 'text-right'"
      >
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
    <div v-if="$store.state.generalConfig.show_advanced_settings">
      <SettingTitle
        doc-path="/guide/navigation"
        class="mt-10"
      >
        {{ $t('_navigation.cmsPageTitle') }}
      </SettingTitle>
      <v-list>
        <v-list-item
          v-for="page in cmsPages"
          :key="page.id"
        >
          <v-row>
            <v-col>{{ page.title }}</v-col>
            <v-col class="text-right">
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
                class="mr-1"
                @click="openCmsEditDialog(page)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                variant="outlined"
                color="error"
                size="small"
                @click="$refs.cmsDeleteDialog.show(page)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-btn
        variant="outlined"
        color="success"
        @click="$refs.cmsAddDialog.show()"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        <span>{{ $t('_navigation.addCmsPage') }}</span>
      </v-btn>
    </div>
  </div>
</template>

<script>
import NavlinkAddForm from '@/forms/NavlinkAddForm';
import CmsPageAddForm from '@/forms/CmsPageAddForm';
import openapi from '@/api/openapi';
import EventBus from '@/services/EventBus';
import i18n from '../../plugins/i18n';
import { VueDraggable } from "vue-draggable-plus";

export default {
  components: {VueDraggable},
  data() {
    return {
      subGroup: false,
      navlinkAddSchema: null,
      cmsPageAddSchema: CmsPageAddForm,
      htmlInput: '',
      rawHtmlInput: '',
      expansionPanels: null,
      htmlContentExpansionPanel: null,
      links: null,
      cmsPages: null,
      currentLocation: 'HEADER',
      acceptedFileTypes: ['.txt', '.html', '.htm'],
      linksByLocation: [],
      navigationLocations: [
        {
          value: 'HEADER',
          title: i18n.global.t('_navigation._location.header'),
        },
        {
          value: 'FOOTER',
          title: i18n.global.t('_navigation._location.footer'),
        },
        {
          value: 'HELP',
          title: i18n.global.t('_navigation._location.help'),
        },
      ],
    };
  },
  watch: {
    rawHtmlInput(newInput, oldInput) {
      if (oldInput && newInput) {
        this.htmlInput = null;
      }
    },
    htmlInput(newInput, oldInput) {
      if (oldInput && newInput) {
        this.rawHtmlInput = null;
      }
    },
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
.subgroup :deep(.v-list-item__append) {
  display: none !important
}
</style>
