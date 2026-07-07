import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href={"/"}>Home</Link>
          {" | "}
          <Link href={"/blogs"}>Blogs</Link>
          {" | "}
          <Link href={"/users"}>Users</Link>
          {" | "}
          <Link href={"/blogs/new"}>Create Blog</Link>
        </header>
        <div>{children}</div>
        <footer style={{ marginTop: 50 }}>
          <span>Created by Filip Madunicky</span>
        </footer>
      </body>
    </html>
  );
}
