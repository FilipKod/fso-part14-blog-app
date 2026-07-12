"use client";

import { createBlog, FormStateBlog } from "@/app/actions/blogs";
import Label from "./_components/label";
import { useActionState } from "react";

const initialState: FormStateBlog = {
  errors: {},
  values: { title: "", author: "", url: "" },
};

export default function NewBlog() {
  const [state, formAction] = useActionState(createBlog, initialState);

  return (
    <div>
      <h2>Create new blog</h2>
      <form action={formAction}>
        <Label label="title" defaultValue={state.values.title} />
        {state.errors.title && (
          <p style={{ color: "red" }}>{state.errors.title}</p>
        )}
        <Label label="author" defaultValue={state.values.author} />
        {state.errors.author && (
          <p style={{ color: "red" }}>{state.errors.author}</p>
        )}
        <Label label="url" defaultValue={state.values.url} />
        {state.errors.url && <p style={{ color: "red" }}>{state.errors.url}</p>}
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
