"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { registerUser } from "../services/users";
import { NeonDbError } from "@neondatabase/serverless";
import { DrizzleError, DrizzleQueryError } from "drizzle-orm";

type RegisterErrorState = {
  username?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
};

export type RegisterFormState = {
  errors: RegisterErrorState;
  values: {
    username: string;
    name: string;
    password?: string;
    passwordConfirm?: string;
  };
};

export const createUser = async (
  prevState: RegisterFormState,
  formData: FormData,
) => {
  const username = (formData.get("username") as string).trim();
  const name = (formData.get("name") as string).trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const errors: RegisterErrorState = {};

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters long";
  }

  if (!name || name.length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters long";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Password Confirm doesn't match with password";
  }

  if (Object.keys(errors).length > 0) {
    return {
      errors,
      values: { username, name },
    };
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await registerUser(username, name, passwordHash);
  } catch (error: unknown) {
    if (
      error instanceof DrizzleQueryError &&
      error.cause instanceof NeonDbError &&
      error.cause.code === "23505"
    ) {
      return {
        errors: { username: "Username already exists" },
        values: { username, name },
      };
    }
  }

  redirect("/login");
};
