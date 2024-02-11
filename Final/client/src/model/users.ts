// بسم الله

import { api } from "./session";
export interface User {
  _id?: string;
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
  username: string;
  token?: string;
}

export async function getUsers(): Promise<User[]> {
  return api("/UsersController/getAllUsers");
}
export async function getUserById(id: number): Promise<User> {
  return api(`/UsersController/getUserById/${id}`);
}
export async function addUser(user: User): Promise<User> {
  return api("/UsersController/addUser", user);
}
export async function deleteUser(_id: string): Promise<User> {
  return api(`/UsersController/deleteUser/${_id}`, null, "DELETE");
}
export async function updateUserRole(
  user: User,
  newRole: string
): Promise<User> {
  return api(
    `/UsersController/updateUserRole/${user._id}`,
    { role: newRole },
    "PUT"
  );
}
