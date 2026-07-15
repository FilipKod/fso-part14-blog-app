"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="bg-cyan-950 text-white py-3 px-8 flex items-center gap-4">
      <NavLink href={"/"}>Home</NavLink>
      {" | "}
      <NavLink href={"/blogs"}>Blogs</NavLink>
      {" | "}
      <NavLink href={"/users"}>Users</NavLink>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href={"/blogs/new"}>Create Blog</NavLink>
            {" | "}
            <em className="text-gray-500">{session.user?.name} logged in</em>
            <button
              onClick={() => signOut()}
              className="bg-amber-800 px-4 py-1 rounded-sm uppercase text-sm font-semibold cursor-pointer hover:bg-amber-950 "
            >
              logout
            </button>
          </>
        ) : (
          <>
            {" | "}
            <NavLink href={"/login"}>Login</NavLink>
            {" | "}
            <NavLink href={"/register"}>Register</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
