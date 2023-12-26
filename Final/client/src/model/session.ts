import { reactive } from "vue";
import { useRouter } from "vue-router"
import * as myFetch from "./myFetch";
import { type User} from "./users";

const session = reactive({
  user: null as User | null,
  token: null as string | null,
  redirectUrl: null as string | null,

})

export function api(action: string, body?: unknown, method?: string){
  return myFetch.api(`${action}`, body, method)
    .catch(err=> showError(err))
}
export function showError(err: any){
  console.error(err);
  alert(err.message || err);
}

export function getSession(){
  return session;
}


export function useLogin(){
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise< User | null> {
      const response = await api("/UsersController/login", { email, password });

      if(!response.isSuccess){
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout(){
      session.user = null;
      router.push("/LoginView");
    }
  }
}
export function useSignUp(){
  const router = useRouter();

  return {
    async signUp(email: string, password: string, username: string, firstName: string, lastName: string): Promise< User | null> {
      const response = await api("/UsersController/signUp", { email, password,username,firstName,lastName});

      if(!response.isSuccess){
        return null;
      }

      session.user = response.data.user;
      session.token = response.data.token;

      router.push(session.redirectUrl || "/");
      return session.user;
    },
    logout(){
      session.user = null;
      router.push("/LoginView");
    }
  }
}