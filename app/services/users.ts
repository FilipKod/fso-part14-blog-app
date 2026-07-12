import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getAllUsers = async () => {
  return db.query.users.findMany();
};

export const getUserWithBlogs = async (username: string) => {
  return db.query.users.findFirst({
    where: eq(users.username, username),
    with: {
      blogs: true,
    },
  });
};

export const registerUser = async (
  username: string,
  name: string,
  hash: string,
) => {
  await db.insert(users).values({ username, name, passwordHash: hash });
};
