<template>
  <div class="main-container">
    <div class="editor-container editor-container_classic-editor">
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-model="content"
            :editor="editor"
            :config="editorConfig"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  Autosave,
  BalloonToolbar,
  BlockQuote,
  Bold,
  Code,
  Essentials,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  FontSize,
  FullPage,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  Indent,
  IndentBlock,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  MediaEmbed,
  Paragraph,
  SelectAll,
  SourceEditing,
  Strikethrough,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  TodoList,
  Underline,
  Undo
} from 'ckeditor5';

import translations from 'ckeditor5/translations/de.js';

import {Ckeditor} from "@ckeditor/ckeditor5-vue";

export default {
  components: {
    Ckeditor,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    }
  },
  emits: ['update:modelValue'],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: {
          items: [
            'heading',
            '|',
            'fontSize',
            //'fontFamily',
            'fontColor',
            //'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            '|',
            'link',
            'insertImageViaUrl',
            'mediaEmbed',
            'insertTable',
            'blockQuote',
            '|',
            'bulletedList',
            'numberedList',
            'todoList',
            'outdent',
            'indent',
            '|',
            'code',
            'htmlEmbed',
            'sourceEditing'
          ],
          shouldNotGroupWhenFull: false
        },
        plugins: [
          AccessibilityHelp,
          Autoformat,
          AutoImage,
          Autosave,
          BalloonToolbar,
          BlockQuote,
          Bold,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          FullPage,
          GeneralHtmlSupport,
          Heading,
          HtmlComment,
          HtmlEmbed,
          ImageBlock,
          ImageCaption,
          ImageInline,
          ImageInsertViaUrl,
          ImageResize,
          ImageStyle,
          ImageTextAlternative,
          ImageToolbar,
          Indent,
          IndentBlock,
          Italic,
          Link,
          LinkImage,
          List,
          ListProperties,
          MediaEmbed,
          Paragraph,
          SelectAll,
          SourceEditing,
          Strikethrough,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TextTransformation,
          TodoList,
          Underline,
          Undo
        ],
        balloonToolbar: ['bold', 'italic', '|', 'link', '|', 'bulletedList', 'numberedList'],
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        heading: {
          options: [
            {
              model: 'paragraph',
              title: 'Paragraph',
              class: 'ck-heading_paragraph'
            },
            {
              model: 'heading1',
              view: 'h1',
              title: 'Heading 1',
              class: 'ck-heading_heading1'
            },
            {
              model: 'heading2',
              view: 'h2',
              title: 'Heading 2',
              class: 'ck-heading_heading2'
            },
            {
              model: 'heading3',
              view: 'h3',
              title: 'Heading 3',
              class: 'ck-heading_heading3'
            },
            {
              model: 'heading4',
              view: 'h4',
              title: 'Heading 4',
              class: 'ck-heading_heading4'
            },
            {
              model: 'heading5',
              view: 'h5',
              title: 'Heading 5',
              class: 'ck-heading_heading5'
            },
            {
              model: 'heading6',
              view: 'h6',
              title: 'Heading 6',
              class: 'ck-heading_heading6'
            }
          ]
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        image: {
          toolbar: [
            'toggleImageCaption',
            'imageTextAlternative',
            '|',
            'imageStyle:inline',
            'imageStyle:wrapText',
            'imageStyle:breakText',
            '|',
            'resizeImage'
          ]
        },
        // initialData: '',
        language: 'de', // TODO make this dynamic fitting to i18n locale
        link: {
          addTargetToExternalLinks: true,
          defaultProtocol: 'https://',
          decorators: {
            toggleDownloadable: {
              mode: 'manual',
              label: 'Downloadable',
              attributes: {
                download: 'file'
              }
            }
          }
        },
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations]
      }
    };
  },
  computed: {
    content: {
      get() {
        return this.modelValue;
      },
      set(val) {
        this.$emit('update:modelValue', val);
      },
    },
  },
};
</script>

<style>
.main-container {
}

.ck-content {
  line-height: 1.6;
  word-break: break-word;
}

.editor-container_classic-editor .editor-container__editor {
  min-width: 795px;
}

.ck-editor__editable_inline {
  min-height: 350px;
}
</style>
