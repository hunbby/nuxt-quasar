<template>
  <div>
    <div class="file-preview-content-container">
      <div class="file-preview-container">
        <div v-if="fileDataList.length">
          <div
            v-for="(fileItem, index) in fileDataList"
            :key="index"
            class="file-preview-wrapper"
          >
            <div
              class="file-close-button"
              :data-file-seq="fileItem.fileSeq"
              @click="deleteImg"
            >
              x
            </div>
            <img :src="fileItem.fileLocation" />
          </div>
        </div>
        <div v-else>
          <div class="file-preview-wrapper">
            <p></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import FileService from "../../services/file/file-service";

const props = defineProps({
  fileData: {
    type: Array,
    default: () => {
      return [];
    },
  },
});
const { fileData } = toRefs(props);

const fileDataList = ref<FileDatas[]>([]);

onMounted(() => {
  fileDataList.value = fileData.value as FileDatas[];
});

watch(fileData, () => {
  fileDataList.value = fileData.value as FileDatas[];
});

const deleteImg = (event: Event) => {
  const target = event.target as Element;
  const fileSeq = target.getAttribute("data-file-seq");
  console.log("deleteImg", target.getAttribute("data-file-seq"));
  const data = {
    fileSeq: fileSeq,
  } as FileDatas;
  const fileList = [];
  fileList.push(data);

  // 파일 제거 서비스
  const files = { files: fileList };
  FileService.fileDel(files);

  // ref 반영
  fileDataList.value = fileDataList.value.filter((data: FileDatas) => {
    return data.fileSeq != fileSeq;
  });
};
</script>
<style>
.file-preview-content-container {
  height: 100%;
}
.file-preview-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.file-preview-wrapper {
  float: left;
  padding: 10px;
  position: relative;
  min-height: 130px;
}

.file-preview-wrapper > img {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}
.file-preview-wrapper > p {
  position: relative;
  width: 190px;
  height: 130px;
  z-index: 10;
}
.file-close-button {
  position: absolute;
  /* align-items: center; */
  line-height: 18px;
  z-index: 99;
  font-size: 18px;
  right: 5px;
  top: 10px;
  color: #fff;
  font-weight: bold;
  background-color: #666666;
  width: 20px;
  height: 20px;
  text-align: center;
  cursor: pointer;
}
</style>
