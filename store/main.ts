import { defineStore } from 'pinia'

interface main {
  counter: number,
  name: string
}

export const useMainStore = defineStore('main', {
  state: (): main => ({
    counter:  0,
    name: 'Eduardo',
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1
    },
  },
  actions: {
    reset() {
      this.counter = 0;
    },
    increment() {
      this.counter++;
    }
  },
})