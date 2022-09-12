<template>
  <div>
    <SettingTitle docPath="/guide/adverts">
      {{ $t('_advert.title') }}
    </SettingTitle>
      <draggable
        :list="adverts"
        :items="adverts"
        @change="updateAdvertEnabled = true">
        <v-expansion-panels
          v-for="advert in adverts"
          :key="advert.id">
          <v-expansion-panel class="mt-4"
                             :class="!advert.enabled ? 'text--disabled' : ''"
                             style="border-style: solid; border-width: 1px"
                             :style="{ 'border-color': advert.color }">
            <v-expansion-panel-header>
            <v-row class="d-flex align-center">
              <v-col cols="12">
                {{ advert.title }}
                <v-spacer />
                <div class="text-right">
                  <v-icon class="mr-1" v-if="advert.enabled" color="success">
                    mdi-check-circle
                  </v-icon>
                  <v-icon class="mr-1" v-if="!advert.enabled" color="error">
                    mdi-close-circle
                  </v-icon>
                  <v-chip class="mr-1" :color='serverbundle.color'
                          :text-color="$vuetify.theme.dark ? 'white' : 'black'"
                          v-for="serverbundle in advert.serverbundles"
                          :key="serverbundle.id" @click.stop outlined small>
                    {{ serverbundle.name }}
                  </v-chip>
                  <v-btn outlined color="primary" small
                         @click.stop="openAdvertEditDialog(advert)" class="ml-1 mr-1">
                    <v-icon>
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                  <v-btn class="mr-2" outlined color="error" small
                         @click.stop="$refs.deleteAdvertConfirmationDialog.show(advert)">
                    <v-icon>
                      mdi-delete
                    </v-icon>
                  </v-btn>
                </div>
              </v-col>
            </v-row>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              {{ advert.content }}
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </draggable>
    <v-divider class="my-3" />
    <v-row>
      <v-col cols="12" md="6">
        <v-btn @click="$refs.addAdvertDialog.show()" color="success" outlined>
          <v-icon left>mdi-plus</v-icon>
          <span>{{ $t('_advert.add') }}</span>
        </v-btn>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn outlined color="primary" class="ml-5" v-on="on" v-bind="attrs"
                   style="border-top-right-radius: 0; border-bottom-right-radius: 0"
                   @click="updateLinkOrder" :disabled="!updateAdvertEnabled">
              <v-icon>mdi-check</v-icon>
            </v-btn>
          </template>
          <span>
              {{ $t('_advert.update') }}
            </span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs}">
            <v-btn outlined color="primary" v-on="on" v-bind="attrs"
                   style="border-bottom-left-radius: 0; border-top-left-radius: 0"
                   @click="fetchData" :disabled="!updateAdvertEnabled">
              <v-icon>mdi-backspace-outline</v-icon>
            </v-btn>
          </template>
          <span>
              {{ $t('_advert.reset') }}
            </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <DialogForm :title="$t('_advert.addAdvertDialog')" icon="mdi-chat-question"
                ref="addAdvertDialog"
                :form-schema="advertAddSchema"
                @submit="addAdvert">
    </DialogForm>
    <DeleteConfirmationDialog ref="deleteAdvertConfirmationDialog"
                              @submit="deleteAdvert"/>
    <DialogForm :title="$t('_advert.editAdvertDialog')" icon="mdi-chat-question"
                ref="editAdvertDialog"
                :form-schema="advertAddSchema"
                @submit="editAdvert">
    </DialogForm>
  </div>
</template>

<script>
import DialogForm from '@/components/DialogForm.vue';
import openapi from '@/api/openapi';
import DeleteConfirmationDialog from '@/components/DeleteConfirmationDialog.vue';
import AdvertsForm from '@/forms/AdvertsForm';
import SettingTitle from './SettingTitle.vue';

export default {
  name: 'Adverts',
  components: {
    DialogForm,
    SettingTitle,
    DeleteConfirmationDialog,
  },
  data() {
    return {
      advert: [],
      adverts: null,
      advertAddSchema: AdvertsForm,
      updateAdvertEnabled: false,
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
          title: this.$t('_advert.messages.addSuccess'),
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
          title: this.$t('_advert.messages.deleteSuccess'),
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
          title: this.$t('_advert.messages.editSuccess'),
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
        this.updateAdvertEnabled = false;
        this.$notify({
          title: this.$t('_advert.messages.updatedOrder'),
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
