<template>
  <div class="table-wrapper">
    <div v-for="data in list" :key="data.boardContentsSeq" class="list_content">
      <div class="list_main">
        <a
          class="list_content_detail"
          @click="detailPage(data.boardContentsSeq)"
        >
          <strong class="tit_post">{{ data.title }}</strong>
          <div class="txt_wrapper">
            <p class="txt_post">
              {{ data.content }}
            </p>
          </div>
        </a>
        <div class="detail_info">
          <a v-for="tag in data.tags" class="link_cate" @click="tagClick(tag)"
            >{{ tag }},
          </a>
          <span class="txt_bar"></span>
          <span class="txt_date">{{ data.modifiedDt }}</span>
        </div>
      </div>
      <div class="thumbnail">
        <img
          src="http://localhost:18090/cms/images/2023/20230107134555927.jpg"
          alt=""
        />
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
        v-model="pageData.page"
        :max="pageData.total"
        :max-pages="pageData.lows"
        :ellipses="false"
        :boundary-numbers="false"
        direction-links
        boundary-links
        gutter="20px"
        @click="pageMove"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
import { useBoardStore } from "../../stores/board";

import BoardServcie from "../../services/board/board-service";

const auth = useAuthStore();
const board = useBoardStore();
const router = useRouter();

const props = defineProps({
  lows: {
    type: Number,
    default: 8,
  },
});

// 페이징
const pageData = ref<pageData>({
  boardSeq: board.getBoardSeq,
  lows: props.lows,
  page: 1,
  total: 1,
});

// 게시판 리스트
const list = ref();

const setMax = (total: number, maxPage: number) => {
  return Math.ceil(total / maxPage);
};

onMounted(() => {
  pageData.value.boardSeq = board.getBoardSeq;
  pageData.value.page = board.getPageNo;
  if (pageData.value != null || pageData.value != "") {
    getList(pageData.value);
  }
});

const pageMove = () => {
  board.setPageNo(pageData.value.page);
  getList(pageData.value);
  window.scrollTo(0, 0);
};

const getList = (data: pageData) => {
  BoardServcie.getList(data)
    .then((res) => {
      console.log("res", res);
      board.setTotalCount(res.total);
      list.value = res.list;
      pageData.value.total = setMax(board.getTotalCount, pageData.value.lows);
    })
    .catch((err) => {
      console.log(err);
    });
};

const moveWritePage = () => {
  window.scrollTo(0, 0);
  router.push({ path: "/board/write" });
};

const tagClick = (tag: string) => {
  console.log(tag);
};

const detailPage = (boardContentsSeq: number) => {
  router.push({ path: "/board/viewer/" + boardContentsSeq });
};
</script>
<style lang="sass">
.table-wrapper
  padding-top: 50px
  padding-left: 290px
  padding-right: 290px

.list_content
  padding: 18px 0 20px
  border-bottom: 1px solid #efefef
  display: flex

.list_content .list_main
  float: left
  width: 80%

.list_content .thumbnail
  float: right
  width: 20%
  padding-left: 20px

.thumbnail img
  width: 100%
  height: 145px

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
  overflow: hidden
  text-overflow: ellipsis
  display: -webkit-box
  -webkit-line-clamp: 3
  -webkit-box-orient: vertical

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

.list_content_detail
  cursor: pointer

.list_content .detail_info .link_cate
  font-size: 13px
  text-decoration: none
  color: #6bacce
  cursor: pointer


.pagination
  position: relative
</style>
