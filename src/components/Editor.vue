<template>
  <div id="app">
    <vue-editor @ready="ready" v-model="content"></vue-editor>
  </div>
</template>

<script>
import { VueEditor, Quill } from 'vue2-editor';

export default {
  name: 'Editor',
  components: {
    VueEditor,
  },
  data() {
    return {
      quill: null,
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],

        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],

        ['clean'],
        ['image'],
      ],
      content: '',
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
    getContent() {
      return this.content;
    },
    setContent(content) {
      this.content = content;
    },
  },
};
</script>
