import type { Metadata } from "next";
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

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
        <AuthSessionProvider>
          <NavBar />
          <div>{children}</div>
          <Footer />
        </AuthSessionProvider>
      </body>
    </html>
  );
}
