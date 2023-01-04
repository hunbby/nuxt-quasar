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
        <template v-for="(menuItem, index) in menuList2" :key="index">
          <template v-for="(item, i) in menuItem.subMenus" :key="i">
            <q-item
              clickable
              :active="isRouteActive(item.url)"
              v-ripple
              @click="pageMove(item.url, item.boardSeq)"
            >
              <q-item-section avatar>
                <q-icon :name="item.icon" />
              </q-item-section>
              <q-item-section>
                {{ item.boardName }}
              </q-item-section>
            </q-item>
          </template>
          <q-separator />
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
import { useMainStore } from "../stores/main";
import { useBoardStore } from "../stores/board";
const main = useMainStore();
const board = useBoardStore();
const router = useRouter();

const menuList2 = ref<any>([]);
onMounted(() => {
  axios.post("/boardMenu", {}).then((res) => {
    menuList2.value = res.data.menus;
  });
});

const pageMove = (url: string, boardSeq: number) => {
  router.push({ path: url });
  board.setBoardSeq(boardSeq);
};
const isRouteActive = (url: string) => {
  const currnetPath = router.currentRoute.value.path;
  const pathChk = "/" + currnetPath.split("/")[1];
  if (pathChk == url) {
    return true;
  } else {
    return false;
  }
};
</script>
<style></style>
