<template>
  <div>
    <!-- Top Menu -->
    <div
      v-if="$checkProp('theme_edit') && !editDrawer"
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
          @click="openDrawer"
        >
          mdi-cog
        </v-icon>
      </v-card>
    </div>
    <!-- Rendering of Components -->
    <BuilderWrapper
      v-if="blocksToShow.length > 0"
      ref="builderWrapper"
      :blocks-to-show="blocksToShow"
    />
    <v-fade-transition>
      <v-card
        v-if="showLoader"
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
      :style="display.mdAndDown ? 'max-height: 60vh' : ''"
      mobile-breakpoint="md"
      :permanent="newComponentDialog"
      :location="drawerLocation"
      :width="400"
    >

      <!-- Container for VJSF/Vuetify overlay attachments (select menus, date pickers, etc.) -->
      <!-- (kept empty on purpose; select menu attachment is handled in schema x-props) -->
      <div />

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
            @click.stop="closeDrawer();"
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
            style="width: 100%; border-style: none"
            :disabled="panelExposed != null"
            @dragend="orderUpdated = true"
          >
            <v-expansion-panel
              v-for="(component) in blocks"
              :key="component.id"
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
                      style="cursor: grab"
                    >
                      mdi-drag-horizontal-variant
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
                    :model-value="getDraftProps(component)"
                    :options="vjsfOptions"
                    style="z-index: 202"
                    :schema="getComponentSchema(component)"
                    @update:model-value="(val) => onPropsChanged(component, val)"
                  >
                    <template #custom-image="context">
                      <ImageUpload
                        v-bind="context"
                        :title="$t('_theme.backgroundImageURL')"
                      />
                    </template>
                  </v-jsf>
                </v-form>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </VueDraggable>
        </v-expansion-panels>
      </div>
      <v-list-item>
        <v-btn
          style="width: 100%"
          variant="outlined"
          @click="addComponentDialog.show();newComponentDialog = true;"
        >
          <v-icon start>
            mdi-plus
          </v-icon>
          {{ $t('_component.addComponent') }}
        </v-btn>
      </v-list-item>
      <v-list-item>
        <div class="d-flex">
          <v-btn
            size="small"
            variant="text"
            @click="fetchData"
          >
            <v-icon>mdi-restore</v-icon>
          </v-btn>
          <v-btn
            variant="flat"
            class="ml-3 flex-grow-1"
            color="success"
            :disabled="!saveButton"
            @click="savePage"
          >
            Save
          </v-btn>
        </div>
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
          append-inner-icon="mdi-magnify"
          :label="$t('search')"
        />
        <transition-group
          tag="div"
          class="mt-3 v-row"
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

<script setup lang="ts">
import components from '@/components/BuilderComponents/components';
import VJsf from '@koumoul/vjsf';
import {v2compat} from "@koumoul/vjsf/compat/v2";
import openapi from '@/api/openapi';
import openapiCached from '@/api/openapiCached';
import {VueDraggable} from "vue-draggable-plus";
import {computed, onBeforeMount, ref, useTemplateRef} from "vue";
import {useDisplay} from "vuetify";
import {notify} from "@kyvg/vue3-notification";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useI18n} from "vue-i18n";

const display = ref(useDisplay());
const store = useStore();
const router = useRouter();
const i18n = useI18n();

const closeDrawerIcon = useTemplateRef('closeDrawerIcon')
const addComponentDialog = useTemplateRef('addComponentDialog')
const builderWrapper = useTemplateRef('builderWrapper')


const editDrawer = ref(false);
const drawerRight = ref(false);
const orderUpdated = ref(false);
const componentAdded = ref(false);
const componentEdited = ref(false);
const newComponentDialog = ref(false);
const addComponentSearch = ref('');
const showLoader = ref(true);
const blocks = ref([]);
const count = ref(0);
const availableComponents = components.components;
const panelExposed = ref(null);
const vjsfSchemas = ref(null);

// Keep a stable object reference for each block's props while editing.
// This avoids VJSF edit dialogs closing when the parent list reorders/replaces items.
const propsDraftById = ref({});

function getDraftProps(block: any) {
  const key = String(block.id);
  if (!propsDraftById.value[key]) {
    // Use the existing object reference if possible; otherwise initialize.
    propsDraftById.value[key] = block.props_data ?? {};
  }
  return propsDraftById.value[key];
}

function onPropsChanged(block: any, val: any) {
  const key = String(block.id);
  propsDraftById.value[key] = val;

  // Sync back to the actual block.
  // Important: mutate the existing block instance to keep VueDraggable stable.
  block.props_data = val;
  block.edited = true;
  componentEdited.value = true;
}

const vjsfOptions = {
  locale: i18n.locale.value,
  timePickerProps: {
    format: '24hr',
  },
  markdownit: {
    html: true,
  },
};

const drawerLocation = computed(() => {
  if (display.value.mdAndDown) return 'bottom';
  return drawerRight.value ? 'right' : 'left';
});

const blocksToShow = computed(() => {
  return blocks.value.filter((block) => !block.deleted);
})

