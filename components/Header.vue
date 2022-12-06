<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="main.toggleLeftDrawer" />
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        블로그 프로젝트
      </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { useMainStore } from "~/store/main";
const main = useMainStore();
</script>
