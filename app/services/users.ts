import { authOptions } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

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

export const generateUserToken = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return { error: "must be logged in" };
  }

  await db
    .update(users)
    .set({ token: crypto.randomUUID() })
    .where(eq(users.username, session.user.email));
};
