<template>
  <div>
    <vue-editor :editor-toolbar="toolbar" @ready="ready" v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor';

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
        ['link', 'image'],
        ['clean'], // remove formatting button
      ],
    };
  },
  methods: {
    ready(quill) {
      // This is all done to allow for image urls instead of uploading the image to server
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
