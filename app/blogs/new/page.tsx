"use client";

import { createBlog, FormStateBlog } from "@/app/actions/blogs";
import Label from "./_components/label";
import { useActionState, useEffect } from "react";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const initialState: FormStateBlog = {
  errors: {},
  values: { title: "", author: "", url: "" },
  success: false,
};

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotify } = useNotification();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading" && !session.data?.user?.email) {
      router.push("/login");
    }

    if (state.success) {
      showNotify("blog created");
      router.push("/blogs");
    }
  }, [state, router, showNotify, session]);

  if (session.status === "loading") return null;
  if (!session.data?.user?.email) return null;

  return (
    <>
      <h2 className="text-2xl font-bold mb-3">Create new blog</h2>
      <form action={formAction} className="flex flex-col w-2xl">
        <Label label="title" defaultValue={state.values.title} />
        {state.errors.title && (
          <p className="text-red-500 mb-3 ml-27">{state.errors.title}</p>
        )}
        <Label label="author" defaultValue={state.values.author} />
        {state.errors.author && (
          <p className="text-red-500 mb-3 ml-27">{state.errors.author}</p>
        )}
        <Label label="url" defaultValue={state.values.url} />
        {state.errors.url && (
          <p className="text-red-500 mb-3 ml-27">{state.errors.url}</p>
        )}
        <button
          type="submit"
          className="rounded-md bg-emerald-700 py-2 px-4 text-white font-bold mt-3 cursor-pointer hover:bg-emerald-800 transition-all"
        >
          Create Blog
        </button>
      </form>
    </>
  );
}
