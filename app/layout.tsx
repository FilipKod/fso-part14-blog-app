import "@/app/global.css";
import type { Metadata } from "next";
import AuthSessionProvider from "./components/SessionProvider";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";
import Notification from "./components/Notification";
import { NotificationProvider } from "./components/NotificationContext";

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
      <body className="flex flex-col min-h-screen">
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <main className="grow max-w-2xl m-auto py-5">{children}</main>
            <Footer />
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
