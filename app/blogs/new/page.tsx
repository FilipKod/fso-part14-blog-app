"use client";

import { createBlog } from "@/app/actions/blogs";
import Label from "./_components/label";
import { useActionState } from "react";

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, { error: "" });

  return (
    <div>
      <h2>Create new blog</h2>
      <form action={formAction}>
        {state.error && <p style={{ color: "red" }}>{state.error}</p>}
        <Label label="title" />
        <Label label="author" />
        <Label label="url" />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
