<template>
  <q-layout view="lHh lpR fFf">
    <Header></Header>
    <LsideMenu></LsideMenu>

    <q-page-container>
      <router-view :key="$route.fullPath" />
    </q-page-container>

    <!-- <Footer></Footer> -->
  </q-layout>
</template>

<script setup lang="ts"></script>
