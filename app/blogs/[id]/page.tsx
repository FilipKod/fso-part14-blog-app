import { likeBlog } from "@/app/actions/blogs";
import { getBlogById } from "@/app/services/blogs";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>

      <div>
        <span>{blog.author}</span>
        {" - "}
        <Link href={blog.url}>
          <span>{blog.url}</span>
        </Link>
        {" - "}
        <span>likes: {blog.likes}</span>
      </div>

      <div style={{ marginTop: 20 }}>
        <form action={likeBlog}>
          <input type="hidden" name="blogId" value={blog.id} />
          <button type="submit">Like ❤️</button>
        </form>
      </div>
    </div>
  );
}
