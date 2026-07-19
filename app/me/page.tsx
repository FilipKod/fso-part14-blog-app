import { authOptions } from "@/auth";
import { getUserWithBlogs } from "../services/users";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { generateUserTokenAction } from "../actions/users";
import SubmitTokenButton from "./_components/SubmitTokenButton";
import { getReadingListsByUser } from "../services/readingList";
import Link from "next/link";
import { markAsRead } from "../actions/readingLists";

export default async function MeProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await getUserWithBlogs(session?.user?.email);

  if (!user) {
    redirect("/login");
  }

  const unreadList = await getReadingListsByUser(user.id, false);
  const readedList = await getReadingListsByUser(user.id, true);

  return (
    <div className="w-xl rounded-md shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-5" data-testid="user-profile">
        My Profile
      </h2>
      <p data-testid="user-name">
        <strong>Name:</strong> {user.name}
      </p>
      <p data-testid="user-username">
        <strong>Username:</strong> {user.username}
      </p>

      <hr className="my-3" />

      <h3 className="text-xl font-bold my-4" data-testid="reading-list-section">
        Reading List
      </h3>

      <h4 data-testid="empty-reading-list" className="font-bold">
        Unread ({unreadList.length})
      </h4>
      {unreadList.length > 0 ? (
        <ul data-testid="unread-section">
          {unreadList.map((itemUnread) => (
            <li
              key={itemUnread.id}
              className="bg-amber-100 rounded-md p-3 flex items-center gap-5 my-2 justify-between"
            >
              <Link
                href={`/blogs/${itemUnread.blogId}`}
                className="text-blue-700 hover:underline"
              >
                {itemUnread.title}
              </Link>
              <form action={markAsRead} className="shrink-0">
                <input type="hidden" name="blogId" value={itemUnread.blogId} />
                <button
                  className="bg-green-700 rounded-md py-1 px-3 text-white cursor-pointer shrink-0"
                  data-testid="mark-read-"
                >
                  mark as read
                </button>
              </form>
            </li>
          ))}
        </ul>
      ) : (
        <p data-testid="no-unread-blogs">No blogs added</p>
      )}

      <h4 className="font-bold">Read ({readedList.length})</h4>
      <ul>
        {readedList.map((itemRead) => (
          <li
            key={itemRead.id}
            className="bg-emerald-50 rounded-md p-3 flex items-center my-2 justify-between"
          >
            <Link
              href={`/blogs/${itemRead.blogId}`}
              className="text-blue-700 hover:underline"
            >
              {itemRead.title}
            </Link>
          </li>
        ))}
      </ul>

      <hr className="my-3" />

      <h3 className="text-xl font-bold my-4">API Token</h3>
      <div
        className="rounded-md bg-gray-100 p-3"
        data-testid="api-token-section"
      >
        <span className="block mb-2 text-gray-600 text-sm">Current token:</span>
        <div
          className="bg-gray-200 block p-3 rounded-md text-md"
          data-testid="token-display"
        >
          {user.token ? (
            <span data-testid="api-token">{user.token}</span>
          ) : (
            <span data-testid="no-token-message">
              no token has been generated yet
            </span>
          )}
        </div>
      </div>
      <form action={generateUserTokenAction} className="mt-2.5">
        <SubmitTokenButton />
      </form>
    </div>
  );
}
