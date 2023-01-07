<template>
  <q-page>
    <BoardList :lows="8"></BoardList>
  </q-page>
</template>
<script setup lang="ts">
onMounted(() => {});
</script>
<style lang="sass" scoped>
.q-pa-md
  height: 815px
  overflow: auto
</style>
