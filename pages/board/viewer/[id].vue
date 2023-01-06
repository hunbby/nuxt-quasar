<template>
  <q-page>
    <span> {{ $route.params }}</span>
    <span>페이지 테스트</span> - {{ route.params }}
  </q-page>
</template>
<script setup lang="ts">
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.params.name);
</script>
<style lang="sass" scoped>
.q-pa-md
  height: 815px
  overflow: auto
</style>
