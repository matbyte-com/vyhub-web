<template>
  <Dialog ref="dialog" :title="$t('_forum.editThread')" icon="mdi-molecule"
          :max-width="700">
    <v-row v-if="errorMsg != null">
      <v-col cols="12" class="mt-4">
        <v-alert
          type="error"
        >
          {{ errorMsg }}
        </v-alert>
      </v-col>
    </v-row>
    <!-- Thread Settings: -->
    <v-text-field :label="$t('title')"
                  v-model="title">
      <template v-slot:append>
        <div style="display: flex; flex-wrap: wrap;">
          <div v-for="label in currentLabels" :key="label.id">
            <!-- Add current labels before the title text as chips -->
            <v-chip class="mr-1 mb-1" :color="label.color" small close
                    @click:close="removeLabel(label)">
              {{ label.name }}
            </v-chip>
          </div>
        </div>
      </template>
    </v-text-field>
    <div class="d-flex">
      <v-checkbox v-model="pinned" label="Pinned" class="mr-4" />
      <v-checkbox v-model="locked" label="Locked" />
    </div>
    <v-btn outlined color="success" @click="submit" v-if="title !== ''" class="mb-2" small>
      <v-icon left>mdi-check</v-icon>
      <div>
        {{ $t('submit') }}
      </div>
    </v-btn>
    <v-divider />
    <!-- For Labels: -->
    <div class="mt-2 mb-1">
      <span>{{ $t('_forum.availableLabels') }}:</span>
      <div class="d-flex mt-1 mb-2">
          <span v-for="label in labels" :key="label.name + label.color">
            <v-chip class="mr-1 mb-1" :color="label.color" small @click="addLabel(label, true)">
              {{ label.name }}
              <v-icon right x-small
                      style="background-color: #FFFFFF; color: #000000; border-radius: 50%">
                mdi-plus
              </v-icon>
            </v-chip>
          </span>
      </div>
    </div>
    <v-row>
      <v-col cols="8">
        <v-text-field v-model="labelTitle" :label="$t('_forum.labelTitle')" />
      </v-col>
      <v-col cols="4">
        <v-text-field v-model="labelColor" hide-details class="ma-0 pa-0" solo
                      style="max-width: 200px">
          <template v-slot:append>
            <v-menu v-model="colorPickerVisible" top nudge-bottom="105" nudge-left="16"
                    :close-on-content-click="false">
              <template v-slot:activator="{ on }">
                <div :style="swatchStyle" v-on="on" />
              </template>
              <v-card>
                <v-card-text class="pa-0">
                  <v-color-picker v-model="labelColor" show-swatches/>
                </v-card-text>
              </v-card>
            </v-menu>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <div class="mt-2">
      <v-btn outlined color="success" :disabled="labelTitle === '' || labelTitle === null"
             @click="addLabel(null)" small>
        <v-icon left>mdi-plus</v-icon>
        {{ $t('create') }}
      </v-btn>
    </div>
  </Dialog>
</template>

<script>
import openapi from '@/api/openapi';
import Dialog from '../Dialog.vue';

export default {
  name: 'EditThreadDialog',
  components: {
    Dialog,
  },
  data() {
    return {
      threadId: null,
      topicId: null,
      title: null,
      pinned: false,
      locked: false,
      errorMsg: null,
      obj: null,
      labelTitle: null,
      labelColor: '#000000', // Default color
      currentLabels: [],
      labels: [],
      colorPickerVisible: false,
    };
  },
  methods: {
    async beforeMount() {
      (await openapi).forum_getPopularLabels().then((rsp) => {
        const { data } = rsp;
        for (let i = 0; i < data.length; i += 1) {
          for (let j = 0; j < this.currentLabels.length; j += 1) {
            if (this.currentLabels[j].name === data[i].name
              && this.currentLabels[j].color === data[i].color) {
              data[i].isAlreadyAdded = true;
            }
          }
          if (!data[i].isAlreadyAdded && !this.labels.some((label) => label.name
            + label.color === data[i].name + data[i].color)) {
            this.labels.push({
              name: data[i].name,
              color: data[i].color,
            });
          }
        }
      });
    },
    getData() {
      return {
        title: this.title,
        pinned: this.pinned,
        status: this.locked ? 'CLOSED' : 'OPEN',
      };
    },
    setData(data, topicId) {
      this.beforeMount();
      this.title = data.title;
      this.pinned = data.pinned;
      this.locked = data.status === 'CLOSED';
      this.threadId = data.id;
      this.topicId = topicId;
      this.currentLabels = data.labels;
      //
    },
    show(obj) {
      this.$refs.dialog.show();
      this.obj = obj;
    },
    close() {
      this.$refs.dialog.close();
      this.title = '';
      this.pinned = false;
      this.errorMsg = null;
      this.currentLabels = [];
      this.labels = [];
      this.labelTitle = null;
      this.labelColor = '#000000';
    },
    setErrorMessage(msg) {
      this.errorMsg = msg;
    },
    setError(err) {
      this.errorMsg = err;
    },
    submit() {
      if (this.currentLabels.length > 4) {
        this.$notify({
          title: this.$t('_forum.messages.tooManyLabels'),
          type: 'error',
        });
        return;
      }
      this.$emit('submit', this.obj, this.getData());
      this.close();
    },
    async addLabel(label, alreadyExists = false) {
      const newLabel = label || { name: this.labelTitle, color: this.labelColor };
      if (this.currentLabels.length >= 4) {
        this.$notify({
          title: this.$t('_forum.messages.tooManyLabels'),
          type: 'error',
        });
        return;
      }
      if (alreadyExists) {
        this.labels.splice(this.labels.indexOf(label), 1);
      }
      (await openapi).forum_addLabel(this.threadId, newLabel).then((rsp) => {
        this.currentLabels.push({
          id: rsp.data.id,
          name: newLabel.name,
          color: newLabel.color,
        });
        this.$notify({
          title: this.$t('_messages.addSuccess'),
          type: 'success',
        });
      });
      this.labelTitle = '';
      this.labelColor = '#000000';
    },
    async removeLabel(label) {
      (await openapi).forum_deleteLabel(label.id).then(() => {
        this.labels.push(label);
        this.currentLabels.splice(this.currentLabels.indexOf(label), 1);
        this.$notify({
          title: this.$t('_messages.removeSuccess'),
          type: 'success',
        });
      });
    },
  },
  computed: {
    swatchStyle() {
      return {
        backgroundColor: this.labelColor,
        cursor: 'pointer',
        height: '30px',
        width: '30px',
        borderRadius: '50%',
        transition: 'border-radius 200ms ease-in-out',
      };
    },
  },
};
</script>

<style scoped>

</style>
