import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  url: varchar("url").notNull(),
  likes: integer("likes").notNull().default(0),
});
