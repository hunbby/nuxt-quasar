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
const boardList = ref('');

onMounted(() => {
  axios.post("/boardAllSubMenu", {}).then((res) => {
    const currnetPath = router.currentRoute.value.path;
    const pathChk = "/" + currnetPath.split("/")[1];
    const subMenuList = res.data.list;
    subMenuList.forEach((menu:any) => {
      let data = {
        label: menu.boardName,
        value: menu.boardSeq,
      }
      if (pathChk == menu.url) { 
        boardList.value = menu.boardName;
      }
      boardOptions.value.push(data);
    });
    console.log(boardOptions.value);
  });
});

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

const createValue = (val: any, done: any) => {
  if (val.length > 2) {
    if (!tagOptions.includes(val)) {
      done(val, "add-unique");
    }
  }
};

const writeProc = () => {
  const va = editor.value.getHtmlValue();
  console.log("boardSeq", boardList.value);
  console.log("editor", va);
  console.log("titleText", titleText.value);
  console.log("modelMultiple", tagList.value);
};

const moveList = () => {
  router.push({ path: "/board" });
};
</script>
<style></style>
