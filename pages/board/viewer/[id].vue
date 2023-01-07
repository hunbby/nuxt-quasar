<template>
  <q-page>
    <div class="q-pa-xl">
      <TuiViewer :value="htmlValue"></TuiViewer>
    </div>
  </q-page>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
import BoardServcie from "../../../services/board/board-service";
const route = useRoute();

const htmlValue = ref();

const detailData = ref<boardDetail>({
  boardContentsSeq: Number(route.params.id),
});
onMounted(() => {
  BoardServcie.getDatail(detailData.value)
    .then((res) => {
      htmlValue.value = res.content;
    })
    .catch((err) => {
      console.log(err);
    });
});
</script>
<style lang="sass" scoped>
.q-pa-md
  height: 815px
  overflow: auto
</style>
