<template>
  <div>
    <!-- Top Menu -->
    <div
      v-if="$checkProp('theme_edit')"
      style="position: fixed; z-index: 5; margin-top: 70px;"
      class="d-flex"
    >
      <v-card
        tile
        style="background-color: #646464A3;"
        class="pa-1 mt-1"
      >
        <v-icon
          size="large"
          @click="editDrawer = !editDrawer"
        >
          mdi-cog
        </v-icon>
      </v-card>
    </div>
    <!-- Rendering of Components -->
    <BuilderWrapper
      v-for="block in blocksToShow"
      :key="block.id"
      :no_wrap="block.no_wrap"
      :title="block.props_data ? block.props_data.title : null"
      :height="block.props_data ? block.props_data.height : null"
      :subtitle="block.props_data ? block.props_data.subtitle : null"
      :background-color="block.props_data ? block.props_data.backgroundColor : null"
      :image-url="block.props_data ? block.props_data.imageUrl : null"
      :white-text="block.props_data ? block.props_data.whiteText : null"
      :margin-top="block.props_data ? block.props_data.marginTop : 0"
      :no-title-in-wrapper="block.type === 'NewsPreview'"
    >
      <component
        :is="`Builder${block.type}`"
        v-bind="block.props_data"
      >
        {{ block.slot }}
      </component>
    </BuilderWrapper>
    <v-fade-transition>
      <v-card
        v-if="blocksToShow == null"
        width="100vw"
        height="calc(100vh - 108px)"
        flat
        tile
      >
        <div style="position: absolute; left: 50%; top: 50%">
          <v-progress-circular
            indeterminate
            size="50"
          />
        </div>
      </v-card>
    </v-fade-transition>
    <!-- Side Menu -->
    <v-navigation-drawer
      v-if="$checkProp('theme_edit')"
      v-model="editDrawer"
      style="z-index: 201"
      :location="drawerRight ? 'right' : undefined"
      :permanent="newComponentDialog"
      app
      location="bottom"
      width="400px"
      temporary
    >
      <v-list-item
        class="elevation-3"
        density="compact"
      >
        <v-list-item-title class="d-flex align-center">
          {{ $t('_component.components') }}
          <v-spacer />
          <v-icon
            start
            @click="drawerRight = !drawerRight"
          >
            {{ drawerRight ? 'mdi-border-left-variant' : 'mdi-border-right-variant' }}
          </v-icon>
          <v-icon
            ref="closeDrawerIcon"
            class="animate__animated animate__faster"
            @click="closeDrawer();"
          >
            mdi-close
          </v-icon>
        </v-list-item-title>
      </v-list-item>
      <v-divider />
      <div style="max-height: 75vh; overflow-y: auto">
        <v-expansion-panels
          v-model="panelExposed"
          variant="accordion"
          flat
          tile
        >
          <VueDraggable
            v-model="blocks"
            style="width: 100%;
         border-style: none"
            :disabled="panelExposed != null"
            @dragend="orderUpdated = true"
          >
            <v-expansion-panel
              v-for="(component, index) in blocks"
              :key="index"
            >
              <v-expansion-panel-title class="py-0 my-0">
                <div :class="{ 'text-decoration-line-through' : component.deleted }">
                  {{ getComponentTitle(component) }}
                </div>
                <v-spacer />
                <div class="text-right">
                  <v-fade-transition>
                    <v-icon
                      v-show="panelExposed == null"
                      size="small"
                    >
                      mdi-drag-variant
                    </v-icon>
                  </v-fade-transition>
                  <v-icon
                    size="small"
                    class="ml-1"
                    olor="secondary"
                    @click.stop="copyBlock(component)"
                  >
                    mdi-content-copy
                  </v-icon>
                  <v-icon
                    :color="component.deleted ? '' : 'error'"
                    @click.stop="toggleDeleteBlock(component)"
                  >
                    mdi-delete
                  </v-icon>
                </div>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <v-form
                  ref="form"
                  @submit.prevent=""
                >
                  <v-jsf
                    v-model="component.props_data"
                    :options="vjsfOptions"
                    style="z-index: 202"
                    :schema="getComponentSchema(component)"
                    @input="component.edited = true; componentEdited=true"
                  />
                </v-form>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </VueDraggable>
        </v-expansion-panels>
      </div>
      <v-list-item>
        <v-btn
          variant="outlined"
          @click="$refs.addComponentDialog.show();newComponentDialog = true;"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          {{ $t('_component.addComponent') }}
        </v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn
          size="small"
          variant="text"
          @click="fetchData"
        >
          <v-icon>mdi-restore</v-icon>
        </v-btn>
        <v-btn
          variant="flat"
          class="ml-3 grow"
          color="success"
          :disabled="!saveButton"
          @click="savePage"
        >
          Save
        </v-btn>
      </v-list-item>
    </v-navigation-drawer>
    <Dialog
      ref="addComponentDialog"
      :title="$t('_component.addComponent')"
      icon="mdi-image-plus"
      :max-width="1000"
      @close="newComponentDialog = false"
    >
      <div style="height: 80vh">
        <v-text-field
          v-model="addComponentSearch"
          variant="outlined"
          hide-details="auto"
          density="compact"
          class="mt-3"
          append-icon="mdi-magnify"
          :label="$t('search')"
        />
        <transition-group
          tag="div"
          class="mt-3 row"
          name="list-complete"
        >
          <v-col
            v-for="cp in availableComponentsSearch"
            :key="cp.component"
            cols="6"
            md="4"
            lg="4"
            class="list-complete-item"
          >
            <v-card
              style="height: 100%"
              class="d-flex flex-column flex-grow-1"
              hover
              @click="addComponent(cp)"
            >
              <v-img
                style="background-color: #e0e0e0"
                :src="cp.previewImage"
                height="100px"
              />
              <v-spacer />
              <div class="text-center text-h5">
                {{ cp.title }}
              </div>
              <v-spacer />
            </v-card>
          </v-col>
          <v-col
            v-if="availableComponentsSearch.length === 0"
            :key="1"
          >
            {{ $t('noDataAvailable') }}
          </v-col>
        </transition-group>
      </div>
    </Dialog>
  </div>
