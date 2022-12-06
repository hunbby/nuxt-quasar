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
      <div v-if="loginChk">
        <q-btn flat>
          rn1349 임시 아이디
          <q-avatar size="30px" style="margin-left: 10px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip>Open Menu</q-tooltip>
          <q-menu anchor="bottom start" self="top left">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">rn1349</div>
                <q-btn
                  color="primary"
                  label="Logout"
                  icon="login"
                  push
                  v-close-popup
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <div v-else>
        <q-btn flat icon="login">로그인</q-btn>
        <q-btn flat icon="how_to_reg">회원가입</q-btn>
      </div>
    </q-toolbar>
  </q-header>
</template>
<script setup lang="ts">
import { useMainStore } from "~/store/main";
const main = useMainStore();
const loginChk = ref(false);
</script>
