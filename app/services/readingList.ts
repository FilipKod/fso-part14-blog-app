import { authOptions } from "@/auth";
import { db } from "@/db";
import { blogs, readingLists, users } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const addBlogToReadingList = async (blogId: number) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("not logged in");
  }

  try {
    const user = await db.query.users.findFirst({
      where: eq(users.username, session.user.email),
    });

    if (!user) {
      throw new Error("user not found");
    }

    await db.insert(readingLists).values({ blogId, userId: user.id });
  } catch (error) {
    console.log(error);
  }
};

export const getReadingListsByUser = async (userId: number, read: boolean) => {
  return db
    .select({
      id: readingLists.id,
      read: readingLists.read,
      title: blogs.title,
      blogId: readingLists.blogId,
    })
    .from(readingLists)
    .innerJoin(users, eq(readingLists.userId, users.id))
    .innerJoin(blogs, eq(readingLists.blogId, blogs.id))
    .where(and(eq(readingLists.userId, userId), eq(readingLists.read, read)));
};

export const checkReadingListForLoggedUser = async (blogId: number) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("not logged in");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });

  if (!user) {
    throw new Error("user not found");
  }

  return db.query.readingLists.findFirst({
    where: and(
      eq(readingLists.blogId, blogId),
      eq(readingLists.userId, user.id),
    ),
  });
};

export const changeReadToTrue = async (blogId: number) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("not logged in");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });

  if (!user) {
    throw new Error("user not found");
  }

  await db
    .update(readingLists)
    .set({ read: true })
    .where(
      and(eq(readingLists.blogId, blogId), eq(readingLists.userId, user.id)),
    );
};
