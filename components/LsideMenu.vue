<template>
  <q-drawer
    show-if-above
    v-model="main.leftDrawerOpen"
    side="left"
    bordered
    class="bg-grey-3"
  >
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list>
        <template v-for="(menuItem, index) in menuList" :key="index">
          <q-item
            clickable
            :active="isRouteActive(menuItem.url)"
            v-ripple
            @click="pageMove(menuItem.url)"
          >
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
          <q-separator :key="'sep' + index" v-if="menuItem.separator" />
        </template>
      </q-list>
    </q-scroll-area>
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar size="56px" class="q-mb-sm">
          <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
        </q-avatar>
        <div class="text-weight-bold">JHG</div>
        <div>rn1349@naver.com</div>
      </div>
    </q-img>
  </q-drawer>
</template>

<script setup lang="ts">
import { useMainStore } from "~/store/main";
const main = useMainStore();
const route = useRoute();
const router = useRouter();
const menuList = ref([
  {
    icon: "inbox",
    label: "Blog",
    separator: true,
    url: "/",
  },
  {
    icon: "table_chart",
    label: "Board",
    separator: false,
    url: "/board",
  },
  {
    icon: "table_chart",
    label: "about",
    separator: false,
    url: "/about",
  },
  {
    icon: "table_chart",
    label: "Test2",
    separator: false,
    url: "/test2",
  },
  {
    icon: "table_chart",
    label: "Test3",
    separator: false,
    url: "/test3",
  },
]);

onMounted(() => {});

const pageMove = (url: string) => {
  router.push({ path: url });
};
const isRouteActive = (url: string) => {
  if (route.path == url) {
    return true;
  } else {
    return false;
  }
};
</script>
<style></style>
