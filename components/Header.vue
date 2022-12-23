<template>
  <q-header elevated class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat round icon="menu" @click="main.toggleLeftDrawer" />
      <q-toolbar-title>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
        </q-avatar>
        블로그 프로젝트
      </q-toolbar-title>
      <div v-if="auth.logginInChekc">
        <q-btn flat>
          {{ auth.user?.userId }}
          <q-avatar size="30px" style="margin-left: 10px">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <q-tooltip>Open Menu</q-tooltip>
          <q-menu anchor="bottom start" self="top left">
            <div class="row no-wrap q-pa-md">
              <div class="column items-center">
                <q-avatar size="72px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
                <div class="text-subtitle1 q-mt-md q-mb-xs">rn1349</div>
                <q-btn
                  color="primary"
                  label="Logout"
                  icon="login"
                  push
                  v-close-popup
                  @click="logout"
                />
              </div>
            </div>
          </q-menu>
        </q-btn>
      </div>
      <div v-else>
        <q-btn flat icon="login" @click="loginDialog = true">로그인</q-btn>
        <q-btn flat icon="how_to_reg">회원가입</q-btn>
      </div>
    </q-toolbar>
  </q-header>
  <q-dialog v-model="loginDialog" persistent>
    <q-card style="width: 400px">
      <q-toolbar class="q-pt-sm">
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar>
        <q-toolbar-title>
          <span class="text-weight-bold" style="font-size: 30px">로그인</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <q-card-section>
        <div class="column justify-around">
          <q-input
            class="q-pa-sm"
            outlined
            v-model="loginData.userId"
            label="ID"
          />
          <q-input
            class="q-pa-sm"
            outlined
            v-model="loginData.userPw"
            label="PW"
            type="password"
          />
          <q-checkbox
            v-model="loginData.keepLoggedIn"
            label="아이디 저장"
            style="padding-bottom: 5px"
          />
        </div>
        <div vertical align="center">
          <q-btn
            class="q-pa-sm"
            color="primary"
            label="로그인"
            style="width: 96%"
            @click="login"
          />
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { useMainStore } from "../stores/main";
import { useAuthStore } from "../stores/auth";

const loginData = ref<LoginForm>({
  userId: "",
  userPw: "",
  keepLoggedIn: false,
});

const main = useMainStore();
const auth = useAuthStore();

const loginDialog = ref(false);

const login = () => {
  auth.login(loginData.value).then(
    (res) => {
      if (res.resltCd == "0000") {
        console.log("auth 모듈 로그인 호출 되었습니다.");
        loginDialog.value = false;
        clearloginData();
      } else {
        alert(res.data.msg);
      }
    },
    (error) => {
      console.log(error);
      return false;
    }
  );
};

const logout = () => {
  auth.logout();
};

const clearloginData = () => {
  loginData.value = {
    userId: "",
    userPw: "",
    keepLoggedIn: false,
  }
}
</script>
