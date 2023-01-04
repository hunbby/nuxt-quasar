import { defineStore } from "pinia";

export const useBoardStore = defineStore("board", {
  state: (): pageData => ({
    boardSeq: 0,
    lows: 5,
    page: 1,
    total: 1,
  }),
  getters: {
    getBoardSeq: (state) => {
      return state.boardSeq;
    },
    getTotalCount: (state) => {
      return state.total;
    },
    getPageNo: (state) => {
      return state.page;
    },
  },
  actions: {
    setBoardSeq(boardSeq: number) {
      this.boardSeq = boardSeq;
    },
    setTotalCount(total: number) {
      this.total = total;
    },
    setPageNo(page: number) {
      this.page = page;
    },
  },
  persist: true,
});
