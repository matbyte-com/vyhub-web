<template>
  <div>
    <SettingTitle doc-path="/guide/customizability">
      <template #default>
        {{ $t('theme') }}
      </template>
      <template #header-right>
        <div
          class="outer-div"
          @click="$refs.dialog.show()"
        >
          <v-icon>mdi-brush-variant</v-icon>
          Predefined Themes
        </div>
      </template>
    </SettingTitle>
    <v-row>
      <v-col
        cols="12"
        xl="8"
      >
        <h6 class="text-h6">
          {{ $t('general') }}
        </h6>
        <GenForm
          ref="themePicker"
          :form-schema="formSchema"
          :error-message="errorMessage"
          :cancel-text="$t('cancel')"
          :submit-text="$t('submit')"
          :settings-mode="true"
          @submit="setTheme"
        />
      </v-col>
    </v-row>
    <Dialog
      ref="dialog"
      title="Predefined Templates"
      icon="mdi-brush-variant"
      max-width="80%"
    >
      <ThemePicker />
    </Dialog>
  </div>
</template>

<script>
import emitter from '@/services/EventBus';
import openapi from '@/api/openapi';
import ThemePickerSchema from '../../forms/ThemePicker';

export default {
  data() {
    return {
      formSchema: ThemePickerSchema,
      errorMessage: null,
    };
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    async fetchData() {
      (await openapi).general_getTheme().then((rsp) => {
        this.$refs.themePicker.setData(rsp.data);
      });
    },
    async setTheme() {
      if (!this.$refs.themePicker) {
        return;
      }
      const data = this.$refs.themePicker.getData();
      // Set logo, image, favicon null to allow for removal of these attributes in database
      if (!data.logo) { data.logo = null; }
      if (!data.image) { data.image = null; }
      if (!data.favicon) { data.favicon = null; }
      (await openapi).general_editTheme(
        null, data,
      ).then(() => {
        this.errorMessage = null;
        emitter.emit('themeUpdated');
        this.$notify({
          title: this.$t('_messages.editSuccess'),
          type: 'success',
        });
        // Emit second time for proper updating of header / footer colors
        emitter.emit('themeUpdated');
      }).catch((err) => {
        this.$refs.themePicker.setError(err);
      });
    },
  },
};
</script>

<style scoped>

.outer-div {
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  justify-content: center;
  color: black;
  align-items: center;
  background: linear-gradient(to right,
  hsl(224, 85%, 66%),
  hsl(269, 85%, 66%),
  hsl(314, 85%, 66%),
  hsl(359, 85%, 66%),
  hsl(44, 85%, 66%),
  hsl(359, 85%, 66%),
  hsl(314, 85%, 66%),
  hsl(269, 85%, 66%),
  hsl(224, 85%, 66%)
  );
  background-size: 1800% 200%;
  animation: moveGradient 6s linear infinite;
}

@keyframes moveGradient {
  0% {
    background-position: 0% 0%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>
