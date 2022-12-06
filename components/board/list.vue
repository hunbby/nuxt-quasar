<template>
  <div class="table-wrapper">
    <div v-for="user in users" :key="user.id" class="list_content">
      <a href="">
        <strong class="tit_post">{{ user.name }}</strong>
        <p class="txt_post">
          {{ user.email }} / {{ user.country }} / {{ user.status }}
        </p>
      </a>
      <div class="detail_info">
        <a href="" class="ling_cate">vue.js</a>
        <span class="txt_bar"></span>
        <span class="txt_date">2022-05-05</span>
      </div>
    </div>
    <div class="q-pa-sm row justify-end">
      <q-btn
        icon="create"
        color="white"
        text-color="black"
        label="글쓰기"
        @click="moveWritePage"
      />
    </div>
    <div class="q-pa-sm flex flex-center">
      <q-pagination
        v-model="current"
        :max="5"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        gutter="20px"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import data from "@/data/data.json";
const users = data.slice(0, 5);
const current = ref(3);
const router = useRouter();
const moveWritePage = () => {
  router.push({ path: "/board/write" });
};
</script>
<style lang="sass">
.va-table
  width: 100%


.list_content
  padding: 18px 0 20px
  border-bottom: 1px solid #efefef


.list_content .link_post
  display: block
  overflow: hidden
  text-decoration: none


.list_content .tit_post
  display: block
  font-weight: normal
  font-size: 24px
  line-height: 34px


.list_content .txt_post
  display: -webkit-box
  display: -ms-flexbox
  overflow: hidden
  margin-top: 4px
  font-size: 13px
  line-height: 23px
  color: #5c5c5c
  vertical-align: top
  word-break: break-all
  -webkit-box-orient: vertical
  -webkit-line-clamp: 4


.txt_bar
  display: inline-block
  width: 1px
  height: 9px
  margin: 0 9px
  background-color: #ebebeb


.list_content .detail_info
  margin-top: 11px
  font-size: 12px
  color: #aaa


.list_content .detail_info .link_cate
  font-size: 13px
  text-decoration: none
  color: #6bacce


.pagination
  position: relative
</style>
