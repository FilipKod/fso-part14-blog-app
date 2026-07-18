import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  varchar,
  integer,
  text,
  boolean,
  unique,
} from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  author: varchar("author").notNull(),
  url: varchar("url").notNull(),
  likes: integer("likes").notNull().default(0),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  name: varchar("name").notNull(),
  passwordHash: text("password_hash").notNull().default(""),
  token: text("token").unique(),
});

export const readingLists = pgTable(
  "reading_list",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    blogId: integer("blog_id")
      .notNull()
      .references(() => blogs.id),
    read: boolean("read").notNull().default(false),
  },
  (table) => ({
    uniqueBlogUser: unique().on(table.blogId, table.userId),
  }),
);

export const usersRelations = relations(users, (r) => ({
  blogs: r.many(blogs),
  createdBlog: r.many(blogs),
}));

export const blogsRelations = relations(blogs, (r) => ({
  user: r.one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
}));
