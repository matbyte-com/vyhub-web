<template>
  <div>
    <v-btn @click="editDrawer = true">Drawer</v-btn>
    <v-btn @click="savePage">Save</v-btn>
    <v-btn @click="fetchData">Reset</v-btn>
    <wrapper v-for="block in blocksToShow" :key="block.id" :no_wrap="block.no_wrap"
             :title="block.props_data ? block.props_data.title : null"
             :height="block.props_data ? block.props_data.height : null"
             :subtitle="block.props_data ? block.props_data.subtitle : null">
      <component :is="block.type" v-bind="block.props_data">{{ block.slot }}</component>
    </wrapper>
    <v-navigation-drawer
      :permanent="editDrawer" v-model="editDrawer"
      :right="drawerRight"
      absolute
      bottom
      width="400px"
      temporary>
      <v-list-item dense>
        <v-list-item-content>
          <v-list-item-title class="d-flex align-center">
            __Components
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
      <div>
        <v-expansion-panels accordion flat tile v-model="panelExposed">
          <draggable v-model="blocks" @change="orderUpdated = true" style="width: 100%;
         border-style: none" :disabled="panelExposed != null">
            <transition-group>
              <v-expansion-panel v-for="(component, index) in blocks" :key="index">
                <v-expansion-panel-header class="py-0 my-0">
                  <div :class="{ 'text-decoration-line-through' : component.deleted }">
                    {{ component.type }}
                  </div>
                  <v-spacer/>
                  <div class="text-right">
                    <v-fade-transition>
                      <v-icon small v-show="panelExposed == null">
                        mdi-drag-variant
                      </v-icon>
                    </v-fade-transition>
                    <v-icon color="error" @click.stop="toggleDeleteBlock(component)">
                      mdi-delete
                    </v-icon>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form ref="form" @submit.prevent="">
                    <v-jsf :options="vjsfOptions" @input="component.edited = true"
                           v-model="component.props_data" :schema="getComponentSchema(component)"/>
                  </v-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </transition-group>
          </draggable>
        </v-expansion-panels>
        <v-list-item>
          <v-list-item-content>
            <v-btn class="" outlined @click="$refs.addComponentDialog.show()">
              <v-icon left>mdi-plus</v-icon>
              __Add component
            </v-btn>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-navigation-drawer>
    <Dialog ref="addComponentDialog" title="__addComponent" :max-width="1000">
      <v-row justify="center" class="mt-3">
        <v-col cols="6" md="4" lg="4" v-for="cp in availableComponents" :key="cp.component">
          <v-card class="add-component-card grow" @click="addComponent(cp)">
            <v-img :src="cp.previewImage" height="100px"/>
            <div class="text-center text-h5">
              {{ cp.title }}
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-divider/>
    </Dialog>
  </div>
</template>

<script>
import components from '@/components/BuilderComponents/components';
import Wrapper from '@/components/BuilderComponents/Wrapper.vue';
import Dialog from '@/components/Dialog.vue';
import draggable from 'vuedraggable';
import GenForm from '@/components/GenForm.vue';
import VJsf from '@koumoul/vjsf';
import i18n from '@/plugins/i18n';
import axios from 'axios';
import openapi from '@/api/openapi';

const homepageComponents = {};

// eslint-disable-next-line array-callback-return
components.components.map((component) => {
  homepageComponents[component.component] = () => import(`@/components/BuilderComponents/${component.component}.vue`);
});

export default {
  name: 'Test.vue',
  components: {
    VJsf,
    GenForm,
    Dialog,
    Wrapper,
    draggable,
    ...homepageComponents,
  },
  beforeMount() {
    this.fetchData();
  },
  data() {
    return {
      editDrawer: false,
      drawerRight: false,
      orderUpdated: false,
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
    async fetchData() {
      (await openapi).design_getSections().then((rsp) => {
        this.blocks = rsp.data;
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
        if (b.new) {
          const p = api.design_createSection(null, b).then((rsp) => {
            console.log('Section Created');
            // eslint-disable-next-line no-param-reassign
            b.new = false;
            // eslint-disable-next-line no-param-reassign
            b.id = rsp.data.id;
          });
          promises.push(p);
        } else if (b.edited) {
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
        props_data: { ...cp.defaults },
      // slot: 'Button',
      });
      this.$refs.addComponentDialog.close();
    },
    toggleDeleteBlock(cp) {
      const index = this.blocks.indexOf(cp);
      const newBlock = { ...cp };
      newBlock.deleted = !newBlock.deleted;
      this.blocks.splice(index, 1, newBlock);
    },
    getComponentSchema(cp) {
      const el = this.availableComponents.find((c) => c.component === cp.type);
      const schema = { ...el.schema };
      if (!el.no_wrap) {
        schema.properties = {
          ...schema.properties,
          title: {
            type: 'string',
            title: 'Title',
            'x-cols': 6,
          },
          subtitle: {
            type: 'string',
            title: 'Subtitle',
            'x-cols': 6,
          },
          height: {
            type: 'string',
            title: 'Height',
            'x-cols': 6,
          },
          css: {
            type: 'string',
            title: 'CSS',
            'x-cols': 6,
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
  },
  computed: {
    blocksToShow() {
      if (this.blocks == null) return [];
      return this.blocks.filter((block) => !block.deleted);
    }
    ,
  }
  ,
};
</script>

<style>
.grow-on-hover {
  transition: all .2s ease-in-out;
}

.grow-on-hover:hover {
  transform: scale(1.02);
}
</style>
