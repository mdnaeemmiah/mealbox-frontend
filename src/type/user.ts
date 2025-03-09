export interface IUser {
    name: string;
    email: string;
    password: string;
    method?: "credentials" | "github" | "google";
    role?: "user" | "admin";
    createdAt?: Date;
    updatedAt?: Date;
  }
  