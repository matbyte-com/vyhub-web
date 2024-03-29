<template>
  <div style="position: relative">
    <vue-editor :editor-toolbar="toolbar" :editorOptions="editorSettings"
                @ready="ready" v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor';
import ImageResize from 'quill-image-resize-vue';

const Image = Quill.import('formats/image');
Image.className = 'img-fluid';
Quill.register(Image, true);

Quill.register('modules/imageResize', ImageResize);

export default {
  name: 'Editor',
  components: {
    VueEditor,
  },
  props: ['value'],
  data() {
    return {
      quill: null,
      toolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ['bold', 'italic', 'underline', 'strike'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' },
        ],
        ['blockquote', 'code-block'],

        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        ['link', 'image', 'video'],
        ['clean'], // remove formatting button
      ],
      editorSettings: {
        modules: {
          imageResize: {
            modules: ['Resize', 'DisplaySize'],
          },
        },
      },
    };
  },
  methods: {
    ready(quill) {
      // Get quill instance and register image handler
      this.quill = quill;
      const toolbar = quill.getModule('toolbar');
      toolbar.addHandler('image', this.imageHandler);
    },
    imageHandler() {
      /* const range = this.quill.getSelection();
      const value = prompt('please copy paste the image url here.');
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, this.quill.sources.USER);
      } */
      const { tooltip } = this.quill.theme;
      const originalSave = tooltip.save;
      const originalHide = tooltip.hide;
      // eslint-disable-next-line func-names
      tooltip.save = function () {
        const range = this.quill.getSelection(true);
        const { value } = this.textbox;
        if (value) {
          this.quill.insertEmbed(range.index, 'image', value, 'user');
        }
      };
      // Called on hide and save.
      // eslint-disable-next-line func-names
      tooltip.hide = function () {
        tooltip.save = originalSave;
        tooltip.hide = originalHide;
        tooltip.hide();
      };
      tooltip.edit('image');
      tooltip.textbox.placeholder = 'Embed URL';
    },
  },
  computed: {
    content: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="sass">
#quill-container
  overflow-y: auto
  max-height: 60vh
</style>
