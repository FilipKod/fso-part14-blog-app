import { getUserWithBlogs } from "@/app/services/users";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-5">{user.name}</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} className="flex my-3">
            <Link
              href={`/blogs/${blog.id}`}
              className="bg-amber-100 shadow-md rounded-md py-2 px-3"
            >
              {blog.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
