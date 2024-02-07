//InShaAllah

import {api} from "./session";

export interface User {
  _id?: string;
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  //role: "admin" | "user";
  username: string;
  token?: string;
}

export async function getUsers(): Promise< User[]> {
  return api("/UsersController/getAllUsers"); 
}
export async function addUser(user: User): Promise<User> {
  return api("/UsersController/addUser",  user );
}
export async function deleteUser(user: User): Promise<User> {
  return api("/UsersController/deleteUser", {  });
}
export async function getUserByEmail(email: string): Promise<User> {
  return api(`/UsersController/getUserByEmail/${email}`);
}