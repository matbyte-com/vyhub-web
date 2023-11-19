<template>
  <div>
    <!-- Top Menu -->
    <div style="position: fixed; z-index: 5; margin-top: 70px;" class="d-flex"
         v-if="$checkProp('theme_edit')">
      <v-card tile style="background-color: #646464A3;"
           class="pa-1 mt-1">
        <v-icon large @click="editDrawer = !editDrawer">mdi-cog</v-icon>
      </v-card>
    </div>
    <!-- Rendering of Components -->
    <wrapper v-for="block in blocksToShow" :key="block.id" :no_wrap="block.no_wrap"
             :title="block.props_data ? block.props_data.title : null"
             :height="block.props_data ? block.props_data.height : null"
             :subtitle="block.props_data ? block.props_data.subtitle : null"
             :background-color="block.props_data ? block.props_data.backgroundColor : null"
             :image-url="block.props_data ? block.props_data.imageUrl : null"
             :white-text="block.props_data.whiteText ? block.props_data.whiteText : null"
             :margin-top="block.props_data.marginTop ? block.props_data.marginTop : 0"
             :no-title-in-wrapper="block.type === 'NewsPreview'">
      <component :is="block.type" v-bind="block.props_data">{{ block.slot }}</component>
    </wrapper>
    <v-fade-transition>
      <v-card v-if="blocksToShow == null" width="100vw" height="calc(100vh - 108px)" flat tile>
        <div style="position: absolute; left: 50%; top: 50%">
          <v-progress-circular indeterminate size="50" />
        </div>
      </v-card>
    </v-fade-transition>
    <!-- Side Menu -->
    <v-navigation-drawer
      style="z-index: 201"
      v-if="$checkProp('theme_edit')"
      v-model="editDrawer"
      :right="drawerRight"
      :permanent="newComponentDialog"
      app
      bottom
      width="400px"
      temporary>
      <v-list-item class="elevation-3" dense>
        <v-list-item-content>
          <v-list-item-title class="d-flex align-center">
            {{ $t('_component.components') }}
            <v-spacer/>
            <v-icon left @click="drawerRight = !drawerRight">
              {{ drawerRight ? 'mdi-border-left-variant' : 'mdi-border-right-variant' }}
            </v-icon>
            <v-icon
              ref="closeDrawerIcon"
              @click="closeDrawer();"
              class="animate__animated animate__faster">
              mdi-close
            </v-icon>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider/>
      <div style="max-height: 75vh; overflow-y: auto">
        <v-expansion-panels accordion flat tile v-model="panelExposed" >
          <draggable v-model="blocks" @change="orderUpdated = true" style="width: 100%;
         border-style: none" :disabled="panelExposed != null">
            <v-expansion-panel v-for="(component, index) in blocks" :key="index">
              <v-expansion-panel-header class="py-0 my-0">
                <div :class="{ 'text-decoration-line-through' : component.deleted }">
                  {{ getComponentTitle(component) }}
                </div>
                <v-spacer/>
                <div class="text-right">
                  <v-fade-transition>
                    <v-icon small v-show="panelExposed == null">
                      mdi-drag-variant
                    </v-icon>
                  </v-fade-transition>
                  <v-icon small class="ml-1" olor="secondary" @click.stop="copyBlock(component)">
                    mdi-content-copy
                  </v-icon>
                  <v-icon :color="component.deleted ? '' : 'error'"
                          @click.stop="toggleDeleteBlock(component)">
                    mdi-delete
                  </v-icon>
                </div>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-form ref="form" @submit.prevent="">
                  <v-jsf :options="vjsfOptions" style="z-index: 202"
                         @input="component.edited = true; componentEdited=true"
                         v-model="component.props_data" :schema="getComponentSchema(component)"/>
                </v-form>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </draggable>
        </v-expansion-panels>
      </div>
      <v-list-item>
        <v-list-item-content>
          <v-btn outlined
                 @click="$refs.addComponentDialog.show();newComponentDialog = true;">
            <v-icon left>mdi-plus</v-icon>
            {{ $t('_component.addComponent') }}
          </v-btn>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-btn small text @click="fetchData"><v-icon>mdi-restore</v-icon></v-btn>
        <v-btn depressed class="ml-3 grow" color="success" :disabled="!saveButton"
               @click="savePage">Save</v-btn>
      </v-list-item>
    </v-navigation-drawer>
    <Dialog ref="addComponentDialog" :title="$t('_component.addComponent')" icon="mdi-image-plus"
            :max-width="1000"
            @close="newComponentDialog = false">
      <div style="height: 80vh">
        <v-text-field outlined hide-details="auto" dense class="mt-3" append-icon="mdi-magnify"
                      v-model="addComponentSearch" :label="$t('search')"/>
        <transition-group tag="div" class="mt-3 row" name="list-complete">
          <v-col cols="6" md="4" lg="4" v-for="cp in availableComponentsSearch" :key="cp.component"
                 class="list-complete-item">
            <v-card @click="addComponent(cp)" style="height: 100%"
                    class="d-flex flex-column flex-grow-1" hover>
              <v-img style="background-color: #e0e0e0"
                     :src="cp.previewImage" height="100px" contain/>
              <v-spacer />
              <div class="text-center text-h5">
                {{ cp.title }}
              </div>
              <v-spacer />
            </v-card>
          </v-col>
          <v-col v-if="availableComponentsSearch.length === 0" :key="1">
            {{ $t('noDataAvailable') }}
          </v-col>
        </transition-group>
      </div>
    </Dialog>
  </div>
</template>

<script>
import components from '@/components/BuilderComponents/components';
import Wrapper from '@/components/BuilderComponents/Wrapper.vue';
import Dialog from '@/components/Dialog.vue';
import draggable from 'vuedraggable';
import VJsf from '@koumoul/vjsf';
import '@koumoul/vjsf/dist/main.css';
import '@koumoul/vjsf/lib/deps/third-party';
import i18n from '@/plugins/i18n';
import axios from 'axios';
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';

const homepageComponents = {};

// eslint-disable-next-line array-callback-return
components.components.map((component) => {
  homepageComponents[component.component] = () => import(`@/components/BuilderComponents/${component.component}.vue`);
});

export default {
  name: 'Home.vue',
  components: {
    VJsf,
    Dialog,
    Wrapper,
    draggable,
    ...homepageComponents,
  },
  beforeMount() {
    this.fetchData();
    this.redirectWhenDisabled();
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
            // eslint-disable-next-line no-param-reassign
            b.new = false;
            // eslint-disable-next-line no-param-reassign
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
      return schema;
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
