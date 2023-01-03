<template>
  <div class="q-pa-md">
    <BoardList></BoardList>
  </div>
</template>
<script setup lang="ts">
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
