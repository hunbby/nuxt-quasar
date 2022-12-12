class AuthService {
  async login(_user: LoginForm) {
    const result1 = await axios
      .post("/signin", _user)
      .then((res) => {
        console.log("login result : ", res.data);
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
    return result1;
  }

  async logout() {
    console.log("로그아웃 되었습니다.");
    localStorage.removeItem("user");
  }

  async register(_user: User) {
    const result = await axios
      .post("/signup", _user)
      .then((res) => {
        console.log("signUp result", res.data);
        return res.data;
      })
      .catch((error) => {
        alert(error);
      });
    return result;
  }
}

export default new AuthService();
