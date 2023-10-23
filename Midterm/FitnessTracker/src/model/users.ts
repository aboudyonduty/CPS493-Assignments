import data from "@/data/users.json";  // Ensure the path is correct

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "admin" | "user";
  username: string;
  token?: string;
}

export function getUsers(): User[] {
  return data.users.map(x => ({
    ...x,
    role: x.role as "admin" | "user",
    
  }));
}


export function getUserByEmail(email: string): User | undefined {
  return getUsers().find(x => x.email === email);
}
