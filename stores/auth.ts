import { defineStore } from "pinia";
import AuthService from "../services/auth/auth-service";

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    status: {
      loggedIn: false,
    },
    user: {
      userId: "",
      userPw: "",
      pwChangeDt: "",
      creationId: "",
      role: "",
      accessToken: "",
      refreshToken: "",
    },
  }),
  getters: {
    logginInChekc(): boolean {
      return this.status.loggedIn;
    },
  },
  actions: {
    async login(_user: LoginForm) {
      return AuthService.login(_user).then(
        (res) => {
          this.status.loggedIn = true;
          this.user = res.data;
          return Promise.resolve(res);
        },
        (error) => {
          this.status.loggedIn = false;
          this.user = null;
          return Promise.reject(error);
        }
      );
    },
    logout() {
      this.status.loggedIn = false;
      this.user = null;
      AuthService.logout();
    },
    refreshToken(accessToken: string) {
      this.status.loggedIn = true;
      if (this.user != null) {
        this.user = { ...this.user, accessToken: accessToken };
      }
    },
    tokenCheck() {
      let result = null;
      const auth = localStorage.getItem("auth");
      let user = null;
      if (auth) {
        user = JSON.parse(auth).user;
      }
      if (user !== null) {
        result = JSON.parse(user).accessToken;
      }
      if (result) {
        this.status.loggedIn = true;
      } else {
        this.status.loggedIn = false;
      }
    },
  },
  persist: true,
});
