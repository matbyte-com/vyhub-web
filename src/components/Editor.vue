<template>
  <div class="main-container">
    <div class="editor-container editor-container_classic-editor">
      <div class="editor-container__editor">
        <div ref="editorElement">
          <ckeditor
            v-if="isEditorReady"
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


import i18n from "../plugins/i18n";
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
      isEditorReady: false,
      editor: ClassicEditor,
      editorConfig: {},
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
  beforeMount() {
    this.initializeEditor();
  },
  methods: {
    async initializeEditor() {
      const currentLocale = i18n.global.locale;
      let translations = null;
      const translationFiles = import.meta.glob('../../node_modules/ckeditor5/dist/translations/*.js'); // Adjust path as necessary

      const importPath = `../../node_modules/ckeditor5/dist/translations/${currentLocale}.js`;  // Dynamically construct path
      try {
        // Check if the translation file exists in the glob map
        if (translationFiles[importPath]) {
          translations = await translationFiles[importPath]()
            .catch(() => null);  // Handle potential import failure
        } else {
          console.warn(`No CKEditor translations found for locale: ${currentLocale}`);
        }
      } catch (e) {
        console.warn(`Failed to load CKEditor translations for locale: ${currentLocale}`, e);
      }

      this.editorConfig = {
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
        language: currentLocale, // TODO make this dynamic fitting to i18n locale
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
        mediaEmbed: {
          previewsInData: true
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: translations ? translations.default : undefined,
      }
      this.isEditorReady = true;
    }
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
}

.ck-editor__editable_inline {
  min-height: 350px;
}
</style>
