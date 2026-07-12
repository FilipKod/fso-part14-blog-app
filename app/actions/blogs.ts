"use server";

import { redirect } from "next/navigation";
import { addBlog, likeBlogById } from "../services/blogs";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const createBlog = async (formData: FormData) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  await addBlog(title, author, url);
  revalidatePath("/blogs");
  redirect("/blogs");
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
