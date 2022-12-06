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
      <q-input
        style="padding-bottom: 5px"
        outlined
        v-model="tagText"
        :dense="dense"
        placeholder="태그을 입력해주세요"
      >
        <template v-slot:prepend>
          <q-icon name="tag" />
        </template>
      </q-input>
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
const dense = ref(true);
const denseOpts = ref(false);
const titleText = ref("");
const tagText = ref("");
const writeProc = () => {
  const va = editor.value.getHtmlValue();
  console.log(va);
};
const moveList = () => {
  router.push({ path: "/board" });
};
</script>
<style></style>
