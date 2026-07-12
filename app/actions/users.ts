"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { registerUser } from "../services/users";

export const createUser = async (formData: FormData) => {
  const username = (formData.get("username") as string).trim();
  const name = (formData.get("name") as string).trim();
  const password = formData.get("password") as string;

  const passwordHash = await bcrypt.hash(password, 10);

  await registerUser(username, name, passwordHash);

  redirect("/login");
};
