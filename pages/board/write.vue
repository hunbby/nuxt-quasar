<template>
  <q-page>
    <div class="q-pa-md">
      <q-select
        style="padding-bottom: 5px"
        outlined
        v-model="model"
        :options="options"
        :dense="dense"
        :options-dense="denseOpts"
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
        multiple
        use-chips
        use-input
        input-debounce="0"
        v-model="modelMultiple"
        :options="tags"
        :dense="dense"
        :options-dense="denseOpts"
        @new-value="createValue"
        @filter="filterFn"
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
const options = ["Vue", "Java", "JavaScript", "Spring Boot"];
const model = ref(options[0]);
const modelMultiple = ref([]);
const dense = ref(true);
const denseOpts = ref(false);
const titleText = ref("");

const stringOptions = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const tags = ref(stringOptions);

const filterFn = (val: any, update: any) => {
  update(() => {
    if (val === "") {
      tags.value = stringOptions;
    } else {
      const needle = val.toLowerCase();
      tags.value = stringOptions.filter(
        (v) => v.toLowerCase().indexOf(needle) > -1
      );
    }
  });
};

const createValue = (val: any, done: any) => {
  if (val.length > 2) {
    if (!stringOptions.includes(val)) {
      done(val, "add-unique");
    }
  }
};

const writeProc = () => {
  const va = editor.value.getHtmlValue();
  console.log(va);
};

const moveList = () => {
  router.push({ path: "/board" });
};
</script>
<style></style>
