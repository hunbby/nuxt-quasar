<template>
  <div class="table-wrapper">
    <div v-for="data in list" :key="data.batdContetnsSeq" class="list_content">
      <a href="">
        <strong class="tit_post">{{ data.title }}</strong>
        <p class="txt_post">
          {{ data.content }}
        </p>
      </a>
      <div class="detail_info">
        <a v-for="tag in data.tags" class="link_cate" @click="tagClick(tag)"
          >{{ tag }},
        </a>
        <span class="txt_bar"></span>
        <span class="txt_date">{{ data.modifiedDt }}</span>
      </div>
    </div>
    <div class="q-pa-sm row justify-end">
      <q-btn
        v-if="auth.logginInChekc"
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
import { useAuthStore } from "../../stores/auth";
import { useMainStore } from "../../stores/main";

const auth = useAuthStore();
const main = useMainStore();

const current = ref(1);

const boardSeq = ref(main.getBoardSeq);
const list = ref();
onMounted(() => {
  axios.post("/boardList", { boardSeq: Number(boardSeq.value) }).then((res) => {
    console.log(res.data);
    list.value = res.data.list;
  });
});

const router = useRouter();
const moveWritePage = () => {
  router.push({ path: "/board/write" });
};

const tagClick = (tag: string) => {
  console.log(tag);
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
