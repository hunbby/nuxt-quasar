<template>
  <div ref="viewerDiv"></div>
</template>
<script setup lang="ts">
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";

import Viewer from "@toast-ui/editor/dist/toastui-editor-viewer";

const props = defineProps({
  value: {
    type: String,
    default: "",
  },
});

const { value } = toRefs(props);
const viewerDiv = ref<HTMLElement>();
const viewerRef = ref<Viewer>();

watch(value, () => {
  if (viewerRef.value) {
    viewerRef.value.setMarkdown(value.value);
  }
});

onMounted(() => {
  if (viewerDiv.value) {
    const view = new Viewer({
      el: viewerDiv.value,
      initialValue: props.value,
      //   events: {
      //     load: (param: Viewer) => {},
      //   },
    });
    viewerRef.value = view;
  }
});
</script>
