<template>
<div>
  <v-btn @click="editDrawer = true">Drawer</v-btn>
  <wrapper v-for="block in blocksToShow" :key="block.id" :no-wrapper="block.noWrapper"
           :title="block.propsData ? block.propsData.title : null"
           :subtitle="block.propsData ? block.propsData.subtitle : null">
    <component :is="block.type" v-bind="block.propsData">{{block.slot}}</component>
  </wrapper>
  <v-navigation-drawer
    v-model="editDrawer"
    absolute
    bottom
    temporary>
    <v-list-item dense>
      <v-list-item-content>
        <v-list-item-title class="d-flex align-center">
          __Components
          <v-spacer />
          <v-icon @click="editDrawer = false">
            mdi-close
          </v-icon>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
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
                  <v-spacer />
                  <div class="text-right">
                    <v-fade-transition>
                      <v-icon small v-show="panelExposed == null">mdi-drag-variant</v-icon>
                    </v-fade-transition>
                    <v-icon color="error" @click.stop="toggleDeleteBlock(component)">
                      mdi-delete
                    </v-icon>
                  </div>
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  <v-form ref="form" @submit.prevent="">
                  <v-jsf :options="vjsfOptions"
                         v-model="component.propsData" :schema="getComponentSchema(component)"/>
                  </v-form>
                </v-expansion-panel-content>
              </v-expansion-panel>
          </transition-group>
        </draggable>
      </v-expansion-panels>
      <v-list-item>
        <v-list-item-content>
          <v-btn class="" outlined @click="$refs.addComponentDialog.show()">
            <v-icon left>mdi-plus</v-icon>__Add component
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-navigation-drawer>
  <Dialog ref="addComponentDialog" title="__addComponent" :max-width="1000">
    <v-row justify="center" class="mt-3">
      <v-col cols="6" md="4" lg="4" v-for="cp in availableComponents" :key="cp.component">
        <v-card class="add-component-card grow" @click="addComponent(cp)">
          <v-img :src="cp.imageUrl" height="100px" />
          <div class="text-center text-h5">
            {{ cp.title }}
          </div>
        </v-card>
      </v-col>
    </v-row>
    <v-divider />
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
  data() {
    return {
      editDrawer: false,
      orderUpdated: false,
      blocks: [],
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
    addComponent(cp) {
      this.blocks.push({
        type: cp.component,
        new: true,
        id: this.count += 1,
        noWrapper: cp.noWrap,
        propsData: { ...cp.defaults },
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
    getComponentProps(cp) {
      const el = this.availableComponents.find((c) => c.component === cp.type);
      return el.props;
    },
    getComponentSchema(cp) {
      const el = this.availableComponents.find((c) => c.component === cp.type);
      return el.schema;
    },
  },
  computed: {
    blocksToShow() {
      return this.blocks.filter((block) => !block.deleted);
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
</style>
