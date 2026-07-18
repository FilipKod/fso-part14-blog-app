"use server";

import { revalidatePath } from "next/cache";
import {
  addBlogToReadingList,
  changeReadToTrue,
} from "../services/readingList";

export const addToReadingList = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));

  await addBlogToReadingList(blogId);
  revalidatePath(`/blogs/${blogId}`);
};

export const markAsRead = async (formData: FormData) => {
  const blogId = Number(formData.get("blogId"));

  await changeReadToTrue(blogId);
  revalidatePath("/me");
};
