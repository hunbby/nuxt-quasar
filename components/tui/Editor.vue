<template>
  <div ref="editorDiv"></div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/editor";
import FileService from "../../services/file/file-service";
import ImageContainer from "./ImageContainer.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  height: {
    type: String,
    default: "500px",
  },
  previewStyle: {
    type: String as PropType<"tab" | "vertical">,
    default: "vertical",
  },
  initialEditType: {
    type: String as PropType<"wysiwyg" | "markdown">,
    default: "markdown",
  },
  useCommandShortcut: {
    type: Boolean,
    default: true,
  },
});

const fileData = reactive<any>([]);

const emit = defineEmits(["update:modelValue"]);

const { modelValue } = toRefs(props);
let editor: Editor;
const editorDiv = ref<HTMLElement>();

onMounted(() => {
  if (editorDiv.value) {
    editor = new Editor({
      el: editorDiv.value,
      // toolbarItems: props.toolbars,
      initialValue: props.modelValue,
      height: props.height,
      previewStyle: props.previewStyle,
      initialEditType: props.initialEditType,
      useCommandShortcut: props.useCommandShortcut,
      language: "ko",
      events: {
        /* load: (editor: any) => {
                        }, */
        change:
          (/* param: { source: SourceType | 'viewer'; data: MouseEvent } */) => {
            const value = editor.getMarkdown();
            emit("update:modelValue", value);
          },
      },
      hooks: {
        addImageBlobHook: (file, callback) => {
          console.log(file);
          const param = new FormData();
          param.append("upload", file);
          FileService.fileUpload(param).then((result) => {
            const baseUrl = import.meta.env.VITE_APP_BASE_API as string | undefined;
            const fileLocation = baseUrl + result.data.filePath;
            const fileSeq = result.data.fileSeq;
            const dataSet = {
              fileSeq: fileSeq.toString(),
              fileLocation: fileLocation.toString(),
            };
            fileData.push(dataSet);
            callback(fileLocation, dataSet.fileSeq.toString());
          });
        },
      },
    });
  }
});

// ??? ?????? ??????
watch(modelValue, () => {
  editor.setMarkdown(modelValue.value);
});

// html ????????? ??????
const getHtmlValue = () => {
  return editor.getHTML();
};

// ?????? export ????????? ??????
defineExpose({
  getHtmlValue,
});
</script>
<style>
.imagePrevie {
  border: 1px solid #dadde6;
  min-height: 225px;
  font-family: "Open Sans", "Helvetica Neue", "Helvetica", "Arial",
    "??????????????????", "Nanum Barun Gothic", "????????????", "Malgun Gothic",
    sans-serif;
  border-radius: 4px;
}
.imagePrevieCard {
  height: 100%;
}
</style>
