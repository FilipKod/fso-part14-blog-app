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
      <body>
        <AuthSessionProvider>
          <NotificationProvider>
            <NavBar />
            <Notification />
            <div>{children}</div>
            <Footer />
          </NotificationProvider>
        </AuthSessionProvider>
      </body>
    </html>
  );
}
