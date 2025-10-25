interface User {
  email: string;
  password: string;
}

const USERS_KEY = "miguelflixUsers";

export function getUsers(): User[] {
  if (typeof window === "undefined") return [];
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
}

export function addUser(newUser: User): boolean {
  const users = getUsers();
  const exists = users.some((u) => u.email === newUser.email);
  if (exists) return false;
  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
}

export function findUserByEmail(email: string): User | undefined {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

export function validateUser(email: string, password: string): boolean {
  const users = getUsers();
  return users.some((u) => u.email === email && u.password === password);
}