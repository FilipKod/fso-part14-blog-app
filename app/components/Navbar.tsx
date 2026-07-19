"use client";

import { useSession, signOut } from "next-auth/react";
import NavLink from "./NavLink";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <header className="bg-cyan-950 text-white py-3 px-8 flex items-center gap-4">
      <nav className="flex items-center gap-4">
        <NavLink href={"/"}>home</NavLink>
        {" | "}
        <NavLink href={"/blogs"}>blogs</NavLink>
        {" | "}
        <NavLink href={"/users"}>users</NavLink>
      </nav>
      <div className="ml-auto flex items-center gap-4">
        {session ? (
          <>
            <NavLink href={"/blogs/new"}>create Blog</NavLink>
            {" | "}
            <NavLink href={"/me"}>me</NavLink>
            <button
              onClick={() => signOut({ callbackUrl: "/", redirect: true })}
              className="bg-amber-800 px-4 py-1 rounded-sm uppercase text-sm font-semibold cursor-pointer hover:bg-amber-950 "
            >
              logout
            </button>
          </>
        ) : (
          <>
            <NavLink href={"/login"}>login</NavLink>
            {" | "}
            <NavLink href={"/register"}>register</NavLink>
          </>
        )}
      </div>
    </header>
  );
}
