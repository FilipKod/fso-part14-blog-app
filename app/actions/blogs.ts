"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlogById } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

type ErrorStateBlog = {
  title?: string;
  author?: string;
  url?: string;
};

export type FormStateBlog = {
  errors: ErrorStateBlog;
  values: {
    title: string;
    author: string;
    url: string;
  };
  success: boolean;
};

export const createBlog = async (
  prevState: FormStateBlog,
  formData: FormData,
) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: ErrorStateBlog = {};

  if (!title || title.trim().length < 5) {
    errors.title = "Title must be at least 5 characters long";
  }

  if (!author || author.trim().length < 5) {
    errors.author = "Author must be at least 5 characters long";
  }

  if (!url || url.trim().length < 5) {
    errors.url = "Url must be at least 5 characters long";
  }

  if (Object.keys(errors).length > 0) {
    return { errors, values: { title, author, url }, success: false };
  }

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  return { errors: {}, success: true, values: { title, author, url } };
};

export const likeBlog = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));

  await likeBlogById(blogId);
  revalidatePath(`/blogs/${blogId}`);
};

export const searchBlog = async (formData: FormData) => {
  const filter = formData.get("filter") as string;

  redirect(`/blogs?filter=${filter}`);
};
