<template>
  <div>
    <SettingTitle doc-path="/guide/adverts">
      {{ $t('_advert.title') }}
    </SettingTitle>
    <VueDraggable
      v-model="adverts"
      @dragend="updateLinkOrder"
    >
      <v-expansion-panels
        v-for="advert in adverts"
        :key="advert.id"
        flat
      >
        <v-expansion-panel
          class="mt-4"
          :class="!advert.enabled ? 'text-disabled' : ''"
          style="border-style: solid; border-width: 1px"
          :style="{ 'border-color': advert.color }"
        >
          <v-expansion-panel-title class="d-flex">
            {{ advert.title }}
            <v-spacer />
            <div class="text-right my-auto">
              <DragDropIcon class="mr-1" />
              <v-icon
                v-if="advert.enabled"
                class="mr-1"
                color="success"
              >
                mdi-check-circle
              </v-icon>
              <v-icon
                v-if="!advert.enabled"
                class="mr-1"
                color="error"
              >
                mdi-close-circle
              </v-icon>
              <v-chip
                v-for="serverbundle in advert.serverbundles"
                :key="serverbundle.id"
                class="mr-1"
                :color="serverbundle.color"
                variant="outlined"
                size="small"
                @click.stop
              >
                {{ serverbundle.name }}
              </v-chip>
              <v-btn
                variant="outlined"
                color="primary"
                size="small"
                class="ml-1 mr-1"
                @click.stop="openAdvertEditDialog(advert)"
              >
                <v-icon>
                  mdi-pencil
                </v-icon>
              </v-btn>
              <v-btn
                class="mr-2"
                variant="outlined"
                color="error"
                size="small"
                @click.stop="$refs.deleteAdvertConfirmationDialog.show(advert)"
              >
                <v-icon>
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            {{ advert.content }}
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </VueDraggable>
    <v-divider class="my-3" />
    <div class="d-flex flex-wrap">
      <v-spacer />
      <v-btn
        color="success"
        variant="outlined"
        @click="$refs.addAdvertDialog.show()"
      >
        <v-icon start>
          mdi-plus
        </v-icon>
        <span>{{ $t('_advert.add') }}</span>
      </v-btn>
    </div>
    <DialogForm
      ref="addAdvertDialog"
      :title="$t('_advert.addAdvertDialog')"
      icon="mdi-chat-question"
      :form-schema="advertAddSchema"
      @submit="addAdvert"
    />
    <DeleteConfirmationDialog
      ref="deleteAdvertConfirmationDialog"
      @submit="deleteAdvert"
    />
    <DialogForm
      ref="editAdvertDialog"
      :title="$t('_advert.editAdvertDialog')"
      icon="mdi-chat-question"
      :form-schema="advertAddSchema"
      @submit="editAdvert"
    />
  </div>
</template>

<script>
import openapi from '@/api/openapi';
import AdvertsForm from '@/forms/AdvertsForm';
import {VueDraggable} from "vue-draggable-plus";

export default {
  components: {VueDraggable},
  data() {
    return {
      advert: null,
      adverts: [],
      advertAddSchema: AdvertsForm,
    };
  },
  beforeMount() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      (await openapi).advert_getAdverts().then((rsp) => {
        this.adverts = rsp.data;
      });
    },
    async addAdvert() {
      const data = this.$refs.addAdvertDialog.getData();
      (await openapi).advert_createAdvert(null, data).then(() => {
        this.$refs.addAdvertDialog.closeAndReset();
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        this.$refs.addAdvertDialog.setError(err);
      });
    },
    openAdvertEditDialog(advert) {
      this.$refs.editAdvertDialog.show(advert);
      const data = advert;
      const serverbundle_id = [];
      data.serverbundles.forEach((s) => {
        serverbundle_id.push(s.id);
      });
      data.serverbundle_id = serverbundle_id;
      this.$refs.editAdvertDialog.setData(data);
    },
    async deleteAdvert(advert) {
      (await openapi).advert_deleteAdvert(advert.id).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.deleteSuccess'),
          type: 'success',
        });
        this.$refs.deleteAdvertConfirmationDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.deleteAdvertConfirmationDialog.setError(err);
      });
    },
    async editAdvert(advert) {
      const data = this.$refs.editAdvertDialog.getData();
      (await openapi).advert_editAdvert(advert.id, data).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        this.$refs.editAdvertDialog.closeAndReset();
      }).catch((err) => {
        this.$refs.editAdvertDialog.setError(err);
      });
    },
    async updateLinkOrder() {
      const res = [];
      this.adverts.forEach((item) => {
        res.push(item.id);
      });
      (await openapi).advert_updateOrder(null, res).then(() => {
        this.fetchData();
        this.$notify({
          title: this.$t('_messages.updateOrderSuccess'),
          type: 'success',
        });
      }).catch((err) => {
        console.log(`${err}`);
      });
    },
  },
};
</script>
<style>

</style>
