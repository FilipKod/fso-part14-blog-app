import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlog } from "../actions/blogs";

export default async function Blogs({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const { filter } = await searchParams;
  const blogs = await getBlogs(filter);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  return (
    <div>
      <h2 className="text-2xl font-bold text-center">Blogs</h2>

      <form action={searchBlog} className="flex my-8">
        <label className="grow-[4]">
          <input
            type="text"
            name="filter"
            data-testid="filter-input"
            className="bg-white border-2 border-amber-400 rounded-md w-full"
          />
        </label>
        <button
          type="submit"
          data-testid="search-button"
          className="bg-emerald-600 rounded-md py-1 px-3 text-sm uppercase font-bold text-gray-100 ml-2 grow-[1]"
        >
          Search
        </button>
      </form>

      {sortedBlogs && (
        <div data-testid="blogs-list">
          {sortedBlogs.map((blog) => (
            <div
              key={blog.id}
              className="rounded-md bg-amber-100 my-7 first-of-type:mt-5 last-of-type:mb-0 p-5 shadow-md"
            >
              <Link href={`/blogs/${blog.id}`}>
                <h3 className="mb-3 uppercase font-bold">{blog.title}</h3>
              </Link>
              <div className="text-gray-700">Author: {blog.author}</div>
              <div className="my-1">
                Url:{" "}
                <a href={blog.url} className="underline">
                  {blog.url}
                </a>
              </div>
              <div>{blog.likes} likes</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
