import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: (): main => ({
    counter: 0,
    name: "Eduardo",
    leftDrawerOpen: false,
    boardSeq: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1;
    },
    leftDrawer: (state) => state.leftDrawerOpen,
    getBoardSeq: (state) => {
      return state.boardSeq;
    },
  },
  actions: {
    reset() {
      this.counter = 0;
    },
    increment() {
      this.counter++;
    },
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
    setBoardSeq(boardSeq: Number) {
      this.boardSeq = boardSeq;
    },
  },
});
