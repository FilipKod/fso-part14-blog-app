import { authOptions } from "@/auth";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return null;
  }

  return db.query.users.findFirst({
    where: eq(users.username, session.user.email),
  });
};
