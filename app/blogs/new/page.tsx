import { createBlog } from "@/app/actions/blogs";
import Label from "./_components/label";

export default function NewBlog() {
  return (
    <div>
      <h2>Create new blog</h2>
      <form action={createBlog}>
        <Label label="title" />
        <Label label="author" />
        <Label label="url" />
        <button type="submit">Create Blog</button>
      </form>
    </div>
  );
}
