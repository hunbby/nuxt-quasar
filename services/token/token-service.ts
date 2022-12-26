import { useAuthStore } from "../../stores/auth";

class TokenService {
  getLocalRefreshToken() {
    const user = this.localStorageGetUserData();
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = this.localStorageGetUserData();
    return user?.accessToken;
  }

  updateLocalAccessToken(token: string) {
    const user = this.localStorageGetUserData();
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return this.localStorageGetUserData();
  }

  setUser(user: User) {
    console.log(JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user");
  }

  async refreshtokenCheck() {
    const authStore = useAuthStore();
    try {
      const params = {
        accessToken: this.getLocalAccessToken(),
        refreshToken: this.getLocalRefreshToken(),
      };
      const rs: ServerResponse = await axios.post("/refreshtoken", params);
      console.log("interceptor 리프레시 토큰 체크 결과", rs.data);
      const resltCd = rs.data.resltCd;
      if (resltCd == "0000") {
        console.log("토큰 만료 기간이 아닙니다.");
      } else if (resltCd == "0900") {
        localStorage.removeItem("user");
        alert("토큰 만료로 인해 로그아웃 되었습니다.");
        window.location.reload();
      } else {
        const { accessToken } = rs.data;
        authStore.refreshToken(accessToken);
        this.updateLocalAccessToken(accessToken);
      }
    } catch (_error) {
      console.log("axios intercepter refreshToken errror", _error);
      const accessToken = this.getLocalAccessToken();
      const refreshToken = this.getLocalRefreshToken();
      if (!(accessToken && refreshToken)) {
        localStorage.removeItem("user");
        alert("토큰 만료로 인해 로그아웃 되었습니다.");
        window.location.reload();
      }
      // return Promise.reject(_error)
    }
  }

  localStorageGetUserData() {
    const authTmp = localStorage.getItem("auth");
    let auth = null;
    if (authTmp) {
      auth = JSON.parse(authTmp).user;
    }
    if (auth) {
      return auth;
    } else {
      return null;
    }
  }
}

export default new TokenService();
