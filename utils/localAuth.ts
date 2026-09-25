export interface LocalUser {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role?: string;
}

const DEFAULT_USERS: LocalUser[] = [
  {
    name: "Demo User",
    email: "demo@amazon.com",
    password: "password123",
    image: "/assets/images/user-image-default.jpg",
    role: "user",
  },
];

export function getStoredUsers(): LocalUser[] {
  if (typeof window === "undefined") return DEFAULT_USERS;
  try {
    const raw = localStorage.getItem("amazon_users");
    if (!raw) {
      localStorage.setItem("amazon_users", JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_USERS;
  }
}

export function getCurrentUser(): LocalUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem("amazon_current_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCurrentUser(user: LocalUser | null): void {
  if (typeof window === "undefined") return;
  if (user) {
    localStorage.setItem("amazon_current_user", JSON.stringify(user));
  } else {
    localStorage.removeItem("amazon_current_user");
  }
}

export function registerUser(name: string, email: string, password: string): { success: boolean; message: string; user?: LocalUser } {
  if (typeof window === "undefined") {
    return { success: false, message: "Window environment unavailable" };
  }

  const users = getStoredUsers();
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

  if (existing) {
    return { success: false, message: "User with this email already exists in LocalStorage!" };
  }

  const newUser: LocalUser = {
    name,
    email,
    password,
    image: "/assets/images/user-image-default.jpg",
    role: "user",
  };

  users.push(newUser);
  localStorage.setItem("amazon_users", JSON.stringify(users));
  setCurrentUser(newUser);

  return { success: true, message: "User account created successfully in LocalStorage!", user: newUser };
}

export function loginUser(email: string, password: string): { success: boolean; message?: string; user?: LocalUser } {
  if (typeof window === "undefined") {
    return { success: false, message: "Window environment unavailable" };
  }

  const users = getStoredUsers();
  const user = users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { success: false, message: "Invalid email or password. Please try again." };
  }

  setCurrentUser(user);
  return { success: true, user };
}

export function logoutUser(): void {
  setCurrentUser(null);
}

export function promptNotDeployed(featureName: string = "This module"): void {
  alert(`${featureName}: module implemented not deployed`);
}