</template>

<script>
import components from '@/components/BuilderComponents/components';
import VJsf from '@koumoul/vjsf';
import { v2compat } from "@koumoul/vjsf/compat/v2";
// import '@koumoul/vjsf/dist/main.css';
// import '@koumoul/vjsf/lib/deps/third-party';
import i18n from '@/plugins/i18n';
import axios from 'axios';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import {VueDraggable} from "vue-draggable-plus";


export default {
  components: {
    VJsf,VueDraggable
  },
  data() {
    return {
      editDrawer: false,
      drawerRight: false,
      orderUpdated: false,
      componentAdded: false,
      componentEdited: false,
      newComponentDialog: false,
      addComponentSearch: '',
      blocks: null,
      count: 0,
      availableComponents: components.components,
      panelExposed: null,
      vjsfOptions: {
        locale: i18n.locale, // i18n.locale,
        httpLib: axios,
        timePickerProps: {
          format: '24hr',
        },
        markdownit: {
          html: true,
        },
      },
    };
  },
  computed: {
    blocksToShow() {
      if (this.blocks == null) return null;
      return this.blocks.filter((block) => !block.deleted);
    },
    saveButton() {
      if (this.orderUpdated || this.componentAdded || this.componentEdited) return true;
      return false;
    },
    availableComponentsSearch() {
      return this.availableComponents
        .filter((cp) => cp.title.toLowerCase().includes(this.addComponentSearch.toLowerCase())
          || cp.keywords.filter((k) => k.toLowerCase()
            .includes(this.addComponentSearch.toLowerCase())).length > 0);
    },
  },
  beforeMount() {
    this.fetchData();
    this.redirectWhenDisabled();
  },
  methods: {
    async redirectWhenDisabled() {
      if (!this.$store.getters.theme) {
        (await openapiCached).general_getTheme().then((rsp) => {
          const theme = rsp.data;
          if (!theme.enable_landingpage) {
            this.$router.replace({ name: 'News' });
          }
        });
      } else if (!this.$store.getters.theme.enable_landingpage) {
        this.$router.replace({ name: 'News' });
      }
    },
    async fetchData() {
      (await openapi).design_getSections().then((rsp) => {
        this.blocks = rsp.data;
        this.orderUpdated = false;
        this.componentAdded = false;
        this.componentEdited = false;
      });
    },
    async savePage() {
      // First create, edit and delete necessary sections
      // Second update order of sections
      const api = await openapi;
      // Do some magic that the forEach function is executed first
      // Add all promises to the promises array
      const promises = [];
      this.blocks.forEach((b) => {
        if (b.new && !b.deleted) {
          const p = api.design_createSection(null, b).then((rsp) => {
            console.log('Section Created');

            b.new = false;

            b.id = rsp.data.id;
          });
          promises.push(p);
        } else if (b.edited && !b.new) {
          const p = api.design_editSection(b.id, b).then((rsp) => {
            console.log('Section Edited');
          });
          promises.push(p);
        }
        if (b.deleted && !b.new) {
          const p = api.design_deleteSection(b.id).then((rsp) => {
            console.log('Section Deleted');
          });
          promises.push(p);
        }
      });
      // Wait for all promises to resolve
      Promise.all(promises).then(() => {
        this.updateSectionOrder();
      });
    },
    async updateSectionOrder() {
      const res = [];
      this.blocks.filter((b) => !b.deleted).forEach((item) => {
        res.push(item.id);
      });
      (await openapi).design_updateOrder(null, res).then(() => {
        this.fetchData();
        this.orderUpdated = false;
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
    addComponent(cp) {
      this.blocks.push({
        type: cp.component,
        new: true,
        edited: false,
        id: this.count += 1,
        no_wrap: cp.no_wrap,
        props_data: {
          ...cp.defaults,
        },
      // slot: 'Button',
      });
      this.$refs.addComponentDialog.close();
      this.componentAdded = true;
    },
    toggleDeleteBlock(cp) {
      const index = this.blocks.indexOf(cp);
      const newBlock = { ...cp };
      newBlock.deleted = !newBlock.deleted;
      this.componentEdited = true;
      this.blocks.splice(index, 1, newBlock);
    },
    getComponentSchema(cp) {
      const el = this.availableComponents.find((c) => c.component === cp.type);
      if (!el) return {};
      const schema = { ...el.schema };
      if (!el.no_wrap) {
        schema.properties = {
          ...schema.properties,
          title: {
            type: 'string',
            title: this.$t('title'),
            'x-cols': 6,
            'x-props': {
              clearable: true,
            },
          },
          subtitle: {
            type: 'string',
            title: this.$t('subtitle'),
            'x-cols': 6,
            'x-class': 'pl-1',
          },
          height: {
            type: 'string',
            title: this.$t('_component._form.height'),
            'x-cols': 6,
          },
          marginTop: {
            type: 'string',
            title: this.$t('_component._form.marginTop'),
            'x-cols': 6,
            'x-class': 'pl-1',
          },
          whiteText: {
            type: 'boolean',
            title: this.$t('_component.whiteText'),
            'x-cols': 6,
            'x-display': 'switch',
            'x-props': {
              'hide-details': 'auto',
              clearable: true,
            },
            default: true,
            'x-class': 'mt-5',
          },
          imageUrl: {
            type: 'string',
            'x-cols': 6,
            title: this.$t('_theme.backgroundImageURL'),
            'x-props': {
              clearable: true,
            },
          },
          backgroundColor: {
            type: 'string',
            'x-cols': 6,
            title: this.$t('_theme.backgroundColor'),
            format: 'hexcolor',
          },
        };
      }
      return v2compat(schema);
    },
    closeDrawer() {
      this.$refs.closeDrawerIcon.$el.classList.add('animate__rotateOut');
      setTimeout(() => {
        this.editDrawer = false;
        this.$refs.closeDrawerIcon.$el.classList.remove('animate__rotateOut');
      }, 100);
    },
    copyBlock(block) {
      const newBlock = { ...block };
      newBlock.new = true;
      newBlock.id = Math.random(100);
      this.blocks.push(newBlock);
      this.componentAdded = true;
    },
    getComponentTitle(cp) {
      const el = this.availableComponents.find((c) => c.component === cp.type);
      if (!el) return cp.type;
      return el.title;
    },
  },
};
</script>

<style>
.grow-on-hover {
  transition: all .2s ease-in-out;
}

.grow-on-hover:hover {
  transform: scale(1.02);
}

.list-complete-item {
  transition: transform 0.5s, opacity 0.3s;
}
.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}
</style>
