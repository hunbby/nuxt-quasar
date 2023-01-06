<template>
  <q-page> {{ $route.params }} - 페이지 테스트 - </q-page>
</template>
<script setup lang="ts">
const { params } = useRoute();
const router = useRouter();
</script>
<style lang="sass" scoped>
.q-pa-md
  height: 815px
  overflow: auto
</style>
