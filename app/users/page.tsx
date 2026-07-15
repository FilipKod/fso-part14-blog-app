import Link from "next/link";
import { getAllUsers } from "../services/users";

export default async function Users() {
  const users = await getAllUsers();

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-3">Users</h2>
      <ul>
        {users.map((user) => (
          <li
            key={user.id}
            className="my-3 flex items-center text-center justify-center"
          >
            <Link
              href={`/users/${user.username}`}
              className="rounded-md py-2 px-3 bg-fuchsia-100"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
