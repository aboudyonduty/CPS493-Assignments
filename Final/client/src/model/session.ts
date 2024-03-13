//بسم الله

import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as myFetch from "./myFetch";
import { type User } from "./users";
import Toastify from "toastify-js";

const session = reactive({
  user: null as User | null,
  token: null as string | null,
  redirectUrl: null as string | null,
  tokenExpired: false,
});

let tokenExpirationCheckInterval: ReturnType<typeof setInterval>;

export function initializeSession() {
  // Check if token exists and is valid on initialization
  if (session.token) {
    checkTokenExpiration();
    tokenExpirationCheckInterval = setInterval(checkTokenExpiration, 60000); // Check token expiration every minute
  }
}

export function api(
  action: string,
  body?: any,
  method?: "GET" | "POST" | "PUT" | "DELETE",
  headers?: any
) {
  let requestHeaders: Record<string, string> = {
    ...headers,
    "Content-Type": "application/json",
  };

  if (session.token) {
    requestHeaders["Authorization"] = `Bearer ${session.token}`;
  }

  return myFetch.api(`${action}`, body, method, requestHeaders).catch((err) => {
    if (err.status === 401) {
      // Token expired or unauthorized, handle accordingly
      session.tokenExpired = true;
      handleTokenExpiration();
    } else {
      showError(err);
    }
  });
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
        showError({ message: "Invalid credentials. Please try again." });
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;
      session.tokenExpired = false;

      checkTokenExpiration();
      tokenExpirationCheckInterval = setInterval(checkTokenExpiration, 60000); // Check token expiration every minute

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout() {
      session.user = null;
      session.token = null;
      session.tokenExpired = false;
      clearInterval(tokenExpirationCheckInterval);
      router.push("/LoginView");
      window.location.reload(); // Reload the page upon logout
    },
  };
}

export function useSignUp() {
  const router = useRouter();

  return {
    async signUp(user: User): Promise<User | null> {
      const response = await api("/UsersController/addUser", user);

      if (!response.isSuccess) {
        showError({ message: "Invalid credentials. Please try again." });
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;
      session.tokenExpired = false;

      checkTokenExpiration();
      tokenExpirationCheckInterval = setInterval(checkTokenExpiration, 60000); // Check token expiration every minute

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout() {
      session.user = null;
      session.token = null;
      session.tokenExpired = false;
      clearInterval(tokenExpirationCheckInterval);
      router.push("/LoginView");
      window.location.reload(); // Reload the page upon logout
    },
  };
}

function checkTokenExpiration() {
  if (!session.token) return;

  const token = session.token.split(".")[1];
  const decodedToken = JSON.parse(atob(token));
  const expirationTime = decodedToken.exp * 1000; // Convert expiration time to milliseconds

  if (Date.now() >= expirationTime) {
    session.tokenExpired = true;
    handleTokenExpiration();
  }
}

function handleTokenExpiration() {
  showError({ message: "Your session has expired. Please log in again." });
}
