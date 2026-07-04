import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlog } from "../actions/blogs";

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const blogs = getBlogs();

  const filteredBlogs = filter
    ? blogs.filter((blog) => blog.title.includes(filter))
    : blogs;

  const sortedBlogs = filteredBlogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2>Blogs</h2>

      <form action={searchBlog}>
        <label>
          <input type="text" name="filter" />
        </label>
        <button type="submit">Search</button>
      </form>

      {sortedBlogs.map((blog) => (
        <div key={blog.id}>
          <Link href={`/blogs/${blog.id}`}>
            <h3 style={{ marginBottom: 5, textTransform: "uppercase" }}>
              {blog.title}
            </h3>
          </Link>
          <div>Author: {blog.author}</div>
          <div>
            Url: <a href={blog.url}>{blog.url}</a>
          </div>
          <div>Likes: {blog.likes}</div>
          <hr />
        </div>
      ))}
    </div>
  );
}
