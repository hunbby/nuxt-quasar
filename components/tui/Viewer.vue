<template>
  <div class="q-px-lg contents">
    <div class="title">
      <h3>타이틀</h3>
    </div>
    <div ref="viewerDiv"></div>
    <div class="q-px-lg">
      <q-drawer
        side="right"
        v-model="drawerRight"
        show-if-above
        :width="250"
        :breakpoint="500"
      >
        <q-scroll-area class="fit">
          <div class="q-pt-lg rside">
            <div v-for="n in 10" :key="n">Drawer {{ n }} / 50</div>
          </div>
        </q-scroll-area>
      </q-drawer>
    </div>
  </div>
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
const drawerRight = ref(false);
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
<style>
.contents {
  padding-left: 150px;
  padding-right: 120px;
}

.contents .title {
  text-align: center;
}

.contents .rside {
  padding-top: 200px;
}

.contents .rside div {
  border-left: 1px dashed rgba(0, 0, 0, 0.1);
  padding-left: 20px;
}
</style>
