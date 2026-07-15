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
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div className="rounded-md bg-amber-100 my-7 first-of-type:mt-5 last-of-type:mb-0 p-5 shadow-md">
      <h2 className="text-2xl font-bold text-center">{blog.title}</h2>

      <div className="text-center my-5">
        <p className="text-gray-700">{blog.author}</p>
        <Link href={blog.url} className="underline">
          <p>{blog.url}</p>
        </Link>
        <p>likes: {blog.likes}</p>
      </div>

      <div className="mt-4 text-center">
        <form action={likeBlog}>
          <input type="hidden" name="blogId" value={blog.id} />
          <button
            className="bg-emerald-900 rounded-md px-3 py-1.5 font-bold uppercase text-white"
            type="submit"
          >
            Like ❤️
          </button>
        </form>
      </div>
    </div>
  );
}
