declare module "#auth-utils" {
  interface User {
    // Add your own fields
    id: string;
    email: string;
    name: string;
    category: "consultant" | "admin";
  }
}

export {};
