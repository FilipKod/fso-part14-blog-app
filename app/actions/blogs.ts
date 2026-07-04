"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlogById } from "../services/blogs";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
};

export const likeBlog = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));

  likeBlogById(blogId);
  revalidatePath(`/blogs/${blogId}`);
};

export const searchBlog = async (formData: FormData) => {
  const filter = formData.get("filter") as string;

  redirect(`/blogs?filter=${filter}`);
};
