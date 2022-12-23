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
  </q-page>
</template>
<script setup lang="ts">
import { useAuthStore } from "../../stores/auth";
const auth = useAuthStore();

const modelValue = ref("test");
const editor = ref();
const router = useRouter();

const tagList = ref([]);
const dense = ref(true);
const denseOpts = ref(false);
const titleText = ref("");

const tagOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const filterOptions = ref(tagOptions);

const boardOptions = ref<any>([]);
const boardList = ref("");

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
  if (chk) {
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
    alert("제목을 입력하세요");
    return false;
  }
  if (modelValue.value == "" || modelValue.value == null) {
    alert("내용을 입력하세요");
    return false;
  }
  if (tagList.value.toString() == "" || tagList.value.toString() == null) {
    alert("테그를 입력하세요");
    return false;
  }
  return true;
};

// 페이지 이동
const moveList = () => {
  router.push({ path: "/board" });
};
</script>
<style></style>
