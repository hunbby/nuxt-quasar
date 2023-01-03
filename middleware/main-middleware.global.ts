import TokenService from "../services/token/token-service";
import { useAuthStore } from "../stores/auth";

export default defineNuxtRouteMiddleware((to, from) => {
  console.log("running global middleware");
  const auth = useAuthStore();
  if (auth.logginInChekc) {
    TokenService.refreshtokenCheck();
  }
});
