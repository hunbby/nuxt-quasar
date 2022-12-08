import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: (): main => ({
    counter: 0,
    name: "Eduardo",
    leftDrawerOpen: false,
    loginData: {
      saveId: false,
      loginChk: false,
      id: "",
      pw: "",
    },
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1;
    },
    leftDrawer: (state) => state.leftDrawerOpen,
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
    test() { 
      this.loginData.loginChk = !this.loginData.loginChk
    }
  },
});