const saveButton = computed(() => {
  if (orderUpdated.value || componentAdded.value || componentEdited.value) return true;
  return false;
})

const availableComponentsSearch = computed(() => {
  return availableComponents
    .filter((cp) => cp.title.toLowerCase().includes(addComponentSearch.value.toLowerCase())
      || cp.keywords.filter((k) => k.toLowerCase()
        .includes(addComponentSearch.value.toLowerCase())).length > 0);
})

onBeforeMount(() => {
  fetchData();
  redirectWhenDisabled();
})

async function redirectWhenDisabled() {
  if (!store.getters.generalConfig) {
    (await openapiCached).general_getConfig().then((rsp) => {
      const config = rsp.data;
      if (!config.enable_landingpage) {
        router.replace({name: 'News'});
      }
    });
  } else if (!store.getters.generalConfig.enable_landingpage) {
    await router.replace({name: 'News'});
  }
}

async function fetchData() {
  (await openapi).design_getSections().then((rsp) => {
    blocks.value = rsp.data;

    // Reset drafts because blocks were reloaded from API.
    propsDraftById.value = {};

    showLoader.value = false;
    orderUpdated.value = false;
    componentAdded.value = false;
    componentEdited.value = false;
  });
}

async function savePage() {
  // First create, edit and delete the necessary sections
  // Second update order of sections
  const api = await openapi;
  // Do some magic that the forEach function is executed first
  // Add all promises to the promise array
  const promises = [];
  blocks.value.forEach((b) => {
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
  Promise.allSettled(promises).then(async () => {
    await updateSectionOrder();
    componentAdded.value = false;
    componentEdited.value = false;
    orderUpdated.value = false;
  });
}

async function updateSectionOrder() {
  const res = [];
  blocks.value.filter((b) => !b.deleted).forEach((item) => {
    res.push(item.id);
  });
  (await openapi).design_updateOrder(null, res).then(() => {
    fetchData();
    orderUpdated.value = false;
    notify({
      title: i18n.t('_messages.editSuccess'),
      type: 'success',
    });
  }).catch((err) => {
    console.log(`${err}`);
  });
}

function addComponent(cp) {
  builderWrapper.value.addComponent({type: cp.component})
  blocks.value.push({
    type: cp.component,
    new: true,
    edited: false,
    id: count.value += 1,
    no_wrap: cp.no_wrap,
    props_data: {
      ...cp.defaults,
    },
  });
  addComponentDialog.value.close();
  componentAdded.value = true;
}

function toggleDeleteBlock(cp) {
  const index = blocks.value.indexOf(cp);
  const newBlock = {...cp};
  newBlock.deleted = !newBlock.deleted;
  componentEdited.value = true;
  blocks.value.splice(index, 1, newBlock);
}

function getComponentSchema(cp) {
  if (vjsfSchemas.value[cp.type]) {
    return vjsfSchemas.value[cp.type];
  }
  return generateVjsfSchema(cp);
}

function closeDrawer() {
  closeDrawerIcon.value.$el.classList.add('animate__rotateOut');
  setTimeout(() => {
    editDrawer.value = false;
    closeDrawerIcon.value.$el.classList.remove('animate__rotateOut');
  }, 100);
}

function copyBlock(block) {
  const newBlock = {...block};
  newBlock.new = true;
  newBlock.id = Math.random(100);
  blocks.value.push(newBlock);
  componentAdded.value = true;
}

function getComponentTitle(cp) {
  const el = availableComponents.find((c) => c.component === cp.type);
  if (!el) return cp.type;
  return el.title;
}

function openDrawer() {
  editDrawer.value = true;
  if (!vjsfSchemas.value) {
    console.log('Creating Schemas')
    vjsfSchemas.value = {};
    availableComponents.forEach((cp) => {
      vjsfSchemas.value[cp.component] = generateVjsfSchema(cp);
    });
  }
}

function generateVjsfSchema(el) {
  const schema = {...el.schema};
  if (!el.no_wrap) {
    schema.properties = {
      ...schema.properties,
      title: {
        type: 'string',
        title: i18n.t('title'),
        'x-cols': 6,
        'x-props': {
          clearable: true,
        },
      },
      subtitle: {
        type: 'string',
        title: i18n.t('subtitle'),
        'x-cols': 6,
        'x-class': 'pl-1',
      },
      height: {
        type: 'string',
        title: i18n.t('_component._form.height'),
        'x-cols': 6,
      },
      marginTop: {
        type: 'string',
        title: i18n.t('_component._form.marginTop'),
        'x-cols': 6,
        'x-class': 'pl-1',
      },
      whiteText: {
        type: 'boolean',
        title: i18n.t('_component.whiteText'),
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
        layout: {
          slots: {
            component: 'custom-image'
          },
          cols: 6,
        },
      },
      backgroundColor: {
        type: 'string',
        'x-cols': 6,
        title: i18n.t('_theme.backgroundColor'),
        format: 'hexcolor',
      },
    };
  }
  return v2compat(schema);
}
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
  /* .list-complete-leave-active below version 2.1.8 */
{
  opacity: 0;
}

.list-complete-leave-active {
  position: absolute;
}
</style>
