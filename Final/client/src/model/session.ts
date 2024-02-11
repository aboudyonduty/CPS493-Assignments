// بسم الله

import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import { type User } from "./users";
import Toastify from "toastify-js"; 

const session = reactive({
  user: null as User | null,
  token: null as string | null,
  redirectUrl: null as string | null,
});

export function api(
  action: string,
  body?: any,
  method?: string,
  headers?: any
) {
  return myFetch
    .api(`${action}`, body, method, headers)
    .catch((err) => showError(err));
}

export function showError(err: any) {
  console.error(err);
  Toastify({
    text: err.message || "An unexpected error occurred.",
    duration: 3000, 
    close: true,
    gravity: "bottom", 
    position: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    className: "info",
    stopOnFocus: true,
    style: {
      borderRadius: "3px",
      fontSize: "14px", 
    },
  }).showToast();
}
export function getSession() {
  return session;
}

export function useLogin() {
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise<User | null> {
      const response = await api("/UsersController/login", { email, password });

      if (!response.isSuccess) {
        // Show an error toast if login is not successful
        showError({ message: "Invalid credentials. Please try again." });
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout() {
      session.user = null;
      router.push("/LoginView");
    },
  };
}

export function useSignUp() {
  const router = useRouter();

  return {
    async signUp(user: User): Promise<User | null> {
      const response = await api("/UsersController/addUser", user);

      if (!response.isSuccess) {
        // Show an error toast if login is not successful
        showError({ message: "Invalid credentials. Please try again." });
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout() {
      session.user = null;
      router.push("/LoginView");
    },
  };
}
