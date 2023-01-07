<template>
  <q-page>
    <BoardList></BoardList>
  </q-page>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();

const boardSeq = ref();
onMounted(() => {
  boardSeq.value = route.query.boardSeq;
  console.log("list", boardSeq.value);
});
</script>
<style lang="sass" scoped>
.q-pa-md
  height: 815px
  overflow: auto
</style>
