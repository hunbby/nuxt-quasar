<template>
  <q-page>
    <div class="q-pa-md">
      <TuiEditor ref="editor" v-model="modelValue" height="730px"></TuiEditor>
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
const writeProc = () => {
  const va = editor.value.getHtmlValue();
  console.log(va);
};
const moveList = () => {
  router.push({path:'/board'})
};
</script>
<style></style>
