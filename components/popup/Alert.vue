<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="open" persistent>
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          {{ msg }}
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" @click="popClose" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
// 팝업 활성화, 메세지
const props = defineProps({
  open: {
    type: Boolean,
    defulat: false,
  },
  title: {
    type: String,
    defulat: "",
  },
  msg: {
    type: String,
    defulat: "",
  },
});
const emit = defineEmits(["close"]);
const { open, msg } = toRefs(props);
const popClose = () => {
  emit("close");
};
</script>
