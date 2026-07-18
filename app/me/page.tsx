import { authOptions } from "@/auth";
import { getUserWithBlogs } from "../services/users";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { generateUserTokenAction } from "../actions/users";
import SubmitTokenButton from "./_components/SubmitTokenButton";
import { getReadingListsByUser } from "../services/readingList";
import Link from "next/link";

export default async function MeProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return notFound();
  }

  const user = await getUserWithBlogs(session?.user?.email);

  if (!user) {
    return notFound();
  }

  const readingLists = await getReadingListsByUser(user.id);

  return (
    <div className="w-xl rounded-md shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-5">My Profile</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <hr className="my-3" />

      <h3 className="text-xl font-bold my-4">Reading List</h3>
      <ul>
        {readingLists.map((item) => (
          <li
            key={item.id}
            className="bg-amber-100 rounded-md p-3 flex items-center gap-5 my-2 justify-between"
          >
            <Link
              href={`/blogs/${item.blogId}`}
              className="text-blue-700 hover:underline"
            >
              {item.title}
            </Link>
            <button className="bg-green-700 rounded-md py-1 px-3 text-white cursor-pointer shrink-0">
              mark as read
            </button>
          </li>
        ))}
      </ul>

      <hr className="my-3" />

      <h3 className="text-xl font-bold my-4">API Token</h3>
      <div className="rounded-md bg-gray-100 p-3">
        <span className="block mb-2 text-gray-600 text-sm">Current token:</span>
        <span className="bg-gray-200 block p-3 rounded-md text-md">
          {user.token || "no token has been generated yet"}
        </span>
      </div>
      <form action={generateUserTokenAction} className="mt-2.5">
        <SubmitTokenButton />
      </form>
    </div>
  );
}
