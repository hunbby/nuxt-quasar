<template>
  <q-page>
    <div class="q-pa-md">
      <q-select
        style="padding-bottom: 5px"
        outlined
        v-model="boardList"
        :options="boardOptions"
        :dense="dense"
        :options-dense="denseOpts"
        emit-value
        map-options
      >
        <template v-slot:prepend>
          <q-icon name="event" />
        </template>
      </q-select>
      <q-input
        outlined
        v-model="titleText"
        :dense="dense"
        placeholder="제목을 입력해주세요"
        style="padding-bottom: 5px"
      >
        <template v-slot:prepend>
          <q-icon name="title" />
        </template>
      </q-input>
      <q-select
        outlined
        use-input
        use-chips
        multiple
        input-debounce="0"
        @new-value="createValue"
        :options="filterOptions"
        @filter="filterFn"
        v-model="tagList"
        :dense="dense"
        :options-dense="denseOpts"
        style="padding-bottom: 5px"
        placeholder="태그를 입력해주세요"
      >
        <template v-slot:prepend>
          <q-icon name="tag" />
        </template>
      </q-select>
      <TuiEditor ref="editor" v-model="modelValue" height="590px"></TuiEditor>
      <div class="q-pa-sm row justify-between">
        <q-btn
          icon="list"
          color="white"
          text-color="black"
          label="목록"
          @click="moveList"
        />
        <q-btn
          icon="create"
          color="white"
          text-color="black"
          label="등록"
          @click="writeProc"
        />
      </div>
    </div>
    <PopupAlert
      :title="'등록'"
      :open="open"
      :msg="popMsg"
      @close="popupClose"
    />
  </q-page>
</template>
<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
const auth = useAuthStore();
const router = useRouter();

// tui 에디터
const editor = ref();
const modelValue = ref("test");

// 퀘이사 dense 전체 적용
const dense = ref(true);
const denseOpts = ref(false);

// 게시판 목록
const boardOptions = ref<any>([]);
const boardList = ref("");

// 타이틀
const titleText = ref("");

// 테그 관련
const tagList = ref([]);
const tagOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];
const filterOptions = ref(tagOptions);

// Alert 팝업
const open = ref(false);
const popMsg = ref("");

onMounted(() => {
  axios.post("/boardAllSubMenu", {}).then((res) => {
    const currnetPath = router.currentRoute.value.path;
    const pathChk = "/" + currnetPath.split("/")[1];
    const subMenuList = res.data.list;
    subMenuList.forEach((menu: any) => {
      let data = {
        label: menu.boardName,
        value: menu.boardSeq,
      };
      if (pathChk == menu.url) {
        boardList.value = menu.boardName;
      }
      boardOptions.value.push(data);
    });
    console.log(boardOptions.value);
  });
});

// tag 필터
const filterFn = (val: any, update: any) => {
  update(() => {
    if (val === "") {
      filterOptions.value = tagOptions;
    } else {
      const needle = val.toLowerCase();
      filterOptions.value = tagOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

// tag 중복 체크
const createValue = (val: any, done: any) => {
  if (val.length > 2) {
    if (!tagOptions.includes(val)) {
      done(val, "add-unique");
    }
  }
};

// 게시글 등록
const writeProc = () => {
  const chk = validateChk();
  open.value = chk;
  if (!chk) {
    const editorValue = editor.value.getHtmlValue();
    const user = auth.userInfo;

    const data = {
      boardSeq: boardList.value,
      title: titleText.value,
      content: editorValue,
      tags: tagList.value.toString(),
      crreationId: user?.userId,
      modifiedId: user?.userId,
    };
    console.log("data", data);
  }
};

const validateChk = () => {
  if (titleText.value == "" || titleText.value == null) {
    popMsg.value = "제목을 입력하세요";
    return true;
  }
  if (modelValue.value == "" || modelValue.value == null) {
    popMsg.value = "내용을 입력하세요";
    return true;
  }
  if (tagList.value.toString() == "" || tagList.value.toString() == null) {
    popMsg.value = "테그를 입력하세요";
    return true;
  }
  return false;
};

const popupClose = () => {
  open.value = false;
};

// 페이지 이동
const moveList = () => {
  router.push({ path: "/board" });
};
</script>
<style></style>
